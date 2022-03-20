const Patient = () => {
  return (
    <div className="mb-3 ml-3 mr-3 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
              <span className="font-normal normal-case">Hook</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
              <span className="font-normal normal-case">David</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
              <span className="font-normal normal-case">correo@correo.com</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta: {''}
              <span className="font-normal normal-case">10 de Marzo de 2022</span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: {''}
              <span className="font-normal normal-case">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis fermentum nunc at tincidunt. Fusce facilisis ligula lorem, sed gravida metus consectetur sed. Vivamus facilisis est non nisi finibus, vestibulum efficitur augue vulputate. Nunc vitae nulla at risus luctus tempus ultricies nec lorem.</span>
            </p>
          </div>
  )
}

export default Patient