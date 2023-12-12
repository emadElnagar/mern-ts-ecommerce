import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Button, Container, DeleteButton, LightedSpan, Section, Slide, UpdateButton } from "../../styles/main";
import { useSelector } from "react-redux";
import { HiPencil } from "react-icons/hi";

const ProfileSettings = () => {
  const { user } = useSelector((state: any) => state.user);
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
            <UpdateButton title="Update name"><HiPencil /></UpdateButton>
          </Slide>
          <Slide>
            <span><b>{ user.email }</b></span>
            <UpdateButton title="Change email"><HiPencil /></UpdateButton>
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
