import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { Container } from "../../styles/main";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GetAllUsers } from "../../features/UserFeatures";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-Admin</title>
      </Helmet>
      <SideNav />
      <Container>
      {
        error ? <ErrorBox /> :
        loading ? <LoadingBox /> :
        users.map((user: { _id: string, firstName: string }) => (
          <div key={user._id}>{ user.firstName }</div>
        ))
      }
      </Container>
    </Fragment>
  )
}

export default AllUsers;
