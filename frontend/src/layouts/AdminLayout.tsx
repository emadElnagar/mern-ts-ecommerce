import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import { Main } from "../styles/main";

const AdminLayout = () => {
  return (
    <>
      <Main>
        <SideNav />
        <Outlet />
      </Main>
    </>
  );
};

export default AdminLayout;
