import { type ReactNode } from "react";

export const CButton = (props: any): ReactNode => {
  return (
    <button
      className="p-0.5 hover:cursor-pointer hover:scale-110 ease-in-out duration-75"
      {...props}
    >
      {props.children}
    </button>
  );
};
