import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = (props) => {
  // Destruc
  const { component: Component, ...rest } = props;

  // * Hooks
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector((state) => state.user.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated || token.length === 0 ? (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
