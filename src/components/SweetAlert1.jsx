import Swal from 'sweetalert2'

const handleClick1 = () => {
      Swal.fire({
        title: "PARA MODIFICAR EL MODELO",
        html: `
          <p>Conteste la pregunta y haga click en <strong>"Paso siguiente"</strong>.</p>
          <br/>
          <p>El documento se va redactando en función de tus respuestas: se añaden o se eliminan artículos, se modifican párrafos, se cambian palabras...</p>
          <br/>
          <p>Al finalizar, recibirás el documento de forma inmediata en los formatos Word y PDF. Entonces podrás abrir el documento Word para modificarlo y volver a utilizarlo cómo y cuando quieras.</p>
          <br/>
          <p>También puedes pedir la ayuda de un abogado.</p>
        `,
        confirmButtonText: "Entendido",
      });
    }

export default handleClick1