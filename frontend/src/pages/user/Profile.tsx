import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProfile, changeUserImage } from "../../features/UserFeatures";
import { Helmet } from "react-helmet";
import { Container, Image, ImgContainer, UserForm } from "../../styles/main";
import { Input } from "../../styles/form";

const ProfilePage = () => {
  const [ userImg, setUserImg ] = useState<File>();
  const { id } = useParams();
  const { profile } = useSelector((state: any) => state.user);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  // Get profile data
  useEffect(() => {
    dispatch(GetProfile(id));
  }, [dispatch, id]);
  // Handel image upload
  const hangelImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setUserImg(file);
    }
  }
  // Change user image
  const handleSubmit = () => {
    const formData = new FormData();
    if (userImg) {
      formData.append('usrimg', userImg);
      dispatch(changeUserImage({
        _id: profile._id,
        form: formData
      }));
    }
  }
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
                user._id === profile._id &&
                <UserForm onSubmit={ handleSubmit } className="full-height">
                  <Input type='file' onChange={hangelImageUpload} />
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
