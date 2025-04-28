pipeline {
    agent any
    environment {
        ORGANIZATION_NAME = '$_ORGANIZATION_NAME_$'
        PROJECT_NAME = '$_PROJECT_NAME_$'
        GITHUB_REPO_URL = "https://github.com/${env.ORGANIZATION_NAME}/${env.PROJECT_NAME}.git"
        SONAR_SERVER_NAME = 'idea-sonarqube-instance' // Usar el nombre configurado en Jenkins
        SONAR_PROJECT_KEY = "${env.ORGANIZATION_NAME}:${env.PROJECT_NAME}" // Ejemplo de clave
        APP_IP = '$_APP_SERVER_IP_$'
        PHRASE = '$_APP_SERVER_PHRASE_$'
        FRONTEND_PORT = '$_APP_FRONT_PORT_$'
        APP_URL = "http://${env.APP_IP}" // URL base de tu aplicación
    }
    stages {
        stage('Checkout') {
            steps {
                git url: env.GITHUB_REPO_URL, branch: 'main' // o tu rama por defecto
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
		stage('Deploy') {
			steps {
				script {
					def remoteHost = "${env.APP_IP}"
					def remoteUser = '$_APP_SERVER_USER_$'
					def appNameBase = "${env.PROJECT_NAME}"
					def workspaceDir = pwd() // Directorio del workspace de Jenkins
					def credId = 'pruebas-ssh-without-encrypt' // ID de tus credenciales SSH de Jenkins
                    def REMOTE_DEPLOY_DIR = "/home/${remoteUser}/apps/${env.PROJECT_NAME}" // Directorio de despliegue del frontend

                    withCredentials([sshUserPrivateKey(credentialsId: credId, keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: remoteUser)]) {
					
					def remote = [
						name: remoteHost,
						host: remoteHost,
						user: remoteUser,
						identityFile: identity,
						allowAnyHosts: true // Considera configurar knownHosts para mayor seguridad en producción
					]
					
                        // 1. Detener el servidor web (si es necesario)
                        echo "Deteniendo el servidor web (si está corriendo en ${env.REMOTE_HOST}:${env.FRONTEND_PORT})"
                        sshCommand remote: remote, command: "sudo systemctl stop nginx", failOnError: false
                        // ^^^ AJUSTA 'nginx' con el nombre de tu servicio web

                        // 2. Esperar a que se detenga (opcional)
                        sleep time: 5, unit: 'SECONDS'

                        // 3. Borrar la build anterior en el servidor (opcional)
                        echo "Borrando la build anterior en: ${REMOTE_DEPLOY_DIR}"
                        sshCommand remote: remote, command: "rm -rf ${REMOTE_DEPLOY_DIR}", failOnError: false

                        // 4. Crear el directorio de despliegue
                        echo "Creando el directorio de despliegue: ${REMOTE_DEPLOY_DIR}"
                        sshCommand remote: remote, command: "mkdir -p ${REMOTE_DEPLOY_DIR}", failOnError: true

                        // 5. Copiar la nueva build (la carpeta 'dist') al servidor
                        echo "Copiando la nueva build desde: ${workspaceDir}/dist hacia: ${REMOTE_DEPLOY_DIR}"
                        //sshCopy remote: remote, from: "${workspaceDir}/dist/", into: "${REMOTE_DEPLOY_DIR}/", recursive: true, failOnError: true
			sshPut remote: remote, from: "${workspaceDir}/dist/", into: "${REMOTE_DEPLOY_DIR}/", recursive: true, failOnError: true


                        // 6. Ajustar permisos (si es necesario)
                        echo "Ajustando permisos en el directorio de despliegue"
                        sshCommand remote: remote, command: "sudo chown -R ${remoteUser}:${remoteUser} ${REMOTE_DEPLOY_DIR}", failOnError: false

                        // 7. Configurar el servidor web (ejemplo con Nginx)
                        echo "Configurando Nginx para servir la aplicación en el puerto ${env.FRONTEND_PORT}"
                        sshCommand remote: remote, command: """
                            sudo sh -c 'cat > /etc/nginx/sites-available/${env.PROJECT_NAME}.conf <<EOF
                        server {
                            listen ${env.FRONTEND_PORT};
                            server_name ${env.APP_IP};

                            root ${REMOTE_DEPLOY_DIR};
                            index index.html;

                            location / {
                                try_files \$uri \$uri/ /index.html;
                            }
                        }
                        EOF'
                        """, failOnError: true
                        sshCommand remote: remote, command: "sudo ln -sf /etc/nginx/sites-available/${env.PROJECT_NAME}.conf /etc/nginx/sites-enabled/", failOnError: false
                        sshCommand remote: remote, command: "sudo systemctl restart nginx", failOnError: true

                        echo "Frontend de la aplicación ${env.PROJECT_NAME} desplegado en http://${env.APP_IP}:${env.FRONTEND_PORT}"
					
                    }
				}
			}
		}
		
    }
}
