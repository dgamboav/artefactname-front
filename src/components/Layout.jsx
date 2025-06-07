import React from 'react';
import AppMenu from './navigation/AppMenu';
// Ya no es necesario importar './Layout.css' con Tailwind CSS

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
      {/* AppMenu como barra superior para pantallas pequeñas (visible solo en móviles) */}
      {/* Pasa isMobileTopBar={true} para que se configure como barra superior */}
      <div className="md:hidden">
        <AppMenu isMobileTopBar={true} />
      </div>

      {/* Contenedor principal para el sidebar (desktop) y el contenido principal */}
      {/* Este div será flex en pantallas md y mayores para acomodar el sidebar y el contenido */}
      <div className="flex flex-grow">
        {/* AppMenu como sidebar vertical para pantallas medianas y grandes (oculto en móviles) */}
        {/* Pasa isMobileTopBar={false} para que se configure como sidebar vertical */}
        <div className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-white shadow-lg flex-shrink-0">
          <AppMenu isMobileTopBar={false} />
        </div>

        {/* Área de contenido principal - se expande para llenar el espacio restante */}
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;