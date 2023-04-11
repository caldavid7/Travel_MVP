import { useState, useEffect, ReactNode, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const Star = ({ top, left }: { top: number; left: number }) => (
  <motion.div
    className="absolute rounded-full h-[1px] w-[1px] bg-white"
    style={{ top, left }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  />
);

const StarField = ({ children }: { children: ReactNode }) => (
  <div className="w-full h-full fixed top-0 left-0 overflow-hidden">
    {children}
  </div>
);

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  return { x, y };
};

type Star = {
  id: number;
  x: number;
  y: number;
};
const StarGenerator = () => {
  const [stars, setStars] = useState<Star[] | []>([]);

  useLayoutEffect(() => {
    for (let i = 0; i <= 500; i++) {
      const star = {
        id: Date.now(),
        ...getRandomPosition(),
      };
      setStars((stars) => [...stars, star]);
    }
  }, []);

  return (
    <StarField>
      {stars.map((star) => (
        <Star key={star.id} top={star.y} left={star.x} />
      ))}
    </StarField>
  );
};

export default StarGenerator;
