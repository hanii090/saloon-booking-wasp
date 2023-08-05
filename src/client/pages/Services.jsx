import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getServices from '@wasp/queries/getServices';
import createBooking from '@wasp/actions/createBooking';

export function Services() {
  const { data: services, isLoading, error } = useQuery(getServices);
  const createBookingFn = useAction(createBooking);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleBookService = (serviceId) => {
    createBookingFn({ serviceId });
  };

  return (
    <div className='p-4'>
      {services.map((service) => (
        <div
          key={service.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{service.description}</div>
          <div>Price: {service.price}</div>
          <button
            onClick={() => handleBookService(service.id)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Book
          </button>
          <Link
            to={`/services/${service.id}`}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}