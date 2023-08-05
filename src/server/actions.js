import HttpError from '@wasp/core/HttpError.js'

export const createBooking = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { userId, serviceId } = args;

  const user = await context.entities.User.findUnique({
    where: { id: userId }
  });
  if (!user) { throw new HttpError(404, 'User not found'); }

  const service = await context.entities.Service.findUnique({
    where: { id: serviceId }
  });
  if (!service) { throw new HttpError(404, 'Service not found'); }

  const dateTime = new Date();

  const booking = await context.entities.Booking.create({
    data: {
      dateTime,
      user: { connect: { id: userId } },
      service: { connect: { id: serviceId } }
    }
  });

  return booking;
}

export const cancelBooking = async ({ bookingId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const booking = await context.entities.Booking.findUnique({
    where: { id: bookingId }
  });

  if (booking.userId !== context.user.id) { throw new HttpError(403) };

  await context.entities.Booking.delete({
    where: { id: bookingId }
  });
}