import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Admin Overview not found"}
      description={
        "The admin overview page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
