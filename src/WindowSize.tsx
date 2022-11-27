import  {useEffect, useState} from "react";

export type WindowSizeType =  {
    width: number | null
    height: number | null
}

export default function UseWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSizeType>({
      width: null,
      height: null,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }