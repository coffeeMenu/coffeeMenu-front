export const errorHandler = (err: any, stack: string) => {
  console.error(err);
  err.status && console.log(err.status);

  console.info('at:', stack);
};
