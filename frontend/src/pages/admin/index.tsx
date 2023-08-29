import { useSelector } from 'react-redux';

const AdminMainPage = () => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <div>
      {
        user !== null && user.isAdmin === true ? (
          <div>You are admin</div>
        ) : (
          <div>You are not admin</div>
        )
      }
    </div>
  )
}

export default AdminMainPage;
