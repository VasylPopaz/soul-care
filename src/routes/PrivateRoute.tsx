import { Navigate } from "react-router-dom";
import { FunctionComponent } from "react";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  element: JSX.Element;
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  isAuthenticated,
  element,
}) => {
  return isAuthenticated ? element : <Navigate to="/" replace />;
};
