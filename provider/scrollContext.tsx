/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useMemo, useState } from "react";

import { ScrollPosition } from "@/redux/slice/searchResultSlice";

interface IScrollContext {
  isBottom: boolean
  divRef: React.RefObject<HTMLDivElement> | null
  setDivRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement> | null>>
  handleScrollTop(): void
  handleScrollTo(x: number, y: number): void
  scrollPosition?: ScrollPosition

}

export const ScrollContext = createContext<IScrollContext>({
  divRef: null,
  handleScrollTo (x: number, y: number): void {
  },
  handleScrollTop: () => { },
  isBottom: false,
  setDivRef: () => { }
})

function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isBottom, setIsBottom] = useState<boolean>(false)
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>()
  const [divRef, setDivRef] = useState<React.RefObject<HTMLDivElement> | null>(null)

  function handleScrollTop() {
    const div = divRef?.current

    if(!div) return

    div.scrollTo({
      'behavior': 'smooth',
      'top': 0
    })
  }

  function handleScrollTo(x: number, y: number) {
    const div = divRef?.current

    if(!div) return

    div.scrollTo(x, y);
  }

  function handleScroll() {
    const div = divRef?.current

    if(!div) return

    const { scrollTop, clientHeight, scrollHeight, scrollLeft  } = div;

    setScrollPosition({x: scrollLeft, y: scrollTop});

    if (scrollTop + clientHeight >= scrollHeight) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }
  useEffect(() => {
    const div = divRef?.current

    if(!div) return () => {}

    div.addEventListener('scroll', handleScroll);
    return () => {
      div.removeEventListener('scroll', handleScroll);
    };
  }, [divRef]);


  const value: IScrollContext = useMemo(() => ({
    divRef,
    handleScrollTo,
    handleScrollTop,
    isBottom,
    scrollPosition,
    setDivRef
  }), [isBottom, divRef, scrollPosition])

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollProvider