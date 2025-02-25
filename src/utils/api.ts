import axios from 'axios';
import { doctor, user } from '../types/data';
import { useEffect, useState } from 'react';

const api = axios.create({
  timeout: 1000,
});

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<doctor[]>([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const cache = await caches.open('pwa-cache-v1');
        console.log('cache keys: ', await cache.keys());
        const cachedResponse = await cache.match('/data/doctors.json');
        // console.log('cached response:', cachedResponse);

        if (cachedResponse) {
          const data = await cachedResponse.json();
          setDoctors(data);
        } else {
          const res = await api.get<doctor[]>('/data/doctors.json');
          setDoctors(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDoctors();
  }, []); //Se ejecuta una única vez
  return doctors;
};

export const login = async (user: string, password: string) => {
  try {
    const res = await api.get<user[]>('/data/users.json');
    const users = res.data;
    const valid_user = users.find((u) => {
      return u.name === user && u.password === password;
    });
    if (valid_user === undefined) {
      // console.error("ERROR: Usuario o contraseña incorrectos");
      return null;
    }
    return valid_user;
  } catch (error) {
    // If status is out of range of 2xx axios will throw an error
    console.error('ERROR:', error);
    return null;
  }
};
