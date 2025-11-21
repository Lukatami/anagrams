import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader.jsx";

function AppLayout() {
  return (
    <div className="app-layout">
      <AppHeader />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
