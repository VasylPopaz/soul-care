import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import { SharedLayout } from "../components";

const Home = lazy(() => import("../pages/Home/Home"));
const Psyhologists = lazy(() => import("../pages/Psyhologists/Psyhologists"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/psyhologists" element={<Psyhologists />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
