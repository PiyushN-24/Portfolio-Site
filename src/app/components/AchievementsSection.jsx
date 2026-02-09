"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ---------- Counter ---------- */
function Counter({ value }) {
  const count = useMotionValue(0);

  const spring = useSpring(count, {
    stiffness: 60,
    damping: 20,
  });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // trigger animation AFTER mount
    count.set(value);
  }, [value, count]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return unsubscribe;
  }, [spring]);

  return <span>{display}</span>;
}

/* ---------- Data ---------- */
const achievementsList = [
  { metric: "Projects", value: 10, postfix: "+" },
  { prefix: "~", metric: "Blogs", value: 100 },
  { metric: "Certifications", value: 3 },
  { metric: "Years", value: 1 },
];

/* ---------- Section ---------- */
const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:px-16 sm:py-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">

        {achievementsList.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-white text-4xl font-bold flex flex-row">
              {achievement.prefix || ""}
              <Counter value={achievement.value} />
              {achievement.postfix || ""}
            </h2>

            <p className="text-[#ADB7BE] text-base">
              {achievement.metric}
            </p>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default AchievementsSection;
