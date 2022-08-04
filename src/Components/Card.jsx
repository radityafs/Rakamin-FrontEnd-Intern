import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const [isLoading, setIsLoading] = useState(true);

  const { product } = props;

  return (
    <div className='my-2 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 bg-white'>
      {isLoading && (
        <div className='flex justify-center items-center border-gray-200 shadow dark:border-gray-700 h-40 bg-gray-300 rounded dark:bg-gray-700 animate-pulse'>
          <svg
            className='w-12 h-12 text-gray-200 dark:text-gray-600'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 640 512'
          >
            <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
          </svg>
        </div>
      )}

      <Link to={`/detail?id=${product.id}`}>
        <img
          className={`${
            isLoading ? 'hidden' : ''
          } rounded-t-lg w-full h-40 object-cover object-center`}
          src={product.image}
          alt=''
          onLoad={() => setIsLoading(false)}
        />
      </Link>

      <div className='dark:bg-gray-800 h-52 flex justify-between flex-col dark:border-gray-700 p-5 rounded-b-lg border border-gray-200 shadow-md'>
        <Link to={`/detail?id=${product.id}`}>
          <h5 className='text-2xl h-8 overflow-hidden font-bold tracking-tight text-gray-900 dark:text-white'>
            {product.name}
          </h5>
        </Link>
        <p className='h-12 overflow-hidden font-normal text-gray-700 dark:text-gray-400'>
          {product.description.length > 50
            ? product.description.substr(0, 50) + '...'
            : product.description}
        </p>

        <div className='flex justify-between'>
          <h4 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
            ${product.price}
          </h4>

          <Link
            to={`/detail?id=${product.id}`}
            href='/#'
            className='inline-flex items-center py-2 px-3 text-sm
            font-medium text-center text-white bg-blue-700 rounded-lg
            hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Read more
            <svg
              aria-hidden='true'
              className='ml-2 -mr-1 w-4 h-4'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
