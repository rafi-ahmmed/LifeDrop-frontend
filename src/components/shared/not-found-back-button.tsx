"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

/**
 * Returns the visitor to the page they were on before landing on the 404.
 * Rendered as a Client Component because browser history is only known on the
 * client.
 */
export default function NotFoundBackButton() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  if (!canGoBack) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-9 gap-1.5 rounded-xl text-xs"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      Go back
    </Button>
  );
}
