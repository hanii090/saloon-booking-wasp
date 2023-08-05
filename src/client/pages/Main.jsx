import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getServices from '@wasp/queries/getServices';

export function MainPage() {
  const { data: services, isLoading, error } = useQuery(getServices);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to Saloon Booking</h1>
      <p className='mb-4'>Browse through our services and book an appointment today!</p>
      <div className='flex gap-4'>
        <Link to='/services' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Services</Link>
        <Link to='/user/bookings' className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>User Bookings</Link>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Our Services:</h2>
        {services.map((service) => (
          <div key={service.id} className='bg-white p-4 mb-4 rounded-lg'>
            <h3 className='text-lg font-bold mb-2'>{service.description}</h3>
            <p>Price: ${service.price}</p>
            <Link to={`/services/${service.id}`} className='block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Book Now</Link>
          </div>
        ))}
      </div>
    </div>
  );
}