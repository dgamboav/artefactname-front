import React from 'react';
// Ya no es necesario importar HomePage.css con Tailwind CSS

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4 font-inter">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-2xl w-full">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Bienvenido al sistema autogenerado
                </h2>
                <div className="home-content">
                    <p className="text-lg text-gray-700 mb-8">
                        Este es el panel de inicio. Explora las diferentes secciones a través del menú de navegación para empezar a gestionar tus datos.
                    </p>
                    <p className="text-md text-gray-600 italic">
                        ¡Tu aplicación está lista para ser usada!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;