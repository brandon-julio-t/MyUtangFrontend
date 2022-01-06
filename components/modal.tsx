import { FunctionComponent, HTMLAttributes } from "react";

const Modal: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div {...props} className={`fixed inset-0 h-screen w-screen z-50 ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Modal;
