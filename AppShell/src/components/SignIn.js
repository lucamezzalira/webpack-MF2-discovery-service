import React, { useState } from "react";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is where you'd typically make an API call
    if (username === "test" && password === "test") {
      setError("");
      setIsOpen(false);
      setIsAuthenticated(true);
      setAuthenticatedUser(username);
      // Clear form fields
      setUsername("");
      setPassword("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return (
      <span
        style={{
          color: "#4a5568",
          fontWeight: 500,
        }}
      >
        Welcome, {authenticatedUser}!
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          background: "none",
          border: "none",
          color: "#4a5568",
          fontWeight: 500,
          cursor: "pointer",
          padding: 0,
          font: "inherit",
        }}
      >
        Sign In
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "400px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>Sign In</h2>

            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    color: "#e53e3e",
                    backgroundColor: "#fff5f5",
                    padding: "0.75rem",
                    borderRadius: "4px",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#4a5568",
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    color: "#4a5568",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#4299e1",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 500,
                  ":hover": {
                    backgroundColor: "#3182ce",
                  },
                }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
