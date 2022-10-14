export const Paciente = ({paciente, setPaciente, eliminarPaciente, diagnosticoStatus, setDiagnosticoStatus}) => {

  const {nombre, especie, edad, propietario, email, phone, fecha, sintomas, id, diagnostico = '', tratamiento   } = paciente;

  const handleEliminar = () => {
    const respuesta = confirm('¿Desea eliminar este paciente?');
    if(respuesta) {
      eliminarPaciente(id)
    }
  }

  const handleDiagnostico = () => {
   
      setPaciente(paciente)
      setDiagnosticoStatus(true)
    
  }

  const handleEditar = () => {
    if(diagnosticoStatus){
      setDiagnosticoStatus(false)
    }
    setPaciente(paciente)
  }

  return (
    <div className='m-5 bg-white shadow-lg px-5 py-10 rounded-xl my-8'>
      <div className="flex">
        <div className="md:w-1/2">
          <p className='font-bold mb-3 text-green-700 uppercase'>Informaci&oacute;n de la mascota</p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Nombre: <span className='font-normal normal-case'>{nombre}</span></p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Especie: <span className='font-normal normal-case'>{especie}</span></p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Edad: <span className='font-normal normal-case'>{edad}</span></p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Fecha Alta: <span className='font-normal normal-case'>{fecha}</span></p>
        </div>
        <div className="md:w-1/2">
          <p className='font-bold mb-3 text-green-700 uppercase'>Informaci&oacute;n del Propietario</p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Nombre: <span className='font-normal normal-case'>{propietario}</span></p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Tel&eacute;fono: <span className='font-normal normal-case'>{phone}</span></p>
          <p className='font-bold mb-3 text-gray-700 uppercase'>Email: <span className='font-normal normal-case'>{email}</span></p>
        </div>
      </div>
      
      <p className='font-bold mb-3 text-gray-700 uppercase'>Sintomas: <span className='font-normal normal-case'>{sintomas}</span></p>
      { diagnostico.length > 1 ? (
        <>
         <p className='font-bold mb-3 text-green-700 uppercase'>Informaci&oacute;n de Diagn&oacute;stico</p>
         <p className='font-bold mb-3 text-gray-700 uppercase'>Diagn&oacute;stico: <span className='font-normal normal-case'>{diagnostico}</span></p>
         <p className='font-bold mb-3 text-gray-700 uppercase'>Tratamiento: <span className='font-normal normal-case'>{tratamiento}</span></p>
        </>
       
      ) : ''
      }
      
      
      <div className="flex justify-center mt-7 border-b-2 pb-7 shadow-sm">
        <a href={`tel:${phone}`} className="py-2 px-10 shadow-md bg-stone-50 hover:bg-stone-300 text-white font-bold rounded-l-md"><img width="30px" src="https://cdn.icon-icons.com/icons2/37/PNG/512/phone_4307.png"/></a>
        <a href={`https://api.whatsapp.com/send?phone=${phone.replace('+', '')}`} target="_blank" className="py-2 px-10  shadow-md bg-stone-50 hover:bg-stone-300 text-white font-bold " ><img width="30px" src="https://cdn.icon-icons.com/icons2/373/PNG/256/Whatsapp_37229.png"/></a>
        <a href={`mailto:${email}`} className="py-2 px-10 shadow-md bg-stone-50 hover:bg-stone-300 text-white font-bold rounded-r-md"><img width="30px" src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202011emailgmaillogomailsocialsocialmedia-115677_115624.png"/></a>
      </div>
      <div className="flex justify-center mt-7">
        <button  className="py-2 px-10 shadow-md bg-stone-50 hover:bg-green-600 text-gray-700 hover:text-white font-bold rounded-l-md " onClick={handleEditar}>Editar</button>
        <button  className="py-2 px-10 shadow-md bg-stone-50 hover:bg-indigo-600 text-gray-700 hover:text-white font-bold" onClick={handleDiagnostico} >Diagnosticar</button>
        <button  className="py-2 px-10 shadow-md bg-stone-50 hover:bg-red-600 text-gray-700 hover:text-white font-bold rounded-r-md " onClick={ handleEliminar }>Eliminar</button>
      </div>
    </div>
  )
}
