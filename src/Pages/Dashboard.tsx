import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  return (
    <>
      <h1>Dashboard Page</h1>

      {authToken === 'admin' && (
        <div className='my-5'>
          <h2>Control de doctores</h2>
          <p>
            SECCION EN DESARROLLO: En esta parte se gestionaran los doctores de
            hospital
          </p>
        </div>
      )}
      <div className='my-5'>
        <h2>Gestion de Citas</h2>
        <p>
          SECCION EN DESARROLLO: En esta parte los doctores y administradores
          gestionaran las citas agendadas por los pacientes
        </p>
      </div>

      <button
        className='my-5 w-40 rounded-2xl bg-red-900 p-3 font-bold text-white'
        onClick={() => {
          localStorage.removeItem('authToken');
          navigate('/');
        }}
      >
        logout
      </button>
    </>
  );
};

export default Dashboard;
