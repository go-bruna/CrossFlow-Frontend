import { ToastContainer } from 'react-toastify'
import { useRef } from 'react'
import { Sidebar } from './base/sidebar'

interface ILayoutProps {
  children: JSX.Element
}
export const PageLayout: React.FC<ILayoutProps> = ({ children }) => {
  const topRef = useRef(null);
  
  return (
    <div className="flex justify-center items-center bg-[#040404] h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full" ref={topRef}>
      <div
        className={
          'flex w-full h-full'
        }
      >
        <Sidebar />
        <div className='w-full h-full overflow-x-hidden px-12 pt-[54px] overflow-y-auto'>
          <main className="min-h-[calc(100dvh-7.6rem)] min-w-[960px] pb-[2.5rem] lg:pb-[5rem] flex justify-center">
            <div className={'w-full min-h-full'}>{children}</div>
          </main>
        </div>

        <ToastContainer
          autoClose={false}
          hideProgressBar={true}
          newestOnTop={true}
          closeButton={false}
          className={'z-[200] w-[440px]'}
          toastClassName={
            'bg-[#212121] rounded-[10px] w-full py-1'
          }
        />
      </div>
    </div>
  )
}

