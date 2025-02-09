
import { LockFilled } from '@ant-design/icons'; // You can use any icon library or custom SVG
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
    
        <div className="mb-6">
          <LockFilled className="text-6xl text-red-500" />
        </div>


        <h1 className="text-4xl font-bold text-gray-900 mb-4">403 - Forbidden</h1>

   
        <p className="text-lg text-gray-600 mb-8">
          You do not have permission to access this page.
        </p>

    
        <Link
          to="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;