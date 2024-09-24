import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/layout";
import Screen from "./components/screen"
import { ROUTES } from "@/constants/routes";
// import { DelegatePage } from "@/screens/delegate";
import { StakePage } from "@/screens/stake";
import { MainPoolPage } from "@/screens/main";
import { AccountPage } from "@/screens/account";
import { GovernancePage } from "@/screens/governance";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <Layout>
        <Screen />
      </Layout>
    }>
      <Route path="/" element={<Navigate replace to={ROUTES.MAIN} />} />
      <Route index path={ROUTES.MAIN} element={<MainPoolPage />} />
      <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
      <Route path={ROUTES.STAKE} element={<StakePage />} />
      <Route path={ROUTES.GOVERNANCE} element={<GovernancePage />} />
      <Route path={ROUTES.GOVERNANCE} element={<GovernancePage />} />
      <Route path="/*" element={
        <div className="flex justify-center w-full mt-[5rem]">
          <span className="text-gray-900 text-[1.5rem] text-center">Coming soon</span>
        </div>
      } />
    </Route>
  )
)

export default router
