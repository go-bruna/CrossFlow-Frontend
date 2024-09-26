import ReactDOM from 'react-dom/client'
import Providers from './providers'
import Modal from 'react-modal'
import router from './routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import 'react-modern-drawer/dist/index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'rc-slider/assets/index.css'
import './style/index.css'

Modal.setAppElement('#root')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} />
  </Providers>
)
