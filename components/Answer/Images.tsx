import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_RESPONSE } from "@/utils/getOpenaiResponse";
import { getImagesFromGoogleMaps, Images } from "@/utils/getImages";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const variants = {
  enter: (direction: number) => {
    return {
      zIndex: -100,
      x: direction > 0 ? "100%" : "-100%",
    };
  },
  center: {
    x: 0,
  },
  exit: (direction: number) => {
    return {
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

type Props = {
  response: AI_RESPONSE["response"];
  isLoaded: boolean;
};

const ImageSlider = ({ response, isLoaded }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [placeName, setPlaceName] = useState("");
  const [images, setImages] = useState<Images[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function wrapper() {
      if (isLoaded) {
        const images = await getImagesFromGoogleMaps(response);
        setImages(images);
        setLoading(false);
      }
    }
    wrapper();
  }, [isLoaded, response]);

  const imageIndex = useMemo(() => {
    //TODO Here we are mapping the page value to the range [0,image.length-1]
    return wrap(0, images.length, page);
  }, [images, page]);

  useEffect(() => {
    const image = images.filter((image, index) => index === imageIndex);
    setPlaceName(image[0]?.placeName);
  }, [imageIndex, images]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative row-start-1 lg:row-start-auto overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {loading && (
          <div className="flex items-center justify-center min-h-screen p-5 bg-transparent min-w-screen">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        )}
        {!loading && (
          <motion.img
            src={images[imageIndex]?.photo}
            alt={images[imageIndex]?.placeName}
            key={page}
            custom={direction}
            className="h-full w-full object-cover"
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
          ></motion.img>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-darken_bottom z-50 pointer-events-none"></div>
      <div className="absolute z-[60] grid place-items-center gap-4 left-0 bottom-10 w-full ">
        <div className="text-2xl text-center font-mono text-white underline">
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
export default ImageSlider;
