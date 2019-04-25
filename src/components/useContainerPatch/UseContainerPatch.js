import { useState } from "react";

export default (container, userOnStart) => {
  const [helperTop, setHelperTop] = useState(null);

  const onStart = ({ node }) => setHelperTop(node.getBoundingClientRect().top);
  const onEnd = args => {
    setHelperTop(null);
    userOnStart(args);
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
        container.current.helper.style.transform = `translateY(${containerTop -
          helperTop -
          helperHeight / 2}px)`;
      } else if (currentBottom > containerBottom + helperHeight / 2) {
        container.current.helper.style.transform = `translateY(${containerBottom -
          helperTop -
          helperHeight / 2}px)`;
      }
    }
  };

  return [onStart, onMove, onEnd];
};
