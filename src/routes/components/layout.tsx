import { Outlet } from 'react-router-dom'
import { PageLayout } from '@/components/layout'

// import { useTheme } from '@/contexts/theme'
// import { ThemeManager } from '@/contexts/theme/manager'
interface Props {
  children: JSX.Element
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <PageLayout>{props.children ?? <Outlet />}</PageLayout>
    </>
  )
}

export default Layout