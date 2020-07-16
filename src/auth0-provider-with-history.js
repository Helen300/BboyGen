import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "damp-voice-7544.us.auth0.com";
  const clientId = "S6CaK4fa5q9AHax9jRCWgRSrxcQK03f2"
  const audience = ""
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };
  console.log(domain);
  console.log(clientId);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;