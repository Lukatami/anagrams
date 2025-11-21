function LogInButton({}) {
  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const googleAuthUrl = `${BASE_API_URL}/api/auth/google`;

  return (
    <a href={googleAuthUrl} className="nav-button login-button">
      <span className="button-icon">🔐</span>
      <span className="button-text">{"Log In"}</span>
    </a>
  );
}

export default LogInButton;
