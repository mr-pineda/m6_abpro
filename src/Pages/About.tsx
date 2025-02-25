import { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { doctor } from '../types/data';
import { useDoctors } from '../utils/api';

const About = () => {
  const data = useDoctors();
  const [currentDoctor, setCurrentDoctor] = useState<doctor | null>(null);
  const [services, setServices] = useState<string>('');

  useEffect(() => {
    if (currentDoctor !== null) {
      let services = '';
      currentDoctor.services.forEach((service, idx) => {
        services += idx !== 0 ? ', ' + service : service;
      });
      setServices(services);
      return;
    }
    setServices('');
  }, [currentDoctor]);
  return (
    <>
      <div className='w-full bg-sky-200 px-28 py-16'>
        <h1 className='mb-10 text-center text-3xl font-bold text-black'>
          Acerca de nosotros
        </h1>
        <p className='text-black'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sunt
          temporibus provident nostrum eligendi deserunt illum perspiciatis
          eveniet officia quis sequi, quos aperiam minus ipsam asperiores itaque
          nam minima voluptate animi velit pariatur cum. Impedit, est eveniet
          fugit facilis in nesciunt? Velit voluptate optio, rerum quae ratione
          est. Illum, natus!
        </p>
      </div>
      <div className='w-full bg-white px-28 py-16'>
        <h1 className='mb-10 text-center text-3xl font-bold text-black'>
          Conoce a nuestro equipo
        </h1>
        <p className='text-black'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sunt
          temporibus provident nostrum eligendi deserunt illum perspiciatis
          eveniet officia quis sequi, quos aperiam minus ipsam asperiores itaque
          nam minima voluptate animi velit pariatur cum. Impedit, est eveniet
          fugit facilis in nesciunt? Velit voluptate optio, rerum quae ratione
          est. Illum, natus!
        </p>
        <div className='my-5 grid grid-cols-4 gap-4'>
          {data.map((doctor, idx) => (
            <DoctorCard
              key={idx}
              doctor={doctor}
              onPress={(doctor) => {
                setCurrentDoctor(doctor);
              }}
            />
          ))}
        </div>
      </div>

      {currentDoctor !== null && (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
          <div className='m-auto h-1/2 w-1/3 rounded bg-white p-5'>
            <h1 className='mb-4 text-center text-4xl'>{currentDoctor.name}</h1>
            <h2 className='mb-2 text-3xl italic'>{currentDoctor.specialty}</h2>
            <p className='mb-3 text-justify italic'>
              {currentDoctor.description}
            </p>
            {services !== '' && (
              <p className='w-full'>
                <span className='font-bold'>Servicios: </span> {services}
              </p>
            )}
            <button
              className='mt-5 rounded bg-sky-500 p-2 text-white'
              onClick={() => {
                setCurrentDoctor(null);
              }}
              children='Cerrar'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default About;
