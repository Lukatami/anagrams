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
    <div className="login-success">
      <p>Processing login...</p>
    </div>
  );
}

export default LoginSuccess;
