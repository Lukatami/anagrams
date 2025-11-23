import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePlayerStore } from "../../stores/playerStore.js";
import { useGlobalStore } from "../../stores/globalStore.js";

function LoginSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { logIn } = usePlayerStore();
  const { autoLogin } = useGlobalStore();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      try {
        const success = await autoLogin();

        if (success) {
          navigate("/", { replace: true });
        } else {
          const token = searchParams.get("token");
          if (token) {
            const loginSuccess = await logIn(token);
            if (loginSuccess) {
              navigate("/", { replace: true });
              return;
            }
          }

          console.error("Login failed");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Login error:", error);
        navigate("/", { replace: true });
      }
    };

    handleLoginSuccess();
  }, [navigate, searchParams, logIn, autoLogin]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6 text-center">
      <p className="text-white text-lg font-medium animate-pulse">Processing login...</p></div>
    </div>
  );
}

export default LoginSuccess;
