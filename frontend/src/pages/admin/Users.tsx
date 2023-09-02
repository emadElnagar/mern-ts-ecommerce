import { useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import { Container } from "../../styles/main";
import { Fragment } from "react";

const AllUsers = () => {
  const { users, error, loading } = useSelector((state: any) => state.users);
  return (
    <Fragment>
      <SideNav />
      <Container>
      </Container>
    </Fragment>
  )
}

export default AllUsers;
