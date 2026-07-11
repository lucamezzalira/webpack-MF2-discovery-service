import React, { useState, useEffect, useCallback, Suspense } from "react";
import { getInstance } from "@module-federation/enhanced/runtime";

const System = ({ request, emitter, mfInstance }) => {
  if (!request) return null;
  if (!mfInstance) {
    return <div style={{ padding: "20px", background: "#eee" }}>Loading MFE...</div>;
  }

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
  const [mfInstance, setMfInstance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadMfes = useCallback(async () => {
    try {
      const instance = getInstance();
      if (!instance) {
        throw new Error("Module Federation instance is not available");
      }
      setMfInstance(instance);

      const response = await fetch("http://localhost:8080/frontend-discovery.json");
      const data = await response.json();

      const userMfes = [
        data.microFrontends.UserDetailsMFE[0],
        data.microFrontends.UserPaymentMethodsMFE[0],
      ];

      await instance.registerRemotes(
        userMfes.map((mfe) => ({
          name: mfe.extras.name,
          alias: mfe.extras.alias,
          entry: mfe.url,
        })),
        { force: true }
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
          <System
            key={request}
            request={request}
            emitter={emitter}
            mfInstance={mfInstance}
          />
        ))}
      </div>
    </div>
  );
}

export default MyAccount;
