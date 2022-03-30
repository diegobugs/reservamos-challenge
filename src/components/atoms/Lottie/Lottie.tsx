import LottieView from "lottie-react-native";
import React, { useCallback, useRef, useState } from "react";

type SegmentType = {
  end: number;
  start: number;
};

export type LottieProps = Partial<LottieView["props"]> & {
  /** Nombre del lottie a ser renderizado */
  lottie?: LottieListType;
  /** Segmento en el cual se creará el loop formado por el frame de inicio y el frame final */
  segment?: SegmentType;
};

export type LottieListType = "empty" | "bus";

export const LottieList = Object.freeze({
  bus: require("@assets/animations/bus.json"),
  empty: require("@assets/animations/empty.json"),
});

const Lottie = (
  { lottie, loop, segment, source, ...props }: LottieProps,
  forwardRef: any
) => {
  let lottieRef = useRef<LottieView | null>(null);
  React.useImperativeHandle(forwardRef, () => lottieRef.current, []);
  let [_loop, setLoop] = useState(loop ? true : false);
  const _source = lottie ? LottieList[lottie] : source;

  const handleAnimationEnd = useCallback(() => {
    if (!segment || Object.keys(segment).length <= 0) {
      return;
    }
    setLoop(true);
    if (lottieRef && lottieRef.current) {
      lottieRef.current.play(segment.start, segment.end);
    }
  }, [segment]);

  return (
    <LottieView
      key={lottie}
      ref={lottieRef}
      source={_source}
      autoPlay
      loop={_loop}
      onAnimationFinish={handleAnimationEnd}
      cacheStrategy="strong"
      {...props}
    />
  );
};

export default React.forwardRef(Lottie);
