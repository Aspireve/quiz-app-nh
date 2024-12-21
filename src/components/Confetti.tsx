import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Confetti() {
  const defaults = {
    spread: 800,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 20,
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
      zIndex: 1
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
      zIndex: 1
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      shoot();
    }, 300); // Adjust interval as needed (300ms for smoother animation)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return null;
}
