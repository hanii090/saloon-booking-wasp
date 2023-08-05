import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserBookings from '@wasp/queries/getUserBookings';
import cancelBooking from '@wasp/actions/cancelBooking';

export function UserBookings() {
  const { data: bookings, isLoading, error } = useQuery(getUserBookings);
  const cancelBookingFn = useAction(cancelBooking);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCancelBooking = (bookingId) => {
    cancelBookingFn({ bookingId });
  };

  return (
    <div className='p-4'>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{booking.dateTime}</div>
          <div>{booking.service.description}</div>
          <div>
            <button
              onClick={() => handleCancelBooking(booking.id)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
      <Link to='/services' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Book Another Service
      </Link>
    </div>
  );
}