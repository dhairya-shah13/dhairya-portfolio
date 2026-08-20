import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'motion/react';

function Magnetic({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const { clientX, clientY } = e;
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);
      // Magnetic pull multiplier: snap button 35% of the distance to the cursor
      setPosition({ x: x * 0.35, y: y * 0.35 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Keep springs in sync with hover updates
  useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
