import React from "react";
import { useLocation } from "react-router-dom";

export const NotFoundView = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <h1>Not found</h1>
      <span>
        Invalid path <span>{pathname}</span>
      </span>
    </main>
  );
};
