import React, { useEffect, useState } from 'react'
import { matchPath, Outlet, useNavigation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import useDebounce from '@/hooks/useDebounce'
import { ROUTES } from '@/constants/routes'

let timeout: NodeJS.Timeout
const Screen: React.FC = (): JSX.Element => {
  const { state } = useNavigation()

  const [loading, setLoading] = useState(true)
  const [opacityAnim, setOpacityAnim] = useState([true, false])
  const debouncedLocation = useDebounce({
    value: location?.pathname ?? '',
    delay: 500,
    enabled: true,
  })

  const handleStateChange = async () => {
    clearTimeout(timeout)
    if (state === 'loading') {
      setOpacityAnim([true, false])
      await new Promise((resolve) => {
        timeout = setTimeout(resolve, 300)
      })
      setLoading(true)
    } else {
      setOpacityAnim([false, true])
      await new Promise((resolve) => {
        timeout = setTimeout(resolve, 300)
      })
      setLoading(false)
    }
  }

  const getSkeleton = () => {
    if (matchPath({ path: ROUTES.ACCOUNT }, debouncedLocation)) {
      return <h1 className='text-white'>Account</h1>
    } else if (matchPath({ path: ROUTES.MAIN}, debouncedLocation)) {
      return <h1 className='text-white'>MAIN</h1>
    } else if (matchPath({ path: ROUTES.STAKE }, debouncedLocation)) {
      return <h1 className='text-white'>STAKE</h1>
    } else if (matchPath({ path: ROUTES.GOVERNANCE }, debouncedLocation)) {
      return <h1 className='text-white'>GOVERNANCE</h1>
    }
    return <h1 className='text-white'>Account</h1>
  }

  useEffect(() => {
    handleStateChange()
  }, [state])

  if (loading) {
    return (
      <div
        className={twMerge(
          'flex flex-col p-8 pt-4 desktop:px-8 desktop:py-8 transition-opacity duration-300 ease-in-out h-full items-center justify-center',
          opacityAnim[0] ? 'opacity-100' : 'opacity-0'
        )}
      >
        {getSkeleton()}
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        'transition-opacity duration-300 ease-in-out',
        opacityAnim[1] ? 'opacity-100' : 'opacity-0'
      )}
      data-cy="main-container"
    >
      <Outlet />
    </div>
  )
}

export default Screen
