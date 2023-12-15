import { Fragment, Key, SetStateAction, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, DeleteButton, HeaderCenter, LightedSpan, Section, Slide, UpdateButton } from "../../styles/main";
import { useDispatch, useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";
import swal from 'sweetalert2';
import { MdOutlineTimeToLeave } from "react-icons/md";
import { ChangePassword, DeleteProfile, changeEmail, updateUserName } from "../../features/UserFeatures";
import { Field, Form, Input } from "../../styles/form";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [password, setPassword] = useState('');
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
  // Swap updating password form
  const swapUpdatingForm = () => {
    if (isUpdatingPass === false) {
      setIsUpdatingPass(true);
    } else {
      setIsUpdatingPass(false);
    }
  }
  // Change user password
  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'password must be at least 8 characters',
      });
    } else if (currentPassword === newPassword) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please change new password to confirm',
      });
    } else if (newPassword !== confirmNewPassword) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `password and confirm password doesn't match`,
      });
    } else {
      dispatch(ChangePassword({
        _id: user._id,
        currentPassword,
        newPassword
      })).then((_result: any) => {
        swal.fire({
          icon: 'success',
          title: 'Successed',
          text: `password changed successfully`,
        });
        setIsUpdatingPass(false);
      })
    }
  }
  // Dlete user account
  const handleDeleteAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(DeleteProfile({
      _id: user._id,
      password
    })).then((_result: any) => {
      navigate('/');
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
            <Button onClick={() => swapUpdatingForm()}>Change my password</Button>
            <DeleteButton onClick={() => setDeletingAccount(true)}>Delete my account</DeleteButton>
          </Slide>
        </Section>
        {
          isUpdatingPass === true &&
          <Section>
            <Form method="POST" onSubmit={handleChangePassword}>
              <HeaderCenter>change my password</HeaderCenter>
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCurrentPassword(e.target.value)} type="password" placeholder="Current passowrd" required />
              </Field>
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewPassword(e.target.value)} type="password" placeholder="New passowrd" required />
              </Field>
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setConfirmNewPassword(e.target.value)} type="password" placeholder="Confirm new passowrd" required />
              </Field>
              <Button type="submit">Confirm</Button>
              <DeleteButton onClick={() => setIsUpdatingPass(false)}>Cancel</DeleteButton>
            </Form>
          </Section>
        }
        {
          deletingAccount === true &&
          <Section>
            <Form method="POST" onSubmit={handleDeleteAccount}>
              <HeaderCenter>delete your account</HeaderCenter>
              <Field>
                <Input onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
              </Field>
              <Button type="submit">Confirm</Button>
              <DeleteButton onClick={() => setDeletingAccount(false)}>Cancel</DeleteButton>
            </Form>
          </Section>
        }
      </Container>
    </Fragment>
  )
}

export default ProfileSettings;
