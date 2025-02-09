
import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';
import Footer from '../ui/Footer';



const MainLaylout = () => {

  return (
    <div className='bg-white'>
      <nav className='flex w-full justify-center items-center'>
        <Navbar></Navbar>
 
      </nav>
      <div className='max-w-[1200px] min-h-[calc(100vh-400px)] w-full mx-auto'>
        <Outlet />
      </div>
        <Footer/>
    </div>
  );
};

export default MainLaylout;