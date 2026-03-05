import { useContext, useEffect } from "react";
import { PostContext } from "../postContext";

export function useFeed() {
  const context = useContext(PostContext);

  return context;
}
