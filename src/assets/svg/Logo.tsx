import { Droplet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
          <Droplet className="w-5 h-5 fill-primary" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Life<span className="text-primary">Drop</span>
        </span>
      </Link>
    </div>
  );
}
