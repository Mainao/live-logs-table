import Header from "@/components/shared/Header";
import PageContainer from "@/components/shared/PageContainer";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <PageContainer className="flex-1">{children}</PageContainer>
    </div>
  );
}
