import { MainLogoIcon } from "@/assets/icons/logo";
import { Avatar } from "@/components/avatar";
import { Typography } from "@/components/typography";
import { ROUTES } from "@/constants/routes";
import { ISidebar } from "@/types/interfaces";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const SIDEBAR_DATA = [{
  title: 'Account',
  // icon: <SidebarMainPoolsIcon />
}, {
  title: 'Main Pools',
  // icon: <SidebarAccountIcon />
}, {
  title: 'Staking',
  // icon: <SidebarStakingIcon />
}, {
  title: 'Governance',
  // icon: <SidebarGovernanceIcon />
}] as ISidebar[]

export const Sidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [ selectedItem, setSelectedItem ] = useState<ISidebar>(SIDEBAR_DATA[0])

  const gotoMain = () => {
		window.open("https://main.d1zteq5olzyzc2.amplifyapp.com/", "_blank");
	};

  const navigatePage = {
    'main': ROUTES.MAIN,
    'account': ROUTES.ACCOUNT,
    'staking': ROUTES.STAKE,
    'governance': ROUTES.GOVERNANCE
  }[(selectedItem.title as string).split(' ')[0].toLowerCase() || 'main'] as string
  
  useMemo(() => {
    navigate(navigatePage)
  }, [selectedItem])

  useEffect(() => {
    const filter_url = SIDEBAR_DATA.filter((e: ISidebar) => pathname.includes(e.title.toLowerCase().split(' ')[0]))
    if (filter_url && filter_url.length > 0) {
      setSelectedItem(filter_url[0])
      navigate(filter_url[0].title.toLowerCase().split(' ')[0].toLowerCase())
    }
  }, [])
  
  return (
    <div className="h-full min-w-[246px] bg-[#101010]">
      {/* logo */}
      <div
        className="flex items-center gap-2 cursor-pointer px-5 pt-5 pb-7 w-full"
        onClick={gotoMain}
      >
        <Avatar 
          icon={<MainLogoIcon />}
          className="w-auto" 
        />
        {/* <Typography variant="h5" className="font-bold text-white">
          OrdiBank
        </Typography> */}
      </div>

      {/* Sidebar options */}
      {SIDEBAR_DATA.map((item: ISidebar, index: number) => (
        <div 
          className={twMerge(
            "flex flex-1 items-center gap-2 hover:bg-[#5e7e8e]/10 p-5 cursor-pointer border-l border-l-8 border-transparent",
            item.title === selectedItem.title && 'border-l border-l-8 border-[#36f5cf] bg-[#5e7e8e]/10'
          )}
          key={index}
          onClick={() => {
            setSelectedItem(item)
          }}
        >
          {item.icon}
          <Typography 
            variant="label-small" 
            // className="text-white text-sm crossflow-semibold"
            className="text-white text-sm"
          >
            {item.title}
          </Typography>
        </div> 
      ))}
    </div>
  )
}