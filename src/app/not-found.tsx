import type { Metadata } from "next";
import NotFoundContent from "@/components/shared/not-found-content";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <div>
      <NotFoundContent />
    </div>
  );
};

export default NotFound;
