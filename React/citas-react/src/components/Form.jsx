const Form = () => {
  return (
      <div className="md:w-1/2 lg:w-2/5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>

          <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" action="">
            <div className="mb-5">
              <label htmlFor="name" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
              <input 
                id="name"
                type="text" 
                placeholder="Nombre de la mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
              <input 
                id="owner"
                type="text" 
                placeholder="Nombre Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder="Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="release" className="block text-gray-700 uppercase font-bold">Alta</label>
              <input 
                id="release"
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="symptom" className="block text-gray-700 uppercase font-bold">Síntomas</label>
              <textarea
                id="symptom"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Describe los Síntomas"
              />
            </div>

            <input 
              type="submit" 
              className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all cursor-pointer rounded-md"
              value="Agregar Paciente"
            />
          </form>
      </div>
    
  )
}

export default Form

