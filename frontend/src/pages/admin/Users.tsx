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
import {
  DeleteUser,
  GetAllUsers,
  UpdateRole,
} from "../../features/UserFeatures";
import { Content } from "../../styles/admin";
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";
import Swal from "sweetalert2";

type UpdateUser = {
  role: string;
};

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state: any) => state.user);
  // Get all users
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  // Delete user
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
  // Update user
  let userRoleInput: HTMLInputElement;
  const handleUpdate = (id: Key, userRole: string) => {
    Swal.fire<UpdateUser>({
      title: "Update user",
      html: `
        <div class="select">
          <select name="role" id="role">
            <option value="user" ${
              userRole === "user" && "selected"
            }>user</option>
            <option value="moderator" ${
              userRole === "moderator" && "selected"
            }>moderator</option>
            <option value="admin" ${
              userRole === "admin" && "selected"
            }>admin</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      focusConfirm: false,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        userRoleInput = popup.querySelector("#role") as HTMLInputElement;
        userRoleInput.onkeyup = (event) =>
          event.key === "Enter" && Swal.clickConfirm();
      },
      preConfirm: () => {
        const role = userRoleInput.value;
        if (!role) {
          Swal.showValidationMessage(`Please Choose user role`);
        }
        return { role };
      },
    }).then((result) => {
      const role = result.value?.role;
      if (result.isConfirmed) {
        dispatch(
          UpdateRole({
            id,
            role,
          })
        );
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
                  <Slide key={user._id}>
                    <div>
                      <h4>
                        {user.firstName} {user.lastName}
                      </h4>
                    </div>
                    {user.role === "admin" && <Note>Admin</Note>}
                    <div>
                      <UpdateButton
                        title="Update user"
                        onClick={() => handleUpdate(user._id, user.role)}
                      >
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
