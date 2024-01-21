import { useNavigation, Outlet } from "react-router-dom";
import Header from "./features/ui/Header";
import CartOverview from "./features/ui/CartOverview";
import Loader from "./features/ui/Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="my-10 overflow-scroll overflow-x-hidden overflow-y-hidden">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </div>

      <CartOverview />
    </div>
  );
}
