import { UserAuth } from "context/AuthContext";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function PrivateRouting({ component: Component, ...rest }) {
    const { user } = UserAuth();
  
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <div className="bg-blueGray-200 min-h-screen">
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/prijava" />
          )
        }
      />
    );
  }
  export default PrivateRouting;