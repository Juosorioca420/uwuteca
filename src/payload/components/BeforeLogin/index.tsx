import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Panel de Administrador</b>
        {'Esta sección esta reservada para Administradores, si usted es un Usuario, intentelo de nuevo en:'}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>Inicio de Sesion en Tienda</a>
      </p>
    </div>
  )
}

export default BeforeLogin
