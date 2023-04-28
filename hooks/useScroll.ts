import { useContext } from "react";

import { ScrollContext } from "@/provider/scrollContext";

function useScroll() {
  const context = useContext(ScrollContext)


  return context
}

export default useScroll