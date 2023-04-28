import React, { createContext, useEffect, useMemo, useState } from "react";

interface IScrollContext {
  isBottom: boolean
  divRef: React.RefObject<HTMLDivElement> | null
  setDivRef: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement> | null>>
  handleScrollTop(): void
}

export const ScrollContext = createContext<IScrollContext>({
  divRef: null,
  handleScrollTop: () => {},
  isBottom: false,
  setDivRef: () => {}
})

function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isBottom, setIsBottom] = useState<boolean>(false)
  const [divRef, setDivRef] = useState<React.RefObject<HTMLDivElement> | null>(null)

  function handleScrollTop() {
    const div = divRef?.current

    if(!div) return

    div.scrollTo({
      'behavior': 'smooth',
      'top': 0
    })
  }

  function handleScroll() {
    
    const div = divRef?.current

    if(!div) return

    const { scrollTop, clientHeight, scrollHeight } = div;
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
    handleScrollTop,
    isBottom,
    setDivRef
  }), [isBottom, divRef])

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  )
}

export default ScrollProvider