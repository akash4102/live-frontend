import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "info", options = {}) => {
  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "warning":
      toast.warn(message, defaultOptions);
      break;
    case "info":
    default:
      toast.info(message, defaultOptions);
      break;
  }
};
