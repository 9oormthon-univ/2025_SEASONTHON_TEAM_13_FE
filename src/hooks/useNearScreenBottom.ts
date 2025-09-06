import React from 'react';

/**
 * A custom React hook that detects if the user has scrolled near to the bottom of the page.
 * @param {number} offset - The distance from the bottom in pixels to trigger the state. Defaults to 100.
 * @returns {boolean} - Returns true if the user is near the bottom, false otherwise.
 */
export function useNearScreenBottom (offset: number = 100): boolean {
  const [isNearBottom, setIsNearBottom] = React.useState(false);

  React.useEffect(() => {
    let ticking = false; // A flag to throttle the scroll event

    const handleScroll = () => {
      // The core logic to check if we're near the bottom
      const isScrolledNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - offset;

      if (isScrolledNearBottom) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }

      ticking = false;
    };

    const onScroll = () => {
      // Use requestAnimationFrame for performance throttling
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', onScroll);

    // IMPORTANT: Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [offset]); // Re-run the effect if the offset changes

  return isNearBottom;
}
