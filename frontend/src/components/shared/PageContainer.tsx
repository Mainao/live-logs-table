import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: Props) {
  return <main className={cn("px-6 py-6 w-full", className)}>{children}</main>;
}
