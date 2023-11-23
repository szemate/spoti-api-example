export function redirectToSpotify(codeVerifier, codeChallenge, scope) {
  const clientId = "719d232ba04d433d98b3605bf4b316e1";
  const redirectUri = "http://localhost:3000/app";
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  window.localStorage.setItem("code_verifier", codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();

  window.location.href = authUrl.toString();
}
