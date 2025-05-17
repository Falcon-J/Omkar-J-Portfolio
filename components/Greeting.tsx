import { useState, useEffect } from "react";

const greetings = ["Hola", "Bonjour", "Namaste", "Ciao", "Hallo"];

export default function Greeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-[var(--color-primary)]">{greetings[index]}</span>
  );
}
