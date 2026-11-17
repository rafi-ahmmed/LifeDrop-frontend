"use client";
import ErrorContent from "@/components/shared/error-content";


export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return <ErrorContent error={error} retry={retry} />;
}
