import React from 'react';

const NavDots = () => {
  return (
    <nav className="nav-dots" aria-label="Navegación de secciones">
      <button className="nav-dots__dot" aria-label="Despertar y Bienestar" title="07:00"></button>
      <button className="nav-dots__dot" aria-label="Conexión y Cuidado" title="10:00"></button>
      <button className="nav-dots__dot" aria-label="Control Inteligente" title="15:00"></button>
      <button className="nav-dots__dot" aria-label="Rendimiento Deportivo" title="18:00"></button>
      <button className="nav-dots__dot" aria-label="Ocio y Entretenimiento" title="20:00"></button>
      <button className="nav-dots__dot" aria-label="Comodidad sin límites" title="23:00"></button>
    </nav>
  );
};

export default NavDots;
