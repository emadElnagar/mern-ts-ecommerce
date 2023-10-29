import { Link } from "react-router-dom";
import { NavButton } from "../styles/main";
import { Nav } from "../styles/admin";

const SideNav = () => {
  return (
    <Nav>
      <Link to="/admin">
        <NavButton>dashboard</NavButton>
      </Link>
      <Link to="/admin/users/all">
        <NavButton>users</NavButton>
      </Link>
      <Link to="/admin/categories">
        <NavButton>users</NavButton>
      </Link>
      <Link to="#">
        <NavButton>products</NavButton>
      </Link>
    </Nav>
  )
}

export default SideNav;
