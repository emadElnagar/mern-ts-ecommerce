import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetProfile } from "../../features/UserFeatures";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProfile(id));
  }, [dispatch, id])
  return (
    <div>Profile Page</div>
  )
}

export default ProfilePage;
