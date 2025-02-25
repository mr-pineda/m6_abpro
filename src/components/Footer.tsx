const Footer = () => {
  return (
    <footer className='flex h-32 flex-row justify-around bg-gray-400 px-2'>
      <div className='my-2 flex flex-col items-center'>
        <p className='font-bold'>Dirección</p>
        <p>Calle sin nombre, 1234</p>
        <p>Comuna desconocida, Chile</p>
      </div>
      <div className='my-2 flex flex-col items-center'>
        <p className='font-bold'>Contacto</p>
        <p>Fono: +569 9999 9999</p>
        <p>Correo: contacto@hospital.cl</p>
      </div>
      <div className='my-2 flex flex-col items-center'>
        <p className='font-bold'>RRSS</p>
        <p>Facebook</p>
        <p>Instagram</p>
      </div>
    </footer>
  );
};

export default Footer;
