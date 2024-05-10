import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <h3>
        Vai alla homepage:
        <Link to="/">Home</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
