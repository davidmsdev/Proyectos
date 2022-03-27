import { useState, useEffect } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import PatientList from "./components/PatientList"

function App() {

  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})

  useEffect(() => {
    const getLocalStorage = () => {
      // Convertimos el STRING en un Array/objeto
      const patientsLS = JSON.parse(localStorage.getItem(`pacientes`)) ?? []
      setPatients(patientsLS)
    }
    getLocalStorage()
  }, [])

  useEffect(() => {
    console.log(`Componente listo o cambió pacientes`)
    localStorage.setItem(`pacientes`, JSON.stringify(patients))
  }, [patients])

  const deletePatient = id => {
    console.log(`Eliminando paciente`)
    // Creamos un array con los pacientes que no coinciden con el ID
    const updatedPatients = patients.filter( patient => patient.id !== id)
    console.log(updatedPatients)
    setPatients(updatedPatients)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientList
           patients={patients}
           setPatient={setPatient}
           deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
