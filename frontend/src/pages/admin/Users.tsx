import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { DeleteButton, Main, Note, Section, Slide } from "../../styles/main";
import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { GetAllUsers } from "../../features/UserFeatures";
import { Content } from "../../styles/admin";
import { MdDelete } from "react-icons/md";

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
      <Main>
        <SideNav />
        <Content>
          <Section>
            <h1 className="text-center">all usres</h1>
            {
              loading ? <LoadingBox /> :
              error ? <ErrorBox /> :
              users.map((user: {
                isAdmin: boolean; firstName: string; lastName: string; 
              }) => (
                <Slide>
                  <div>
                    <h4>{user.firstName} {user.lastName}</h4>
                  </div>
                  {
                    user.isAdmin === true && (
                      <Note>Admin</Note>
                    )
                  }
                  <DeleteButton title="delete user"><MdDelete /></DeleteButton>
                </Slide>
              ))
            }
          </Section>
        </Content>
      </Main>
    </Fragment>
  )
}

export default AllUsers;
