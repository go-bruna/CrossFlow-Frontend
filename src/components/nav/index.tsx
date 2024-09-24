// import { Typography } from "../typography"
import Card from '../card'
import { Typography } from '../typography'
import { NavItem } from './components/nav-item'
import { ROUTES } from '@/constants/routes'

export const Navbar = () => {
  // Stake
  const renderLiStake = () => {
    return (
      <li className="flex items-center">
        <NavItem to={ROUTES.STAKE} label={'Staking'} />
      </li>
    )
  }

  // delegate
  const renderLiDelegate = () => {
    return (
      <li className="flex items-center">
        {/* <NavItem to={ROUTES.DELEGATE} label={'Delegate Portal'} /> */}
        <Typography
          variant={'label-medium'}
          className='cursor-pointer'
          onClick={() => window.open("https://poc.sandbox.ordibank.org/main", "_blank")}
        >
          {'Try POC'}
        </Typography>
        <Card.Wrapper
          isShadow={false}
          classOverride={{
            container: 'ml-2',
            subContainer: 'p-0'
          }}
        >
          <div className="w-full bg-white px-2 py-1 rounded-[18px]">
            <Typography 
              variant="label-extrasmall" 
              className='font-bold text-sky-500'
            >
              {'New'}
            </Typography>
          </div>
        </Card.Wrapper>
      </li>
    )
  }

  return (
    <div className="">
      <nav>
        <ul className="inline-flex gap-[1.25rem]">
          {renderLiStake()}
          {renderLiDelegate()}
        </ul>
      </nav>
    </div>
  )
}
