export const Alert = ({mensaje, type}) => {
  switch(type){
    case 'error':
      return (
        <div className='bg-red-800 text-white text-center p-3 font-bold uppercase mb-3 rounded-md'>
            <p>{mensaje}</p>
        </div>
      )
    break;

    case 'success': 
      return (
        <div className='bg-green-700 text-white text-center p-3 font-bold uppercase mb-3 rounded-md'>
            <p>{mensaje}</p>
        </div>
      )
    break;
  }

  
}
