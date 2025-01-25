import { Login } from '@pages';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSliceSelectors } from '../../services/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userSliceSelectors.selectUser);
  const isAuthChecked = useSelector(userSliceSelectors.selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: location
        }}
      />
    );
  }

  return children;
};
