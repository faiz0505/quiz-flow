"use client"; // Error components must be Client Components

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    setErrorMsg(error);
  }, [error]);

  return (
    <div>
      <h2>{errorMsg}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
