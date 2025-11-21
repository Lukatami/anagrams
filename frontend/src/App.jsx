import { useEffect } from "react";
import { useGlobalStore } from "./stores/globalStore";
import AppRouter from "./router/AppRouter";

function App() {
  const { autoLogin } = useGlobalStore();

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return <AppRouter />;
}

export default App;
