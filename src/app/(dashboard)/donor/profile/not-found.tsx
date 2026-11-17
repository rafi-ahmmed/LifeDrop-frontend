import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Donor Profile not found"}
      description={
        "The donor profile page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
