import { Input } from '@headlessui/react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { login } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <div className='w-full bg-sky-200 px-28 py-16'>
        <h1 className='mb-10 text-center text-3xl font-bold text-black'>
          Acceso de persoal
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
      <div className='m-20 flex flex-col items-center justify-center rounded-xl bg-sky-300'>
        <div className='flex flex-col items-center justify-center'>
          <label className='font-bold text-black'>Usuario</label>
          <Input
            type='text'
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className='h-10 w-80 rounded-lg border-2 border-black p-2'
          />
          <label className='font-bold text-black'>Contraseña</label>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='h-10 w-80 rounded-lg border-2 border-black p-2'
          />
        </div>

        <button
          className='my-5 w-40 rounded-2xl bg-sky-950 p-3 font-bold text-white'
          onClick={async () => {
            const chek = await login(user, password);
            if (chek === null) {
              console.warn('Usuario o contraseña incorrectos');
              return;
            }
            localStorage.setItem('authToken', chek.role);
            navigate('/dashboard');
          }}
        >
          login
        </button>
      </div>
    </>
  );
};

export default Login;
