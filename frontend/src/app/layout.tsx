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

      {/* Important: flex-1 makes remaining space available */}
      <PageContainer className="flex-1">{children}</PageContainer>
    </div>
  );
}
