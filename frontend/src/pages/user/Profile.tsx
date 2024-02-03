import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProfile } from "../../features/UserFeatures";
import { Helmet } from "react-helmet";
import { Container, Image, ImgContainer, UserForm } from "../../styles/main";
import { Input } from "../../styles/form";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile } = useSelector((state: any) => state.user);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProfile(id));
  }, [dispatch, id]);
  console.log(profile);
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-profile</title>
      </Helmet>
      {
        profile !== null &&
        <Container>
          <ImgContainer>
              <Image src={`${profile.image ? `${profile.image}` : `${process.env.PUBLIC_URL + '/user-icon-2098873_640.png'}`}`} />
              {
                user._id === profile ._id &&
                <UserForm className="full-height">
                  <Input type='file' />
                </UserForm>
              }
          </ImgContainer>
          <h3 className="text-center">{ profile.firstName } { profile.lastName }</h3>
        </Container>
      }
    </Fragment>
  )
}

export default ProfilePage;
