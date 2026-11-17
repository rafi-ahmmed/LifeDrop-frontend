import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Page not found"}
      description={
        "The page you are looking for does not exist, has been moved, or is temporarily unavailable."
      }
    />
  );
}
