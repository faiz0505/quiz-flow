import toast from "react-hot-toast";

export const ErrorHandler = (error) => {
  toast.error(
    typeof error === "string"
      ? error
      : "Error occurred while processing your request! "
  );
};
