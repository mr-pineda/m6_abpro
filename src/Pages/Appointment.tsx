import { useState, useEffect, useRef } from 'react';
import { useDoctors } from '../utils/api';
import { doctor } from '../types/data';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';

const hours = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

const days = ['Lunes', 'Martes', 'Míercoles', 'Jueves', 'Viernes'];

const Appointment = () => {
  const doctorsData = useDoctors();
  const [currentDoctor, setCurrentDoctor] = useState<doctor | null>(null);
  const [serviceList, setServiceList] = useState<string[]>([]);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [hour, setHour] = useState(hours[0]);
  const [day, setDay] = useState(days[0]);
  const [doctorQuery, setDoctorQuery] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const [dayQuery, setDayQuery] = useState('');
  const [hourQuery, setHourQuery] = useState('');
  const [doctorHover, setDoctorHover] = useState(false);
  const [serviceHover, setServiceHover] = useState(false);
  const [hourHover, setHourHover] = useState(false);
  const [dayHover, setDayHover] = useState(false);
  const [location,setLocation] = useState<{lat:number,lon:number}|null>(null)

  const doctorInputRef = useRef<HTMLInputElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);

  const getLocation = () => {
  /*  if ("geolocation" in navigator)*/
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.log("Error obteniendo la ubicación:",
        error);
      }
      );
    } else {
      console.log("Geolocalización no soportada en este navegador.");
    }
  };

  useEffect(() => {
    if (doctorsData.length === 0) return; //Si no hay datos, no hace nada
    setCurrentDoctor(doctorsData[0]); //Selecciona el primer doctor por defecto
  }, [doctorsData]); // El userEffect se ejecuta cuando se actualiza doctorsData

  useEffect(() => {

    getLocation();

    doctorInputRef.current?.focus();
    doctorInputRef.current?.addEventListener('mouseenter', () => {
      setDoctorHover(true);
    });
    doctorInputRef.current?.addEventListener('mouseleave', () => {
      setDoctorHover(false);
    });

    hourInputRef.current?.addEventListener('mouseenter', () => {
      setHourHover(true);
    });
    hourInputRef.current?.addEventListener('mouseleave', () => {
      setHourHover(false);
    });

    dayInputRef.current?.addEventListener('mouseenter', () => {
      setDayHover(true);
    });
    dayInputRef.current?.addEventListener('mouseleave', () => {
      setDayHover(false);
    });

    serviceInputRef.current?.addEventListener('mouseenter', () => {
      console.log('service hover');
      setServiceHover(true);
    });
    serviceInputRef.current?.addEventListener('mouseleave', () => {
      setServiceHover(false);
    });

    return () => {
      doctorInputRef.current?.removeEventListener('mouseenter', () => {
        setDoctorHover(true);
      });
      doctorInputRef.current?.removeEventListener('mouseleave', () => {
        setDoctorHover(false);
      });

      hourInputRef.current?.removeEventListener('mouseenter', () => {
        setHourHover(true);
      });
      hourInputRef.current?.removeEventListener('mouseleave', () => {
        setHourHover(false);
      });

      dayInputRef.current?.removeEventListener('mouseenter', () => {
        setDayHover(true);
      });
      dayInputRef.current?.removeEventListener('mouseleave', () => {
        setDayHover(false);
      });

      serviceInputRef.current?.removeEventListener('mouseenter', () => {
        setServiceHover(true);
      });
      serviceInputRef.current?.removeEventListener('mouseleave', () => {
        setServiceHover(false);
      });
    };
  }, []);

  useEffect(() => {
    if (currentDoctor === null || currentDoctor.services.length === 0) return;
    setServiceList(['Consulta General', ...currentDoctor.services]);
    setCurrentService(currentDoctor.services[0]);
  }, [currentDoctor]);

  const filteredDoctor =
    doctorQuery === ''
      ? doctorsData
      : doctorsData.filter((doctor) => {
          return doctor.name.toLowerCase().includes(doctorQuery.toLowerCase());
        });

  const filteredService =
    serviceQuery === ''
      ? serviceList
      : serviceList?.filter((service) => {
          return service.toLowerCase().includes(serviceQuery.toLowerCase());
        });

  const filteredDay =
    dayQuery === ''
      ? days
      : days.filter((day) => {
          return day.toLowerCase().includes(dayQuery.toLowerCase());
        });

  const filteredHour =
    hourQuery === ''
      ? hours
      : hours.filter((hour) => {
          return hour.toLowerCase().includes(hourQuery.toLowerCase());
        });

  return (
    <>
      <div className='w-full bg-sky-200 px-28 py-16'>
        <h1 className='mb-10 text-center text-3xl font-bold text-black'>
          Agenda tu hora
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
        <div className='w-full bg-white px-28 py-16'>
          <div className='mb-5'>
            {/* Doctor Combobox */}
            <h1>Doctor</h1>
            <Combobox
              value={currentDoctor}
              onChange={(value) => setCurrentDoctor(value as doctor)}
              onClose={() => setDoctorQuery('')}
            >
              <div className='relative'>
                <ComboboxInput
                  className={`w-full rounded-lg border-2 border-black py-1.5 pl-3 pr-8 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${doctorHover ? 'bg-sky-100' : 'bg-white/50'}`}
                  ref={doctorInputRef}
                  displayValue={(doctor: doctor) => doctor?.name}
                  onChange={(event) => setDoctorQuery(event.target.value)}
                />
                <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                  <ChevronDownIcon className='size-4 fill-black' />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor='bottom'
                transition
                className='w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0'
              >
                {filteredDoctor.map((doctor, idx) => (
                  <ComboboxOption
                    key={idx}
                    value={doctor}
                    className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                  >
                    <CheckIcon className='invisible size-4 fill-black group-data-[selected]:visible' />
                    <div className='text-sm/6 text-black'>
                      {doctor.name} --- {doctor.specialty}
                    </div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>
          <div>
            <div className='mb-5'>
              <h1>
                {currentDoctor
                  ? `Elija un servicio de ${currentDoctor.specialty}`
                  : 'No hay un doctor seleccionado'}
              </h1>
              <Combobox
                value={!currentDoctor ? '-----' : currentService}
                onChange={(value) => setCurrentService(value as string)}
                onClose={() => setServiceQuery('')}
                disabled={!currentDoctor}
              >
                <div className='relative'>
                  <ComboboxInput
                    className={`w-full rounded-lg border-2 border-black py-1.5 pl-3 pr-8 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${!currentDoctor ? 'bg-gray-300' : serviceHover ? 'bg-sky-100' : 'bg-white/50'}`}
                    ref={serviceInputRef}
                    displayValue={(service: string) => service}
                    onChange={(event) => setServiceQuery(event.target.value)}
                  />
                  <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                    <ChevronDownIcon className='size-4 fill-black' />
                  </ComboboxButton>
                </div>

                <ComboboxOptions
                  anchor='bottom'
                  transition
                  className='w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0'
                >
                  {filteredService.map((service, idx) => (
                    <ComboboxOption
                      key={idx}
                      value={service}
                      className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                    >
                      <CheckIcon className='invisible size-4 fill-black group-data-[selected]:visible' />
                      <div className='text-sm/6 text-black'>{service}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </div>
          </div>
          <div className='mb-5 flex flex-row'>
            <div className='mr-2'>
              <h1>Hora</h1>
              <Combobox
                value={hour}
                onChange={(value) => setHour(value as string)}
                onClose={() => setHourQuery('')}
              >
                <div className='relative'>
                  <ComboboxInput
                    className={`w-full rounded-lg border-2 border-black py-1.5 pl-3 pr-8 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${hourHover ? 'bg-sky-100' : 'bg-white/50'}`}
                    ref={hourInputRef}
                    displayValue={(currentHour: string) => currentHour}
                    onChange={(event) => setHourQuery(event.target.value)}
                  />
                  <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                    <ChevronDownIcon className='size-4 fill-black' />
                  </ComboboxButton>
                </div>

                <ComboboxOptions
                  anchor='bottom'
                  transition
                  className='w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0'
                >
                  {filteredHour.map((hour, idx) => (
                    <ComboboxOption
                      key={idx}
                      value={hour}
                      className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                    >
                      <div className='text-sm/6 text-black'>{hour}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </div>
            <div>
              <h1>Día</h1>
              <Combobox
                value={day}
                onChange={(value) => setDay(value as string)}
                onClose={() => setDayQuery('')}
              >
                <div className='relative'>
                  <ComboboxInput
                    className={`w-full rounded-lg border-2 border-black py-1.5 pl-3 pr-8 text-sm/6 text-black focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${dayHover ? 'bg-sky-100' : 'bg-white/50'}`}
                    ref={dayInputRef}
                    displayValue={(currentDay: string) => currentDay}
                    onChange={(event) => setDayQuery(event.target.value)}
                  />
                  <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5'>
                    <ChevronDownIcon className='size-4 fill-black' />
                  </ComboboxButton>
                </div>

                <ComboboxOptions
                  anchor='bottom'
                  transition
                  className='w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 transition duration-100 ease-in [--anchor-gap:var(--spacing-1)] empty:invisible data-[leave]:data-[closed]:opacity-0'
                >
                  {filteredDay.map((day, idx) => (
                    <ComboboxOption
                      key={idx}
                      value={day}
                      className='group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10'
                    >
                      <CheckIcon className='invisible size-4 fill-black' />
                      <div className='text-sm/6 text-black'>{day}</div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </Combobox>
            </div>
          </div>
          <button
            className='rounded-lg bg-sky-700 p-3 font-bold text-white'
            onClick={() =>
              console.log(
                `Reserva de Hora con Doctor: ${currentDoctor?.name}
        Día: ${day}
        Hora: ${hour}`,
              )
            }
          >
            Agendar Hora
          </button>

          <div>
        <button
      className='rounded-lg bg-sky-700 p-3 font-bold text-white mt-3'
      onClick={() => {
           if (location !== null) {
            window.open(`https://www.google.com/maps/@${location.lat},${location.lon},15z`, '_blank');
          }
        }
      }
      > Ver tu ubicación</button>

        </div>

        </div>

        
      </div>
  
    </>

          );
        }

export default Appointment; 
