import type { PropsWithChildren } from 'react';
import './Container.css';

export function Container({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>;
}
