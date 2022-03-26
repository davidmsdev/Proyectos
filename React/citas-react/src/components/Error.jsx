const Error = ({ message }) => {
  return (
    <div className="bg-red-800 text-white text-center uppercase p-3 font-bold rounded-md mb-5">
      <p>{message}</p>
    </div>
  )
}

export default Error