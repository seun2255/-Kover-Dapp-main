import React from "react";

interface TextDirectionProps {
  children: JSX.Element | JSX.Element[];
  right?: boolean;
}

function TextDirection({ children, right }: TextDirectionProps) {
  return (
    <div className={`flex ${right ? "justify-end" : "justify-start"}`}>
      <div className="w-4/5 md:w-1/2 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

export default TextDirection;
