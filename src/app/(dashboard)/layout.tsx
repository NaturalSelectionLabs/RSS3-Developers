"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSIWE } from "connectkit";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isSignedIn } = useSIWE();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn]);

  return <>{children}</>;
}
