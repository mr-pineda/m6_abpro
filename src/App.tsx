import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Appointment from './Pages/Appointment';
import Footer from './components/Footer';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
