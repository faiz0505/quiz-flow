export const ErrorHandler = (error) => {
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
