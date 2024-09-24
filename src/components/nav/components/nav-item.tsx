import { NavLink } from 'react-router-dom'
import { Typography } from '@/components/typography'

interface Props {
  to: string
  label: string
  icon?: string
}
export const NavItem = (props: Props) => {
  return (
    <NavLink
      to={props.to}
      aria-label={props.label}
    >
      {({ isActive }) => (
        <Typography
          className={isActive ? 'font-bold' : 'font-normal'}
          variant={'label-medium'}
        >
          {props.label}
        </Typography>
      )}
    </NavLink>
  )
}
