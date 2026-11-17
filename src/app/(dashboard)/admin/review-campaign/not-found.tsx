import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Review Fund Campaigns not found"}
      description={
        "The review fund campaigns page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
