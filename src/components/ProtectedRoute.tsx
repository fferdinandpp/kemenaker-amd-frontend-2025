"use client";
import { useAuth } from "../store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const token = useAuth((s) => s.token);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [token]);

  if (!ready) return <div>Loading...</div>;
  return children;
}
