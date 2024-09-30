import { ClipboardIcon } from "@/assets/icons/clipboard";
import { DocumentIcon } from "@/assets/icons/document";
import { MainLogoIcon } from "@/assets/icons/logo";
import { GitHubIcon, TelegramIcon, TwitterIcon } from "@/assets/icons/social-icons";
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
    <div className="h-full flex flex-col justify-between min-w-[246px] bg-[#101010]">
      <div>
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

      {/* Documents and Socials */}
      <div className="flex flex-col gap-5 mt-auto px-[14px] mb-5">
        <div className="flex items-center py-[18px] border-b border-[#36f5cf]/10 cursor-pointer">
          <Avatar icon={<DocumentIcon />}/>
          <Typography variant="label-small" className="text-sm">Documentation</Typography>
          <Avatar icon={<ClipboardIcon />} className="ml-auto"/>
        </div>
        <div className="flex items-center items-center gap-[14px]">
          <Avatar icon={<TwitterIcon />} className="w-[42px] h-[42px]"/>
          <Avatar icon={<TelegramIcon />} className="w-[42px] h-[42px]" />
          <Avatar icon={<GitHubIcon />} className="w-[42px] h-[42px]" />
        </div>
      </div>
    </div>
  )
}