import {useEffect} from 'react'

import { Paciente } from "./Paciente"


export const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente, diagnosticoStatus, setDiagnosticoStatus}) => {

  /*useEffect( () => {
    if(pacientes.length > 0) {
      console.log('Nuevo paciente')
    }
  }, [pacientes])*/

  return (
    <div className='md:w-1/2 lg:w-3/5 '>
      
      {pacientes && pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>
          <p className='mt-5 text-lg text-center mb-10'>Administra tus <span className='text-green-600 font-bold'>Pacientes y Citas</span></p>
          <div className='md:h-screen md:overflow-y-scroll'>   
          { 
            pacientes.map((paciente) => 
              <Paciente key={paciente.id} paciente={paciente} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} diagnosticoStatus={diagnosticoStatus} setDiagnosticoStatus={setDiagnosticoStatus}/>
            )
          }
          </div>
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
          <p className='mt-5 text-lg text-center mb-10'>Comienza agregando pacientes <span className='text-green-600 font-bold'>y aparecerán en este lugar</span></p>
        </>
      )}

    </div>
  )
}
