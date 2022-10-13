import {useState, useEffect} from 'react'
import {Alert} from './Alert'

export const Formulario = ({pacientes, setPacientes, paciente, setPaciente, diagnosticoStatus = false, setDiagnosticoStatus}) => {

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [especie, setEspecie] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')

  const [diagnostico, setDiagnostico ] = useState('')
  const [tratamiento, setTratamiento ] = useState('')



  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setEspecie(paciente.especie)
      setEdad(paciente.edad)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setPhone(paciente.phone)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      if(paciente.diagnostico != undefined){
        setDiagnostico(paciente.diagnostico)
        setTratamiento(paciente.tratamiento)
      }
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let camposDelForm;

    if(!diagnosticoStatus){
      camposDelForm = [nombre, especie, edad, propietario, email, phone, fecha, sintomas]
    }
    else {
      camposDelForm = [diagnostico, tratamiento]
    }


    if(camposDelForm.includes('')){
      console.log('Hay al menos un campo vacio')
      setError(true);
      
      return
    }
    setError(false)  
    
    const objetoPaciente = {
      nombre,
      especie,
      edad,
      propietario,
      email,
      phone,
      fecha,
      sintomas,
    }

    if(paciente.id){
      //Editar

      objetoPaciente.id = paciente.id;

      if(diagnosticoStatus){
        objetoPaciente.diagnostico = diagnostico;
        objetoPaciente.tratamiento = tratamiento;
      }

      const pacientesActualizados = pacientes.map( (pacienteState) => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      )

      setPacientes(pacientesActualizados)

      setPaciente({})

      if(diagnosticoStatus){
        setDiagnosticoStatus(false)
        setMessageAlert('Diagnósticado')
      }
      else{
        setMessageAlert('Paciente Modificado')
      }

      
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      },2000)

    }
    else{
      //Agregar
      
      objetoPaciente.id = generarId()
      setPacientes( (prev) => [ objetoPaciente, ...prev  ])
      setMessageAlert('Paciente Registrado')
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      },2000)
    }

    setNombre('');
    setEdad('');
    setEspecie('')
    setPropietario('');
    setEmail('');
    setPhone('');
    setFecha('');
    setSintomas('')
  }

  const handleInputOnChange = (e) => {

    const regexForPhone = /^[+0-9]*$/;

    switch(e.target.id){
      case 'mascota': setNombre(e.target.value)
      break;
      case 'especie': setEspecie(e.target.value)
      break;
      case 'edad': setEdad(e.target.value)
      break;
      case 'propietario': setPropietario(e.target.value)
      break;
      case 'email': setEmail(e.target.value)
      break;
      case 'ingreso': setFecha(e.target.value)
      break;
      case 'phone': if(regexForPhone.test(e.target.value)){setPhone(e.target.value)}
      break;
      case 'sintomas': setSintomas(e.target.value)
      break;
      case 'diagnostico': setDiagnostico(e.target.value)
      break;
      case 'tratamiento': setTratamiento(e.target.value)
      break;
    }

  }

  const handleCancelar = () => {
    setPaciente({})

    if(diagnosticoStatus){
      setDiagnosticoStatus(false)
    }

    setNombre('');
    setEdad('');
    setEspecie('')
    setPropietario('');
    setEmail('');
    setPhone('');
    setFecha('');
    setSintomas('')
    setDiagnostico('')
    setTratamiento('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 ">
      <h2 className='font-black text-3xl text-center'>Seguimiento de Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>Añade Pacientes y <span className='font-bold text-green-600'>Añadelos</span></p>
      {!diagnosticoStatus 
      ? 
      (
      <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5' onSubmit={handleSubmit}>
        {error && (
          <Alert mensaje="Todos los campos son requeridos" type="error"/>
        )}
        {success && (
          <Alert mensaje={messageAlert} type="success"/>
        )}
        <div className='mb-5'>
          <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>Nombre Mascota</label>
          <input type="text" id="mascota" placeholder='Nombre de la Mascota' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={nombre} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='especie' className='block text-gray-700 uppercase font-bold'>Especie de la Mascota</label>
          <input type="text" id="especie" placeholder='Especie de la Mascota' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={especie} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='edad' className='block text-gray-700 uppercase font-bold'>Edad de la Mascota</label>
          <input type="text" id="edad" placeholder='Edad' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={edad} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>Nombre Propietario</label>
          <input type="text" id="propietario" placeholder='Nombre de la Propietario' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={propietario} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email</label>
          <input type="email"  id="email" placeholder='Email' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={email} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
        <label htmlFor='phone' className='block text-gray-700 uppercase font-bold'>Tel&eacute;fono</label>
          <input type="tel"  id="phone" placeholder='+1 445487854' className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={phone} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='ingreso' className='block text-gray-700 uppercase font-bold'>Fecha de ingreso</label>
          <input type="date" id="ingreso" className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' value={fecha} onChange={handleInputOnChange} />
        </div>
        <div className='mb-5'>
          <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>S&iacute;ntomas</label>
          <textarea id="sintomas" cols="30" rows="4" className='border-2 w-full p-2 m-1' placeholder='Describe los S&iacute;ntomas' value={sintomas} onChange={handleInputOnChange}></textarea>
        </div>
        <div className="flex">
          {
            paciente.id && <input type="button" className='bg-red-800 mx-2 w-1/3 p-3 uppercase text-white font-bold cursor-pointer hover:bg-red-900 rounded-md ' onClick={handleCancelar} value='cancelar'/>
          }
          <input type="submit" className='bg-green-600 mx-2 w-full p-3 uppercase text-white font-bold cursor-pointer hover:bg-green-700 rounded-md ' value={!paciente.id ? 'Agregar Paciente' : 'Editar Paciente'}/>
        </div>
      </form>)
      : 
      (
        <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5' onSubmit={handleSubmit}>
          {error && (
            <Alert mensaje="Todos los campos son requeridos" type="error"/>
          )}
          {success && (
            <Alert mensaje={messageAlert} type="success"/>
          )}
          <div className='mb-5'>
            <label htmlFor='diagnostico' className='block text-gray-700 uppercase font-bold'>Diagn&oacute;stico</label>
            <input type="input" id="diagnostico" className='border-2 w-full p-2 m-1 placeholder-gray-300 rounded-md' placeholder='Diagnostico' value={diagnostico} onChange={handleInputOnChange} />
          </div>
          <div className='mb-5'>
            <label htmlFor='tratamiento' className='block text-gray-700 uppercase font-bold'>Tratamiento</label>
            <textarea id="tratamiento" cols="30" rows="4" className='border-2 w-full p-2 m-1' placeholder='Describe el tratamiento' value={tratamiento} onChange={handleInputOnChange}></textarea>
          </div>
          <div className='flex'>
            {
              paciente.id && <input type="button" className='bg-red-800 mx-2 w-1/3 p-3 uppercase text-white font-bold cursor-pointer hover:bg-red-900 rounded-md ' onClick={handleCancelar} value='cancelar'/>
            }
            <input type="button" className='bg-green-600 w-full p-3 uppercase text-white font-bold cursor-pointer hover:bg-green-700 rounded-md ' value="Diagnosticar"/> 
          </div>
        </form>
      )
      }
    </div>
  )
}
