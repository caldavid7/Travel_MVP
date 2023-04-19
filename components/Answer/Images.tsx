import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const images = [
  {
    original:
      "https://images.unsplash.com/photo-1574691250077-03a929faece5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
    placeName: "Memoire Hotels & Resorts, Siem, Reap, Cambodia",
  },
  {
    original:
      "https://images.unsplash.com/photo-1679072885473-15c0e483f663?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80E",
    placeName: "Capella Hotels & Resorts, Gianyar, Indonesia",
  },
  {
    original:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
    placeName: "Istanbul, Turkey",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const Example = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [placeName, setPlaceName] = useState("");
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = useMemo(() => {
    return wrap(0, images.length, page);
  }, [page]);

  useEffect(() => {
    const image = images.filter((image, index) => index === imageIndex);
    setPlaceName(image[0].placeName);
  }, [imageIndex]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative group h-full w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          className="h-full w-full"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.1 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <Image
            loading="lazy"
            src={images[imageIndex].original}
            fill
            alt={images[imageIndex].placeName}
            style={{ objectFit: "cover", pointerEvents: "none" }}
          ></Image>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-darken_bottom z-[55] pointer-events-none"></div>
      <div className="absolute z-[60] grid place-items-center gap-4 left-0 bottom-10 w-full ">
        <div className="text-2xl font-mono text-white underline">
          {placeName}
        </div>
        <motion.div className=" flex items-center justify-center gap-2">
          {images.map((value, index) => {
            return (
              <motion.div
                key={index}
                onClick={() => {
                  paginate(index - imageIndex);
                }}
                className={`h-[10px] w-[10px] rounded-full ${
                  imageIndex === index ? "bg-white" : "bg-white/20"
                } `}
              ></motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
export default Example;
