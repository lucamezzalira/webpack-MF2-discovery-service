import React, { useState } from "react";
import ReactDOM from "react-dom";

function App({ onNavigate, emitter }) {
  
  const [count, setCount] = useState(0);
  console.log('useState working, count:', count);

  const handleViewDetails = (id) => {
    // Use navigation prop from AppShell
    onNavigate(`/catalogue/${id}`);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f9ff",
          padding: "0.5rem",
          borderRadius: "4px",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        React v{React.version}
      </div>
      {/* <button
        onClick={() => setCount((prevCount) => prevCount + 1)}
        style={{ marginLeft: "0.5rem" }}
      >
        Increment react 17
      </button>
      <button
        onClick={() => setCount((prevCount) => prevCount - 1)}
        style={{ marginLeft: "0.5rem" }}
      >
        Decrement react 17
      </button>
      <span style={{ marginLeft: "1rem" }}>Count react17: {count}</span> */}
      <div
        className="hero"
        style={{
          position: "relative",
          height: "500px",
          marginBottom: "4rem",
        }}
      >
        <img
          src="https://picsum.photos/seed/tshirts/1600/500"
          alt="T-shirt collection"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Express Yourself
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            "Life is too short to wear boring t-shirts"
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        <div className="bestsellers" style={{ marginBottom: "4rem" }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Best Sellers
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              {
                id: 1,
                title: "Cosmic Cat",
                image: "https://picsum.photos/seed/cosmic-cat/300/300",
              },
              {
                id: 2,
                title: "Pizza Ninja",
                image: "https://picsum.photos/seed/pizza-ninja/300/300",
              },
              {
                id: 3,
                title: "Pixel Art Gaming",
                image: "https://picsum.photos/seed/pixel-gaming/300/300",
              },
            ].map((product) => (
              <div
                key={product.id}
                style={{ minWidth: "250px", textAlign: "center" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/300/300";
                    e.target.alt = `${product.title} (fallback)`;
                  }}
                />
                <h3 style={{ marginTop: "1rem" }}>{product.title}</h3>
                <button
                  onClick={() => handleViewDetails(product.id)}
                  style={{
                    backgroundColor: "#4299e1",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="new-arrivals">
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            New Arrivals
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              {
                id: 4,
                title: "Robot DJ",
                image: "https://picsum.photos/seed/robot-dj/300/300",
              },
              {
                id: 5,
                title: "Zombie Unicorn",
                image: "https://picsum.photos/seed/zombie-unicorn/300/300",
              },
              {
                id: 6,
                title: "Taco Dragon",
                image: "https://picsum.photos/seed/taco-dragon/300/300",
              },
            ].map((product) => (
              <div
                key={product.id}
                style={{ minWidth: "250px", textAlign: "center" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/300/300";
                    e.target.alt = `${product.title} (fallback)`;
                  }}
                />
                <h3 style={{ marginTop: "1rem" }}>{product.title}</h3>
                <button
                  onClick={() => handleViewDetails(product.id)}
                  style={{
                    backgroundColor: "#4299e1",
                    color: "white",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
