import React from 'react';
import AppMenu from './navigation/AppMenu';
// Ya no es necesario importar './Layout.css' con Tailwind CSS

const Layout = ({ children }) => {
  return (
    // Contenedor principal:
    // flex-col en pantallas pequeñas (móviles) para apilar la barra superior y el contenido.
    // min-h-screen para asegurar que el fondo cubre toda la altura.
    // bg-gray-50: El color de fondo principal de tu layout.
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter">

      {/* AppMenu como barra superior para pantallas pequeñas (visible solo en móviles) */}
      {/* Esto se muestra SIEMPRE, pero se configura internamente como barra superior en móvil */}
      <div className="md:hidden">
        <AppMenu isMobileTopBar={true} />
      </div>

      {/* AppMenu como sidebar vertical para pantallas medianas y grandes (oculto en móviles) */}
      {/* Este div *contiene* el AppMenu cuando se renderiza como sidebar fijo */}
      <div className="hidden md:block"> {/* Oculto en móvil, visible en desktop */}
        <AppMenu isMobileTopBar={false} /> {/* AppMenu fijo ya maneja su posición */}
      </div>

      <main className="flex-1 md:ml-[260px] p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;