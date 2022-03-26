import Patient from "./Patient"

const PatientList = ({ patients, setPatient }) => {

  return ( 
    <div className="md:w-1/2 lg:w-3/5">

      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          <div className="md:h-screen overflow-y-scroll">
            { patients.map( patient => (
              <Patient
                key={patient.id}
                patient={patient}
                setPatient={setPatient}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )}
      
    </div>
  )
}

export default PatientList