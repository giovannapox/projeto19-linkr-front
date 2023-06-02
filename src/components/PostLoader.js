import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function PostLoader() {
  return (
    <Skeleton
      height={245}
      baseColor="#171717"
      highlightColor="#333"
      style={{ borderRadius: 16 }}
    />
  );
}
