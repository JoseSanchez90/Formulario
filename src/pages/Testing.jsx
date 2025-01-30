import flatpickr from 'flatpickr';
import { useRef, useEffect, useState } from 'react';
import SweetAlert1 from '../components/SweetAlert1'
import SweetAlert2 from '../components/SweetAlert2'
import 'flatpickr/dist/flatpickr.min.css';

function Testing() {

  const dateInputRef = useRef(null);

  // Estado para almacenar la cantidad seleccionada
  // const [quantity, setQuantity] = useState(1);
  const paragraphsRef = useRef([]); // Referencia para los párrafos
  // Estados para el llenado en tiempo real
  const [localidad, setLocalidad] = useState("");
  const [fecha, setFecha] = useState("");

    // Manejar cambio en el input de localidad
    const handleLocalidadChange = (e) => {
      setLocalidad(e.target.value);
    };
  
    // Manejar cambio en el input de fecha
    const handleFechaChange = (e) => {
      setFecha(e.target.value);
    };

     // Estado para controlar el paso actual
    const [step, setStep] = useState(1);
    //Barra de progreso
    const [progress, setProgress] = useState(0);

    const [tipoPersona, setTipoPersona] = useState("fisica");
    const [numFirmantes, setNumFirmantes] = useState(1);

    const handleTipoPersonaChange = (e) => {
      setTipoPersona(e.target.value);
    };
  
    const handleNumFirmantesChange = (e) => {
      setNumFirmantes(parseInt(e.target.value, 10));
    };

    // Función para manejar el botón "Siguiente"
    const handleNext = () => {
      setStep(step + 1); // Avanza al siguiente paso
    };

    // Función para manejar el botón "Anterior"
    const handleBack = () => {
      setStep(step - 1); // Retrocede al paso anterior
    };

    //Calculando el progreso
    useEffect(() => {
      const totalSteps = 3; // Número total de pasos
      const newProgress = (step / totalSteps) * 100;
      setProgress(newProgress);
    }, [step]);
    
    useEffect(() => {
      paragraphsRef.current.forEach((p) => {
        if (p) {
          // Remueve la clase de animación
          p.classList.remove("fade-bg");

          // Usa un pequeño retraso para volver a agregar la clase
          setTimeout(() => {
            p.classList.add("fade-bg");
          }, 10); // 10ms es suficiente para reiniciar la animación
        }
      });
    }, []);

    const renderParagraphs = () => {
      let paragraphs = [];
    
      for (let i = 0; i < numFirmantes; i++) {
        if (tipoPersona === "juridica" && i === 0) {
          // Primer párrafo con formato especial para persona jurídica
          paragraphs.push(
            <p key={i} className="fade-bg">
              <span>______</span>, con DNI/NIF <span>______</span>, y que ostenta el cargo de <span>______</span>
            </p>
          );
        } else {
          // Párrafos estándar para los demás firmantes
          paragraphs.push(
            <p key={i + "extra"} className="fade-bg">
              <span>______</span>, con DNI/NIF <span>______</span>, y con domicilio en: <span>______</span>
            </p>
          );
        }
      }
    
      return paragraphs;
    };

    // Este es el segundo bloque que siempre mantiene su estructura
    const renderSecondBlock = () => {
      let paragraphs = [];
    
      for (let i = 0; i < numFirmantes; i++) {
        paragraphs.push(
          <p key={i + "second"} className="fade-bg">
            <span>______</span>, con DNI/NIF <span>______</span>, y con domicilio en: <span>______</span>
          </p>
        );
      }
    
      return paragraphs;
    };

    useEffect(() => {
      // Configura Flatpickr
      const flatpickrInstance = flatpickr(dateInputRef.current, {
        dateFormat: 'd/m/Y', // Formato de fecha inicial (puede ser cualquier cosa)
        locale: 'es', // Idioma español
        prevArrow: '◀', // Personalizar flechas
        nextArrow: '▶',
        onChange: (selectedDates) => {
          // Formatear la fecha manualmente
          const fechaFormateada = selectedDates[0].toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
          setFecha(fechaFormateada); // Actualiza el estado con la fecha formateada
        },
      });
  
      // Limpieza al desmontar el componente
      return () => {
        flatpickrInstance.destroy(); // Destruye la instancia de Flatpickr
      };
    }, []);

  return (

    <main className="h-screen w-full bg-white">

      {/* PARTE SUPERIOR */}
      <div className="flex flex-row justify-between px-20 pt-5 pb-2 bg-gray-100">
        <h1 className="text-2xl font-bold">Contrato de arrendamiento de vivienda habitual</h1>
        <div>
          <p className="font-bold">Progresión:</p>
          <div className="bg-blue-950 px-20 rounded-xl">
            <span id="progreso" className="font-bold text-white">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-300 h-2 mt-2 rounded">
              <div style={{ width: `${progress}%` }} className="h-full bg-blue-600 rounded"></div>
            </div>
        </div>
      </div>

      {/* BLOQUE DE PREGUNTAS Y ARRENDAMIENTO */}
        <div className="h-7/8 grid grid-cols-[1fr_5fr_1fr_10fr_1fr]">
        <div className="bg-gray-100"></div>
        <div className="flex flex-col px-5 py-5 border-1 border-gray-200 gap-5">

          {/* BLOQUE DE PREGUNTAS */}

          {/* Primer panel de preguntas */} 
          {step === 1 && (       
          <div className="flex flex-col gap-4">
          
            <div className="flex flex-col gap-2">
              <p className="font-bold">Localidad en la que se firma este contrato de arrendamiento de vivienda habitual:</p>
              <input type="text" id="localidad" value={localidad} onChange={handleLocalidadChange} className="py-1 px-2 outline-0 border-1 border-gray-300 rounded-md"/>
            </div>
          
            <div className="flex flex-col gap-2">
              <p className="font-bold">Fecha en la que se firma este contrato de arrendamiento de vivienda habitual:</p>
              <input type="text" id="fecha" ref={dateInputRef} value={fecha} onChange={handleFechaChange} className="py-1 px-2 outline-0 border-1 border-gray-300 rounded-md" placeholder="dd/mm/aaaa"/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start gap-2">
                <label htmlFor="quantity" className="font-bold flex flex-row">Número de personas que firman el contrato en tanto que arrendadores (propietario):
                </label>
                <button className="cursor-pointer" onClick={SweetAlert2}>
                    <svg fill="#000000" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.536 29.536" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M14.768,0C6.611,0,0,6.609,0,14.768c0,8.155,6.611,14.767,14.768,14.767s14.768-6.612,14.768-14.767 C29.535,6.609,22.924,0,14.768,0z M14.768,27.126c-6.828,0-12.361-5.532-12.361-12.359c0-6.828,5.533-12.362,12.361-12.362 c6.826,0,12.359,5.535,12.359,12.362C27.127,21.594,21.594,27.126,14.768,27.126z"></path> <path d="M14.385,19.337c-1.338,0-2.289,0.951-2.289,2.34c0,1.336,0.926,2.339,2.289,2.339c1.414,0,2.314-1.003,2.314-2.339 C16.672,20.288,15.771,19.337,14.385,19.337z"></path> <path d="M14.742,6.092c-1.824,0-3.34,0.513-4.293,1.053l0.875,2.804c0.668-0.462,1.697-0.772,2.545-0.772 c1.285,0.027,1.879,0.644,1.879,1.543c0,0.85-0.67,1.697-1.494,2.701c-1.156,1.364-1.594,2.701-1.516,4.012l0.025,0.669h3.42 v-0.463c-0.025-1.158,0.387-2.162,1.311-3.215c0.979-1.08,2.211-2.366,2.211-4.321C19.705,7.968,18.139,6.092,14.742,6.092z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                </button>
              </div>
                <select name="opciones" id="quantity" value={numFirmantes} onChange={handleNumFirmantesChange} className="py-1 px-2 outline-0 border-1 border-gray-300 rounded-md">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
            </div>
          </div>
          )}
          

            {/* Segundo panel de preguntas */}
            {step === 2 && (
            <div className="flex flex-col gap-2">
              <p>La primera/única parte arrendadora (propietaria) de este contrato es una:</p>
              <div value={tipoPersona} onChange={handleTipoPersonaChange}>
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoPersona" value="fisica" checked={tipoPersona === "fisica"} onChange={handleTipoPersonaChange} className="accent-blue-500" />Persona Física
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoPersona" value="juridica" checked={tipoPersona === "juridica"} onChange={handleTipoPersonaChange} className="accent-blue-500" />Persona Jurídica
                </label>
              </div>
            </div>
          )}

          {/* Boton anterior y siguiente*/}
           
              <div className="flex flex-row gap-2">
                {step > 1 && (
                  <button onClick={handleBack} className="flex flex-row gap-1 text-normal font-semibold bg-blue-500 py-1 px-4 rounded-2xl cursor-pointer">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071L11.2929 16.7071C11.6834 17.0976 12.3166 17.0976 12.7071 16.7071C13.0976 16.3166 13.0976 15.6834 12.7071 15.2929L10.4142 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H10.4142L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289Z" fill="#000000"></path> </g></svg>
                    Anterior
                  </button>
                )}
                <button onClick={handleNext} className="flex flex-row gap-1 text-normal font-semibold bg-blue-500 py-1 px-4 rounded-2xl cursor-pointer">
                  {step === 1 ? "Paso siguiente" : "Finalizar"}
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L13.5858 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H13.5858L11.2929 8.70711C10.9024 8.31658 10.9024 7.68342 11.2929 7.29289Z" fill="#000000"></path> </g></svg>
                </button>
              
              </div>

              <div>
                <div>
                  <a onClick={SweetAlert1} className="border-b-1 border-gray-500 text-gray-500 text-sm cursor-pointer">Modificar el modelo</a>
                </div>
                <div>
                  <a href="#" className="border-b-1 border-gray-500 text-gray-500 text-sm">Guardalo (y sigue despues)</a>
                </div>  
              </div>

        </div>

        {/* BLOQUE DE ARRENDAMIENTO */}
        <div className="bg-gray-100"></div>
        <div className="overflow-y-auto border-1 border-gray-200">
          <div className="px-10 py-5">
            <h2 className="text-center font-bold">CONTRATO DE ARRENDAMIENTO DE VIVIENDA</h2>
            <br />
            <p className="text-end">En <span>{localidad || "______"}</span>, a <span>{fecha || "______"}</span></p>
            <br />
            <p className="text-center font-bold">REUNIDOS</p>
            <br />
            <p className="font-bold">De una parte,</p>
            <br />
            {renderParagraphs()}
            <br />
            <p className="font-bold">Y otra parte,</p>
            <br />
            {renderSecondBlock()}
            <br />
            <p>Y que, a continuación, serán referidas, individualmente como Parte, PARTE ARRENDADORA, PARTE ARRENDATARIA o, de forma conjunta, como Partes</p>
            <br />
            <p className="text-center font-bold">INTERVIENEN</p>
            <br />
            <p className="font-bold">De una parte,</p>
            <br />
            {tipoPersona === "fisica" ? (
              <p><span>______</span>, quien comparece en su propio nombre y derecho, como PARTE ARRENDATARIA.</p>
            ):(
              <p className="fade-bg"><span>______</span>, quien comparece en nombre y presentacion de <span>______</span>, con NIF <span>______</span>, y con domicilio a efecto de notificaciones en <span>______</span>, y ello en virtud de Escritura Publica y/o autorizacion pertinente, donde se recoge y motiva su facultad de intervencion, como PARTE ARRENDADORA.</p>
            )}
            <br />
            <p className="font-bold">Y otra parte,</p>
            <br />
            <p><span>______</span>, quien comparece en su propio nombre y derecho, como PARTE ARRENDATARIA.</p>
            <br />
            <p>Las Partes, en la calidad con la que actúan, y reconociéndose capacidad jurídica para contratar y obligarse y en especial para el otorgamiento del presente <strong>CONTRATO DE ARRENDAMIENTO DE VIVIENDA.</strong></p>
            <br />
            <p className="font-bold">EXPONEN</p>
            <br />
            <p><strong>I.</strong>  Que la PARTE ARRENDADORA es propietaria de la vivienda ubicada en:</p>
            <br />
            <span>______</span>
            <br />
            <p>y de <span>______</span> metros cuadrados de superficie y que comprende:</p>
            <br />
            <span>______</span>
            <br />
            <p>(y, en adelante, se denominará &quot;La Vivienda&quot;). Dicha superficie y composición así como demás características y estado son perfectamente conocidas y aceptadas por las partes intervinientes en este contrato. No obstante, La Vivienda se arrienda como cuerpo cierto, así, de diferir la superficie real y la aquí descrita, esto no afectará de forma alguna a las condiciones y cláusulas que aquí se fijan, particularmente en lo relativo al precio de la renta.</p>
            <br />
            <p><strong>II.</strong>  Que  la PARTE ARRENDADORA ha exhibido una copia del Certificado de Eficiencia Energética de La Vivienda regulado en el Real Decreto 235/2013, de 5 de abril, por el que se aprueba el procedimiento básico para la certificación de la eficiencia energética de los edificios. Dicha copia se incorporaría como anexo al presente contrato si la PARTE ARRENDATARIA así lo solicita.</p>
            <br />
            <p><strong>III.</strong>  Que la PARTE ARRENDATARIA está interesada en arrendar La Vivienda para su uso personal y vivienda habitual, y la PARTE ARRENDADORA está interesada en arrendársela, así convienen pactar de forma expresa y detallada la oferta y aceptación en arrendamiento de la misma, acordando expresamente otorgar el presente contrato de arrendamiento de vivienda que se rige por las siguientes.</p>
          </div>
        </div>
        <div className="bg-gray-100"></div>
      </div>
    </main>

  )
  
}

export default Testing