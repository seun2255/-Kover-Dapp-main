import React from "react";

interface TypograpyProps {
  className?: string;
  children?: string | JSX.Element;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "b" | "subtitle1" | "subtitle2";
}

function Typograpy({ children, className, variant, ...rest }: TypograpyProps) {
  const attributes = {
    className: `typography ${variant} ${className}`,
    ...rest,
  };

  let render = <p {...attributes}>{children}</p>;

  switch (variant) {
    case "h1":
      render = <h1 {...attributes}>{children}</h1>;
      break;
    case "h2":
      render = <h2 {...attributes}>{children}</h2>;
      break;
    case "h3":
      render = <h3 {...attributes}>{children}</h3>;
      break;
    case "h4":
      render = <h4 {...attributes}>{children}</h4>;
      break;
    case "h5":
      render = <h5 {...attributes}>{children}</h5>;
      break;
    case "h6":
      render = <h6 {...attributes}>{children}</h6>;
      break;
    case "p":
      render = <p {...attributes}>{children}</p>;
      break;
    case "b":
      render = <b {...attributes}>{children}</b>;
      break;
    case "span":
      render = <span {...attributes}>{children}</span>;
      break;
    case "subtitle1":
      render = <span {...attributes}>{children}</span>;
      break;
    case "subtitle2":
      render = <span {...attributes}>{children}</span>;
      break;

    default:
      render = <p {...attributes}>{children}</p>;
      break;
  }

  return render;
}

export default Typograpy;
