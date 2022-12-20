import React from "react";

function Nopage() {
  return (
    <>
      <div
        style={{
          color: "black",
          marginTop: "250px",
          display: "flex",
          justifyContent: "center",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        Error 404
      </div>
      <div
        style={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        Page Not Found
      </div>
    </>
  );
}

export default Nopage;
