import HttpError from '@wasp/core/HttpError.js'

export const getServices = async (args, context) => {
  const services = await context.entities.Service.findMany();
  return services;
}

export const getUserBookings = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Booking.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}

export const createBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { dateTime, serviceId } = args;

  const booking = await context.entities.Booking.create({
    data: {
      dateTime,
      user: { connect: { id: context.user.id } },
      service: { connect: { id: serviceId } }
    }
  });

  return booking;
}

export const cancelBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { bookingId } = args;

  const booking = await context.entities.Booking.findUnique({
    where: { id: bookingId }
  });

  if (!booking) { throw new HttpError(404, `Booking with id ${bookingId} not found`); }

  if (booking.userId !== context.user.id) { throw new HttpError(403) }

  await context.entities.Booking.delete({
    where: { id: bookingId }
  });

  return booking;
}