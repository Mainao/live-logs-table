import Header from '@/components/shared/Header';
import PageContainer from '@/components/shared/PageContainer';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <PageContainer>{children}</PageContainer>
    </div>
  );
}
