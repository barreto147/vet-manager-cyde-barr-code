import {useState, useEffect} from 'react'
import {Header} from './components/Header';
import {Formulario} from './components/Formulario';
import {ListadoPacientes} from './components/ListadoPacientes';

function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []) 
  const [paciente, setPaciente] = useState({}) 
  const [diagnosticoStatus, setDiagnosticoStatus] = useState(false)



  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])
  

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( (paciente) => paciente.id !== id )

    setPacientes(pacientesActualizados)
  }

  return (
    <div className="App container mx-auto mt-20">
      <Header/>
      <div className='mt-12 md:flex'>
        <Formulario pacientes={pacientes} setPacientes={setPacientes} paciente={paciente} setPaciente={setPaciente} diagnosticoStatus={diagnosticoStatus} setDiagnosticoStatus={setDiagnosticoStatus}/>
        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} diagnosticoStatus={diagnosticoStatus} setDiagnosticoStatus={setDiagnosticoStatus}/>
      </div>
    </div>
  )
}

export default App
