import toast from "react-hot-toast";

// Toast animation styles - inline to avoid CSS module import issues in lib files
const animationStyles = {
  enter: "animate-toast-enter",
  exit: "-translate-y-4 opacity-0 scale-90",
};

type ToastType = "success" | "info" | "warning" | "error";

const icons: Record<ToastType, JSX.Element> = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const alertClasses: Record<ToastType, string> = {
  success: "alert-success",
  info: "alert-info",
  warning: "alert-warning",
  error: "alert-error",
};

interface CustomToastOptions {
  duration?: number;
}

export function showToast(
  message: string,
  type: ToastType = "info",
  options: CustomToastOptions = {}
) {
  const { duration = 2000 } = options;

  return toast.custom(
    (t) => (
      <div
        role="alert"
        className={`${
          t.visible ? animationStyles.enter : animationStyles.exit
        } alert ${alertClasses[type]} transition-all duration-300 ease-in-out`}
      >
        {icons[type]}
        <span className="font-bold">{message}</span>
      </div>
    ),
    { duration }
  );
}

// Convenience methods
export const customToast = {
  success: (message: string, options?: CustomToastOptions) =>
    showToast(message, "success", options),
  info: (message: string, options?: CustomToastOptions) =>
    showToast(message, "info", options),
  warning: (message: string, options?: CustomToastOptions) =>
    showToast(message, "warning", options),
  error: (message: string, options?: CustomToastOptions) =>
    showToast(message, "error", { duration: 4000, ...options }),
};

export default customToast;