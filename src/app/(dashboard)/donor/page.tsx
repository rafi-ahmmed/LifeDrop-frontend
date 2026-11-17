import { notFound } from "next/navigation";

/** Sends unmatched donor URLs to the single dashboard not-found page. */
export default function DonorCatchAllPage() {
  notFound();
}
