import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProfile, changeUserImage } from "../../features/UserFeatures";
import { Helmet } from "react-helmet";
import {
  Button,
  Container,
  Image,
  ImgContainer,
  UserForm,
} from "../../styles/main";
import { FileInput, Label } from "../../styles/form";
import { FaCamera } from "react-icons/fa";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import ErrorBox from "../../components/ErrorBox";
import LoadingBox from "../../components/LoadingBox";
import { API_URL } from "../../API";

const ProfilePage = () => {
  const [userImg, setUserImg] = useState<File | undefined>();
  const { id } = useParams();
  const { user, profile, isLoading, error } = useSelector(
    (state: any) => state.user
  );
  const dispatch = useDispatch();
  // Get profile data
  useEffect(() => {
    dispatch(GetProfile(id));
  }, [dispatch, id]);
  // Handel image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setUserImg(target.files[0]);
  };
  // Change user image
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (typeof userImg === "undefined") return;
    const formData = new FormData();
    formData.append("usrimg", userImg);
    dispatch(
      changeUserImage({
        _id: user._id,
        formData,
      })
    );
    setUserImg(undefined);
    dispatch(GetProfile(id));
  };
  // Close form
  const close = () => {
    setUserImg(undefined);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Electronics-profile</title>
      </Helmet>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <ErrorBox message={error} />
      ) : (
        <Container>
          <ImgContainer>
            <Image
              src={
                userImg
                  ? URL.createObjectURL(userImg)
                  : profile?.image
                  ? `${API_URL}/${profile.image}`
                  : "/user-icon-2098873_640.png"
              }
            />
            {user && user._id === profile?._id && (
              <UserForm onSubmit={handleSubmit}>
                {userImg ? (
                  <div>
                    <Button className="mi-5" type="submit">
                      <IoMdCheckmark />
                    </Button>
                    <Button onClick={close}>
                      <IoMdClose />
                    </Button>
                  </div>
                ) : (
                  <>
                    <FileInput
                      type="file"
                      id="img"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Label htmlFor="img">
                      <FaCamera className="icon" />
                    </Label>
                  </>
                )}
              </UserForm>
            )}
          </ImgContainer>
          <h3 className="text-center">
            {profile?.firstName} {profile?.lastName}
          </h3>
        </Container>
      )}
    </Fragment>
  );
};

export default ProfilePage;
