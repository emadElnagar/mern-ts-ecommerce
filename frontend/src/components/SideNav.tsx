import { Link } from "react-router-dom";
import { NavButton } from "../styles/main";
import { Nav } from "../styles/admin";
import { IoAdd } from "react-icons/io5";

const SideNav = () => {
  return (
    <Nav>
      <Link to="/">
        <NavButton className="home-button">Go website</NavButton>
      </Link>
      <Link to="/admin">
        <NavButton>dashboard</NavButton>
      </Link>
      <Link to="/admin/users/all">
        <NavButton>users</NavButton>
      </Link>
      <Link to="/admin/categories">
        <NavButton>categories</NavButton>
      </Link>
      <Link to="/admin/products/new">
        <NavButton>
          <IoAdd /> new product
        </NavButton>
      </Link>
    </Nav>
  );
};

export default SideNav;
