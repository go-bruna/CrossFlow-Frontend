import { useEffect, useRef, useState } from 'react'

type TWindowSize = {
  width: number
  height: number
}

type TReturn = {
  windowSize: TWindowSize
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export const useWindowSize = (): TReturn => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [windowSize, setWindowSize] = useState<TWindowSize>(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 200)
    }

    // Setup a window resize listener
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobile = windowSize.width <= 767
  const isTablet = windowSize.width > 767 && windowSize.width <= 1023
  const isDesktop = windowSize.width >= 1024

  return { windowSize, isMobile, isTablet, isDesktop }
}
