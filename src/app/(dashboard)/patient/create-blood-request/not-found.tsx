import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Create Blood Request not found"}
      description={
        "The create blood request page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
