import { useDispatch, useSelector } from "react-redux";
import SideNav from "../../components/SideNav";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import {
  DeleteButton,
  Main,
  Note,
  Section,
  Slide,
  UpdateButton,
} from "../../styles/main";
import { Fragment, Key, useEffect } from "react";
import { Helmet } from "react-helmet";
import { DeleteUser, GetAllUsers } from "../../features/UserFeatures";
import { Content } from "../../styles/admin";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Swal from "sweetalert2";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  const handleDelete = (id: Key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(id));
        dispatch(GetAllUsers());
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };
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
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <ErrorBox message={`Error loading users`} />
            ) : (
              users.map(
                (user: {
                  role: string;
                  firstName: string;
                  lastName: string;
                  _id: Key;
                }) => (
                  <Slide>
                    <div>
                      <h4>
                        {user.firstName} {user.lastName}
                      </h4>
                    </div>
                    {user.role === "admin" && <Note>Admin</Note>}
                    <div>
                      <UpdateButton title="Update user">
                        <IoPencil />
                      </UpdateButton>
                      <DeleteButton
                        title="delete user"
                        onClick={() => handleDelete(user._id)}
                      >
                        <MdDelete />
                      </DeleteButton>
                    </div>
                  </Slide>
                )
              )
            )}
          </Section>
        </Content>
      </Main>
    </Fragment>
  );
};

export default AllUsers;
