import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../Action/getProduct';
import NavBar from '../Components/NavBar';

export default function Detail(props) {
  const [id, setId] = useState(1);
  const [idQuery] = useSearchParams();
  const [imageLoaded, setImageLoaded] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (idQuery.get('id')) {
      try {
        setId(Number(idQuery.get('id')));
      } catch (error) {
        navigate('/');
      }
    }
  }, [idQuery, navigate]);

  const { data, status, isLoading, isError } = useQuery(
    ['productDetail', id],
    () => getProductDetail(id)
  );

  useEffect(() => {
    if (status === 'error') {
      navigate('/');
    }
  }, [navigate, status]);

  return (
    <>
      <NavBar />

      <div
        className={`container my-2 md:mt-12 flex justify-center mx-auto px-1 md:px-5 lg:px-12`}
      >
        <div className='h-120 w-full lg:w-4/5 flex justify-center'>
          <div
            className={`p-10 h-full flex w-full flex-col ${
              imageLoaded ? 'animate-pulse' : ''
            } items-center bg-white rounded-lg border shadow-md md:flex-row dark:border-gray-700 dark:bg-gray-800`}
          >
            <img
              className={`${
                imageLoaded ? 'hidden' : ''
              } object-cover h-4/5 rounded-lg mt-3 md:mt-0 w-full rounded-t-lg md:w-48 lg:w-80`}
              src={data?.image}
              alt=''
              onLoad={() => setImageLoaded(false)}
            />

            {isLoading || isError ? (
              <div className='flex justify-center items-center mb-4 border-gray-200 shadow h-48 bg-gray-300 rounded dark:bg-gray-700'>
                <svg
                  className='object-cover h-4/5 mt-3 md:mt-0 w-full rounded-t-lg md:w-48 lg:w-60 text-gray-200 dark:text-gray-600'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 640 512'
                >
                  <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
                </svg>
              </div>
            ) : (
              ''
            )}

            <div className='flex w-full flex-col justify-between md:mt-0 mt-5 lg:pl-20 md:pl-10 p-4 leading-normal'>
              {isLoading || isError ? (
                <>
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4'></div>
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-8'></div>

                  <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4'></div>
                  <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-8'></div>

                  <div className='flex justify-between items-center'>
                    <div className='h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4'></div>
                    <div className='h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4'></div>
                  </div>
                </>
              ) : (
                ''
              )}

              {!isLoading && !isError ? (
                <>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {data?.name}
                  </h5>
                  <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    {data?.description}
                  </p>

                  <p className='mb-3 font-normal font-semibold text-gray-500 dark:text-gray-200'>
                    Material : {data?.material}
                  </p>

                  <div className='flex mt-5 md:mt-0 w-full items-center justify-between'>
                    <span className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                      ${data?.price}
                    </span>

                    <button
                      className='inline-flex items-center py-3 px-3 text-sm
              font-medium text-center text-white bg-blue-700 rounded-lg
              hover:bg-blue-800 focus:ring-4 focus:outline-none
              focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      Buy Now
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
                    </button>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
