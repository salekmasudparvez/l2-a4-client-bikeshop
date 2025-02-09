import { EyeFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {

  productName: string;
  model: string;
  category: string;
  brand: string;
  price: number;
  available: boolean;
  photoURL: string;
  url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  model,
  category,
  brand,
  price,
  available,
  photoURL,
  url
}) => {
  return (
    <div className="relative group bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-transparent hover:border-gradient transition-all duration-100">
      <div className="relative p-6 bg-white rounded-lg">

        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={photoURL}
            alt={productName}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <Tooltip title={productName} >
          <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">{productName}</h2>
        </Tooltip>
        <p className="text-xs text-gray-600 mb-1">
          <span className="font-semibold">Model:</span> {model}
        </p>
        <p className="text-xs text-gray-600 mb-1">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-xs text-gray-600 mb-1">
          <span className="font-semibold">Brand:</span> {brand}
        </p>
        <p className="text-xs text-gray-600 mb-4">
          <span className="font-semibold">Price:</span> ${price.toLocaleString()}
        </p>
        <div className='flex justify-between p-1 items-center'>
          <div>
            <Link className='btn btn-sm rounded-full border-none bg-blue-500 text-white' to={url}>
                View <EyeFilled/>
            </Link>
          </div>
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
          >
            {available ? 'Available' : 'Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;