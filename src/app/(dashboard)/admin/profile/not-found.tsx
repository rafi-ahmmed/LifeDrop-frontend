import NotFoundContent from "@/components/shared/not-found-content";

export default function NotFound() {
  return (
    <NotFoundContent
      title={"Admin Profile not found"}
      description={
        "The admin profile page you requested is unavailable or may have moved. Head back home and keep exploring LifeDrop."
      }
    />
  );
}
