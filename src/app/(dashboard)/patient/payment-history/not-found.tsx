import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Payment History not found"}
      description={
        "The payment history page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
