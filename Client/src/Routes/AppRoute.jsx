import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoaderComponent, PageNotFound } from "../CommonComponents";
import LayoutView from "../CommonComponents/LayoutView";
import ProtectedRoute from "./ProtectedRoute";
import ROUTES from "./routes";
import { isAuthenticated } from "../CommonComponents/utils";

// Lazy load components
const Login = lazy(() => import("../Components/Login/Login"));
const Register = lazy(() => import("../Components/Login/Register"));
const Dashboard = lazy(() => import("../Components/Main/Dashboard"));
const Products = lazy(() => import("../Components/Main/Products"));
const Users = lazy(() => import("../Components/Main/Users"));
const ContactUs = lazy(() => import("../Components/Main/ContactUs"));

const AppRoute = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    if (!sessionStorage.getItem("isAppInitialized")) {
      localStorage.clear();
      sessionStorage.setItem("isAppInitialized", "true");
    }

    const handleStorageChange = () => {
      const authState = isAuthenticated();
      if (authState !== isAuth) {
        setIsAuth(authState);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAuth]);

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to={ROUTES.DASHBOARD} replace />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <LayoutView>
                <Dashboard />
              </LayoutView>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.USERS}
          element={
            <ProtectedRoute>
              <LayoutView>
                <Users />
              </LayoutView>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PRODUCTS}
          element={
            <ProtectedRoute>
              <LayoutView>
                <Products />
              </LayoutView>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CONTACT}
          element={
            <ProtectedRoute>
              <LayoutView>
                <ContactUs />
              </LayoutView>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />{" "}
        {/* Catch-all route for 404 pages */}
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
