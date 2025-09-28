import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn("Error reading localStorage", e);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(stored));
    } catch (e) {
      console.warn("Error writing localStorage", e);
    }
  }, [key, stored]);

  return [stored, setStored];
}
