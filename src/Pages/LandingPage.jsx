import React, { useEffect, useState } from 'react';
import { getProduct } from '../Action/getProduct';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Card from '../Components/Card';
import NavBar from '../Components/NavBar';
import Pagination from '../Components/Pagination';
import CardSkeleton from '../Components/CardSkeleton';

export default function LandingPage() {
  // eslint-disable-next-line no-unused-vars
  const [pageQuery, setPageQuery] = useSearchParams();

  const { register, handleSubmit } = useForm();
  const [pageCounter, setPageCounter] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPageQuery({ page: pageCounter });
  }, [pageCounter, setPageQuery]);

  const {
    isLoading,
    data,
    status: dataStatus
  } = useQuery(['products', search, pageCounter], () =>
    getProduct(pageCounter, search)
  );

  const { data: hasMoreData, status: hasMoreDataStatus } = useQuery(
    ['products', search, pageCounter + 1],
    () => getProduct(pageCounter + 1, search)
  );

  const onSubmit = (data) => {
    setPageCounter(1);
    setSearch(data.search);
  };

  return (
    <>
      <NavBar />

      <div className='container mt-12 mx-auto px-5 md:px-12'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'
          >
            Search
          </label>
          <div className='relative flex justify-center'>
            <input
              type='search'
              id='default-search'
              className='block p-4 pl-4 w-1/2 h-10 mr-5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Search Products, Stuff...'
              {...register('search')}
            />

            <button
              type='submit'
              className='text-white w-24 bg-blue-700 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Search
            </button>
          </div>
        </form>

        <div className='my-10 flex flex-wrap -mx-1 lg:-mx-4'>
          {isLoading && <CardSkeleton count={6} />}

          {dataStatus === 'success' && data?.length === 0 && (
            <div className='w-full text-center text-gray-500'>
              <h1 className='text-2xl font-bold'>No Data Found</h1>
            </div>
          )}

          {!isLoading &&
            data?.map((item) => {
              return <Card key={item.id} product={item} />;
            })}
        </div>
      </div>

      <Pagination
        page={pageCounter}
        prevPage={() => {
          setPageCounter((prev) => prev - 1);
        }}
        nextPage={() => {
          setPageCounter((prev) => prev + 1);
        }}
        hasMoreData={
          hasMoreDataStatus === 'success' && !(hasMoreData?.length === 0)
        }
      />
    </>
  );
}
