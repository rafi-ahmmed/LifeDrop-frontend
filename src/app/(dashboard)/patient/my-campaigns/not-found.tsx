import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"My Campaigns not found"}
      description={
        "The my campaigns page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
