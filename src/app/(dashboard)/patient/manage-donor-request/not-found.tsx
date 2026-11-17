import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Donor Requests not found"}
      description={
        "The donor requests page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
