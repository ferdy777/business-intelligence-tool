import toast, { Themes } from "react-simple-toasts";

const useToast = () => {
  const handleSuccessToast = (message: string) => {
    toast(message, { theme: Themes.SUCCESS });
  };

  const handleErrorToast = (message: string) => {
    toast(message, { theme: Themes.SUCCESS });
  };

  const handleInfoToast = (message: string) => {
    toast(message, { theme: Themes.INFO });
  };

  return { handleErrorToast, handleSuccessToast, handleInfoToast };
};

export default useToast;
