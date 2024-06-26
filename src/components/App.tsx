import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loader, SharedLayout } from "../components";

import { useUser } from "../hooks";
import { PrivateRoute } from "../routes";

const Home = lazy(() => import("../pages/Home/Home"));
const Psychologists = lazy(
  () => import("../pages/Psychologists/Psychologists")
);
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));

export const App = () => {
  const { currentUser, isLoading } = useUser();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute
                isAuthenticated={!!currentUser}
                element={<Favorites />}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer
        autoClose={2500}
        transition={Zoom}
        theme="colored"
        style={{ zIndex: 999 }}
      />
    </>
  );
};
