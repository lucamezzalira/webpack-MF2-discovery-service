import React, { useState, useEffect, useCallback, Suspense } from "react";
import { getInstance } from "@module-federation/runtime-tools";

// Get the instance once at module level
const mfInstance = getInstance();

const System = ({ request, emitter }) => {
  if (!request) return null;

  const MFE = React.lazy(() => {
    return mfInstance
      .loadRemote(request)
      .then((component) => ({ default: component.default || component }))
      .catch((error) => {
        console.error(`Failed to load MFE: ${request}`, error);
        throw error;
      });
  });

  return (
    <Suspense
      fallback={
        <div style={{ padding: "20px", background: "#eee" }}>
          Loading MFE...
        </div>
      }
    >
      <MFE emitter={emitter} />
    </Suspense>
  );
};

function MyAccount({ emitter }) {
  const [mfeRequests, setMfeRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadMfes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/frontend-discovery.json");
      const data = await response.json();

      const userMfes = [
        data.microFrontends.UserDetailsMFE[0],
        data.microFrontends.UserPaymentMethodsMFE[0],
      ];

      await mfInstance.registerRemotes(
        userMfes.map((mfe) => ({
          name: mfe.extras.name,
          entry: mfe.url,
        }))
      );

      const requests = userMfes.map(
        (mfe) => `${mfe.extras.alias}/${mfe.extras.exposed}`
      );
      setMfeRequests(requests);
      setIsLoading(false);
    } catch (err) {
      console.error("Error in loadMfes:", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMfes();
  }, [loadMfes]);

  if (error) {
    return <div>Error loading account components: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>My Account</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {mfeRequests.map((request) => (
          <System key={request} request={request} emitter={emitter} />
        ))}
      </div>
    </div>
  );
}

export default MyAccount;
