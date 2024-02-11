import React from "react";

interface TimeInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

function TimeInput({ label, type, className, ...rest }: TimeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className={`text-10xl text-center bg-dark-800 rounded w-24 h-20 placeholder:text-dark-300 text-white ${className}`}
        type={type || "text"}
        {...rest}
      />
      {label && <span className="text-lg">{<span className="text-lg">{label}</span>}</span>}
    </div>
  );
}

export default TimeInput;
