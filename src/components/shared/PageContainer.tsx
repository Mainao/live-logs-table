import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return <main className="px-6 py-6 w-full">{children}</main>;
}
