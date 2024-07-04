import React from "react";

const useFetch = () => {
  const fetchData = async (endpoint, method, body) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("database error");
    }

    return await res.json();
  };
  return fetchData;
};

export default useFetch;
