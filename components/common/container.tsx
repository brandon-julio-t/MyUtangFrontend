import { FunctionComponent, HTMLAttributes } from 'react';

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div {...props} className={`max-w-7xl px-2 md:px-4 ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Container;
