import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"About Us not found"}
      description={
        "The about us page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
