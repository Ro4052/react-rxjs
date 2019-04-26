import { useState } from "react";

export default (container, userOnEnd) => {
  const [helperTop, setHelperTop] = useState(null);

  const onStart = ({ node }) => setHelperTop(node.getBoundingClientRect().top);
  const onEnd = args => {
    setHelperTop(null);
    userOnEnd(args);
  };
  const onMove = () => {
    if (helperTop !== null) {
      const {
        top: containerTop,
        bottom: containerBottom
      } = container.current.container.getBoundingClientRect();
      const {
        top: currentTop,
        bottom: currentBottom,
        height: helperHeight
      } = container.current.helper.getBoundingClientRect();

      if (currentTop < containerTop - helperHeight / 2) {
        const translation = containerTop - helperTop - helperHeight / 2;
        container.current.helper.style.transform = `translateY(${translation}px)`;
      } else if (currentBottom > containerBottom + helperHeight / 2) {
        const translation = containerBottom - helperTop - helperHeight / 2;
        container.current.helper.style.transform = `translateY(${translation}px)`;
      }
    }
  };

  return [onStart, onMove, onEnd];
};
