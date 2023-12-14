import { Fragment, Key } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, DeleteButton, LightedSpan, Section, Slide, UpdateButton } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";
import swal from 'sweetalert2';
import { MdOutlineTimeToLeave } from "react-icons/md";
import { changeEmail, updateUserName } from "../../features/UserFeatures";

type UpdateNameType = {
  firstName: string;
  lastName: string
}

type ChangeEmailType = {
  email: string;
}

const ProfileSettings = () => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  // Update user name
  const handleUpdateName = (_id: Key) => {
    swal.fire<UpdateNameType>({
      title: 'Update YourName',
      html: `
        <input type="text" id="firstname" class="swal2-input" value="${user.firstName}">
        <input type="text" id="lastname" class="swal2-input" value="${user.lastName}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      focusConfirm: false,
      didOpen: () => {
        const popup = swal.getPopup()!
        firstNameInput = popup.querySelector('#firstname') as HTMLInputElement;
        lastNameInput = popup.querySelector('#lastname') as HTMLInputElement;
        firstNameInput.onkeyup = (event) => event.key === 'Enter' && swal.clickConfirm();
        lastNameInput.onkeyup = (event) => event.key === 'Enter' && swal.clickConfirm();
      },
      preConfirm: () => {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        if (!MdOutlineTimeToLeave) {
          swal.showValidationMessage(`Please enter first and last name`)
        }
        return { firstName, lastName }
      },
    }).then((result) => {
      const  firstName  = result.value?.firstName;
      const  lastName  = result.value?.lastName;
      if (result.isConfirmed) {
        dispatch(updateUserName({
          _id,
          firstName,
          lastName
        }));
      }
    });
  }
  // Change email
  const handleChangeEmail = (_id: Key) => {
    swal.fire<ChangeEmailType>({
      title: 'Update YourName',
      html: `
        <input type="email" id="email" class="swal2-input" value="${user.email}">
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      focusConfirm: false,
      didOpen: () => {
        const popup = swal.getPopup()!
        emailInput = popup.querySelector('#email') as HTMLInputElement;
        emailInput.onkeyup = (event) => event.key === 'Enter' && swal.clickConfirm();
      },
      preConfirm: () => {
        const email = emailInput.value;
        if (!MdOutlineTimeToLeave) {
          swal.showValidationMessage(`Please enter title and password`)
        }
        return { email }
      },
    }).then((result) => {
      const  email  = result.value?.email;
      if (result.isConfirmed) {
        dispatch(changeEmail({
          _id,
          email
        }));
      }
    });
  }
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-settings</title>
      </Helmet>
      <Container>
        <Section>
          <h2 className="text-center">No one can see this page (only you)</h2>
          <Slide>
            <LightedSpan>{ user.firstName } { user.lastName }</LightedSpan>
            <UpdateButton onClick={() => handleUpdateName(user._id)} title="Update name"><HiPencil /></UpdateButton>
          </Slide>
          <Slide>
            <span><b>{ user.email }</b></span>
            <UpdateButton onClick={() => handleChangeEmail(user._id)} title="Change email"><HiPencil /></UpdateButton>
          </Slide>
          <Slide>
            <Button>Change my password</Button>
            <DeleteButton>delete my account</DeleteButton>
          </Slide>
        </Section>
      </Container>
    </Fragment>
  )
}

export default ProfileSettings;
