import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Sign In not found"}
      description={
        "The sign in page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
