const originalFetch = window.fetch;

window.fetch = async (input, init = {}) => {
  const jwtToken = "your-jwt-token-here";
  const headers = new Headers(init.headers || {});
  headers.append("Authorization", `Bearer ${jwtToken}`);

  const modifiedInit = {
    ...init,
    headers,
  };

  return originalFetch(input, modifiedInit);
};
