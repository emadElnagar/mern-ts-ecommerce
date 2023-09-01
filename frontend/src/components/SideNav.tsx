import { Link } from "react-router-dom";
import { NavButton } from "../styles/main";
import { Nav } from "../styles/admin";

const SideNav = () => {
  return (
    <Nav>
      <NavButton>
        <Link to="/admin">dashboard</Link>
      </NavButton>
      <NavButton>
        <Link to="#">users</Link>
      </NavButton>
      <NavButton>
        <Link to="#">products</Link>
      </NavButton>
    </Nav>
  )
}

export default SideNav;
