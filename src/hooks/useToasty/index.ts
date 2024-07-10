import {
  ToastContent,
  ToastOptions,
  toast as reactToasty,
} from "react-toastify";

export const useToasty = () => {
  const toast = <ContentType = unknown>({
    content,
    options,
  }: {
    content: ToastContent<ContentType>;
    options?: ToastOptions<ContentType>;
  }) => {
    reactToasty<ContentType>(content, {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
      ...options,
    });
  };

  const successOnToast = <ContentType = string>(
    content: ToastContent<ContentType>,
    options?: ToastOptions<ContentType>
  ) => {
    toast({
      content,
      options: { ...options, type: "success" },
    });
  };

  const errorOnToast = <ContentType = string>(
    content: ToastContent<ContentType>,
    options?: ToastOptions<ContentType>
  ) => {
    toast({
      content,
      options: { ...options, type: "error" },
    });
  };

  const warningOnToast = <ContentType = string>(
    content: ToastContent<ContentType>,
    options?: ToastOptions<ContentType>
  ) => {
    toast({
      content,
      options: { ...options, type: "warning" },
    });
  };

  return {
    successOnToast,
    errorOnToast,
    warningOnToast,
  };
};
