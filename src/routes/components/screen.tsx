import React, { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { TailSpin } from 'react-loader-spinner'

let timeout: NodeJS.Timeout
const Screen: React.FC = (): JSX.Element => {
  const { state } = useNavigation()

  const [loading, setLoading] = useState(true)
  const [opacityAnim, setOpacityAnim] = useState([true, false])

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
        <TailSpin
          visible={true}
          height="30"
          width="30"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
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
