import React from 'react';
import AppMenu from './navigation/AppMenu';
// Ya no es necesario importar './Layout.css' con Tailwind CSS

const Layout = ({ children }) => {
  return (
    // Contenedor principal: flex en fila para sidebar y contenido
    <div className="flex min-h-screen bg-gray-50 font-inter">

      {/* Sidebar para el menú - visible en pantallas medianas y más grandes */}
      {/* Se oculta en móviles y se convierte en una columna fija en desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-gray-800 text-white shadow-lg flex-shrink-0">
        <AppMenu />
      </div>

      {/* Área de contenido principal - se expande para llenar el espacio restante */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;