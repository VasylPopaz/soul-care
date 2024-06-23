import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header, ScrollUpButton } from "../../components";

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <ScrollUpButton />
      </main>
    </>
  );
};
