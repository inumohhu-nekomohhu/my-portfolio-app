// frontend/src/components/inventory/ToastNotification.tsx
import React from "react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error";
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, type }) => {
  const bgClass = type === "success" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700";
  return (
    <div className={`absolute top-0 left-0 right-0 p-2 text-center ${bgClass}`}>
      {message}
    </div>
  );
};

export default ToastNotification;
