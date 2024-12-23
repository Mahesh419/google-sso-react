import React, { useEffect } from "react";

import "./App.css";

function App() {
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN; // Replace with your Cognito domain
  const clientId = import.meta.env.VITE_CLIENT_ID; // Replace with your App Client ID
  const redirectUri = import.meta.env.VITE_REDIRECT_URI; // Replace with your app's callback URI

  const googleSignInUrl = `${cognitoDomain}/oauth2/authorize?identity_provider=Google&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=TOKEN&client_id=${clientId}&scope=email+openid+profile`;

  useEffect(() => {
    // Handle redirect from Cognito after login
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // Remove '#' and parse params
      const idToken = params.get("id_token");
      const accessToken = params.get("access_token");

      if (idToken && accessToken) {
        // Save tokens to local storage or manage session
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);

        console.log("User successfully logged in!");
        // Redirect to your app's dashboard or home page
        window.location.replace("/");
      }
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          window.location.href = googleSignInUrl;
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
