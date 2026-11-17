import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Manage Blood Requests not found"}
      description={
        "The manage blood requests page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
