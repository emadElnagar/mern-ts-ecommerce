import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { DeleteButton, Main, Section, Slide } from "../../styles/main";
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
            <Slide>
              <div>
                <h4>Emad Elnagar</h4>
              </div>
              <DeleteButton title="delete user"><MdDelete /></DeleteButton>
            </Slide>
          </Section>
        </Content>
      </Main>
    </Fragment>
  )
}

export default AllUsers;
