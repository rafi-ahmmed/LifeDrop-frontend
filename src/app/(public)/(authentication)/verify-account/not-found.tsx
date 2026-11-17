import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Account Verification not found"}
      description={
        "The account verification page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
