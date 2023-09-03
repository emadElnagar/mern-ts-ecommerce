import { useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { Container } from "../../styles/main";
import { Fragment } from "react";
import { Helmet } from "react-helmet";

const AllUsers = () => {
  const { users, error, loading } = useSelector((state: any) => state.user);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-login</title>
      </Helmet>
      <SideNav />
      <Container>
      {
        error ? <ErrorBox /> :
        loading ? <LoadingBox /> :
        users.map((user: { firstName: string }) => (
          <div>{ user.firstName }</div>
        ))
      }
      </Container>
    </Fragment>
  )
}

export default AllUsers;
