import Swal from 'sweetalert2'

const handleClick2 = () => {
    Swal.fire({
      html: `
        <p>Indique el número de personas que van firmar este contrato como arrendadores.</p>
        <br/>
        <p>El arrendador es el propietario de la vivienda, y el que recibirá una cantidad de dinero mensual a cambio de alquiler su vivienda a un inquilino (el arrendatario).</p>
        <br/>
        <p>¿Necesita ayuda personalizada?</p>
        <p>Al final, tendrá la opción de consultar a un abogado</p>
      `,
      confirmButtonText: "Entendido",
    });
  }

  export default handleClick2