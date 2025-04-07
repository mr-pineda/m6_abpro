import { Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Appointment from './Pages/Appointment';
import Footer from './components/Footer';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/m6_abpro' element={<Home />} />
        <Route path='/m6_abpro/about' element={<About />} />
        <Route path='/m6_abpro/contact' element={<Appointment />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
