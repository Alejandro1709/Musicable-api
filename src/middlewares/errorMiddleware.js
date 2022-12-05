export const notFound = (req, res, next) => {
  res.status(404).send('Page not found!');
};

export const globalErrorHandler = (err, req, res, next) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).send(message);
};
