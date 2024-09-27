import Button from '@/components/button'
// import { useModal } from '@/contexts/interface'
// import { WalletAddress } from '@/components/wallet-address'
import { Avatar } from '@/components/avatar'
import { LogoIcon } from '@/assets/icons/logo'
import { DropdownIcon } from '@/assets/icons/dropdown'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { EthereumIMG } from '@/assets/icons/png'

export const Header = () => {
  // const { setModal } = useModal()

  // const ethIcon = () => <WalletAddress walletType={'Ethereum'} />
  
  // const openModal = () => {
  //   setModal({ id: 'CONNECT_WALLET' })
  // }

  const gotoMain = () => {
    // window.open("https://main.d1zteq5olzyzc2.amplifyapp.com/", "_blank")
  }
  
  return (
    <div className="relative flex justify-between items-center h-[3.5rem] w-full mt-[24px]">
      <div className='flex items-center gap-2 cursor-pointer' onClick={gotoMain}>
        <Avatar 
          className='w-[40px] h-[40px]'
          icon={<LogoIcon />}
        />
      </div>

      <ConnectButton.Custom>
				{({
					account,
					chain,
					openAccountModal,
					openChainModal,
					openConnectModal,
					authenticationStatus,
					mounted,
				}) => {
					// Note: If your app doesn't use authentication, you
					// can remove all 'authenticationStatus' checks
					const ready = mounted && authenticationStatus !== "loading";
					const connected =
						ready &&
						account &&
						chain &&
						(!authenticationStatus || authenticationStatus === "authenticated");

					return (
						<div
							{...(!ready && {
								"aria-hidden": true,
								style: {
									opacity: 0,
									pointerEvents: "none",
									userSelect: "none",
								},
							})}
						>
							{(() => {
								if (!connected) {
									return (
										<Button.Basic
											label={"Connect Wallet"}
											className="gap-2 py-2 bg-transparent border-0"
											textStyle="text-gray-900"
											onClick={openConnectModal}
										/>
									);
								}

								if (chain.unsupported) {
									return (
										<Button.Basic
											label={"Wrong network"}
											className="gap-2 py-2 bg-transparent border-0"
											textStyle="text-gray-900"
											onClick={openChainModal}
										/>
									);
								}

								return (
									<div style={{ display: "flex", gap: 12 }}>
										{/* <button
											onClick={openChainModal}
											style={{ display: "flex", alignItems: "center" }}
											type="button"
										>
											{chain.hasIcon && (
												<div
													style={{
														background: chain.iconBackground,
														width: 12,
														height: 12,
														borderRadius: 999,
														overflow: "hidden",
														marginRight: 4,
													}}
												>
													{chain.iconUrl && (
														<img
															alt={chain.name ?? "Chain icon"}
															src={chain.iconUrl}
															style={{ width: 12, height: 12 }}
														/>
													)}
												</div>
											)}
											{chain.name}
										</button> */}

										<button 
											className="flex items-center gap-2 font-base font-bold"
											onClick={openAccountModal} 
											type="button"
										>
											<img src={EthereumIMG} alt="BTC" width={26} />
											{account.displayName}
											{/* {account.displayBalance
												? ` (${account.displayBalance})`
												: ""} */}
											<Avatar icon={<DropdownIcon />}/>
										</button>
									</div>
								);
							})()}
						</div>
					);
				}}
			</ConnectButton.Custom>

      {/* <div className="flex justify-center items-center gap-2">
        <div className='flex items-center gap-2' onClick={openModal}>
          { connected && ethWalletConnected && ethIcon() }
          { connected && (
            <Avatar icon={<DropdownIcon /> } />
          )}
        </div>
        {
          !connected && (
            <Button.Basic 
              label='Connect Wallet'
              className="px-5 py-2"
              onClick={openModal}
            />
          )
        }
      </div> */}
    </div>
  )
}
