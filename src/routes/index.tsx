import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Screen from "./components/screen"
import { ROUTES } from "@/constants/routes";
// import { DelegatePage } from "@/screens/delegate";
import { StakePage } from "@/screens/stake";
import { MainPoolPage } from "@/screens/main";
import { AccountPage } from "@/screens/account";
import { GovernancePage } from "@/screens/governance";
import { GovernanceDetailPage } from "@/screens/governance/details";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Screen />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <MainPoolPage />,
      },
      {
        path: ROUTES.MAIN,
        element: <MainPoolPage />,
      },
      {
        path: ROUTES.ACCOUNT,
        element: <AccountPage />,
      },
      {
        path: ROUTES.STAKE,
        element: <StakePage />,
      },
      {
        path: ROUTES.GOVERNANCE,
        element: <GovernancePage />,
      },
      {
        path: ROUTES.GOVERNANCE_DETAIL,
        element: <GovernanceDetailPage />,
      },
      {
        path: '/*',
        element: 
          <div className="flex justify-center w-full mt-[5rem]">
            <span className="text-gray-900 text-[1.5rem] text-center">Coming soon</span>
          </div>
      }
    ]
  }
])
export default router
