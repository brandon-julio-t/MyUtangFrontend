import { FunctionComponent, HTMLAttributes } from 'react';

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({className, children, ...rest}) => {
  return (
    <div {...rest} className={`max-w-7xl px-2 md:px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
