import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Patient Dashboard not found"}
      description={
        "The patient dashboard page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
