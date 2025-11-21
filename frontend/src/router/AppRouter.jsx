import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const AppLayout = lazy(() => import("../components/app/AppLayout.jsx"));
const MainMenu = lazy(() => import("../components/menu/MainMenu.jsx"));
const Leaderboard = lazy(() =>
  import("../components/leaderboard/Leaderboard.jsx")
);
const UserProfile = lazy(() => import("../components/user/UserProfile.jsx"));
const SettingsMenu = lazy(() =>
  import("../components/settings/SettingsMenu.jsx")
);
const GameBoard = lazy(() => import("../components/game/GameBoard.jsx"));
const ProtectedGameRoute = lazy(() => import("./ProtectedGameRoute.jsx"));
const LogInSuccess = lazy(() => import("../components/user/LogInSuccess.jsx"));

const LoadingFallback = () => <div>Loading...</div>;

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login-success" element={<LogInSuccess />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainMenu />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<SettingsMenu />} />
            <Route
              path="/game"
              element={
                <ProtectedGameRoute>
                  <GameBoard />
                </ProtectedGameRoute>
              }
            />
          </Route>
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
