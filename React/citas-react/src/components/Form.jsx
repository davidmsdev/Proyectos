import { useState, useEffect } from "react"
import Error from "./Error"

const Form = ({ patients, setPatients, patient, setPatient }) => {

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [symptom, setSymptom] = useState('')
  const [error, setError] = useState(false)

  // Se ejecuta solo si el compoenente de patient cambia
  useEffect(() => {
    if(Object.keys(patient).length > 0) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptom(patient.symptom)
    } 
  }, [patient])

  const generateId = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString(36)

    return random + date
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if([ name, owner, email, date, symptom ].includes('')) {
      console.log('Hay vacios')
      setError(true)
      return
    }

    setError(false)

    const objPatient = {
      name, 
      owner, 
      email, 
      date, 
      symptom,
    }

    if(patient.id) {
      // Estamos editando
      objPatient.id = patient.id
      const updatedPatients = patients.map(patientState => patientState.id === patient.id ? objPatient : patientState)

      setPatients(updatedPatients)
      setPatient({})

    } else {
      // Nuevo registro
      // Obtenemos una copia del array original y le añadimos nuestro objeto
      objPatient.id = generateId() // Generamos un ID para cada registro
      setPatients([...patients, objPatient])
    }
    
    // Reiniciar el form
    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptom('')
  }

  return (
      <div className="md:w-1/2 lg:w-2/5 mx-3">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" 
            action=""
          >
            {error && <Error message='Todos los campos son obligatorios'/>}
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
              <input 
                id="name"
                type="text" 
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={ (e) => setName(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
              <input 
                id="owner"
                type="text" 
                placeholder="Nombre Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={owner}
                onChange={ (e) => setOwner(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder="Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="release" className="block text-gray-700 uppercase font-bold">Alta</label>
              <input 
                id="release"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={date}
                onChange={ (e) => setDate(e.target.value) }
              />
            </div>

            <div className="mb-5">
              <label htmlFor="symptom" className="block text-gray-700 uppercase font-bold">Síntomas</label>
              <textarea
                id="symptom"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los Síntomas"
                value={symptom}
                onChange={ (e) => setSymptom(e.target.value) }
              />
            </div>

            <input 
              type="submit" 
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all cursor-pointer rounded-md"
              value={ patient.id ? `Editar Paciente` : `Agregar Paciente`}
            />
          </form>
      </div>
    
  )
}

export default Form

