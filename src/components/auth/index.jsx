import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuth from '../../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, userLoaded } = useAuth();
  const location = useLocation();
  if (!user && userLoaded) {
    return <Navigate to="/sign-in" replace state={{ redirect: location }} />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};

export const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

AuthRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
};
