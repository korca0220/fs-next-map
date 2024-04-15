import { RefObject, useEffect, useState } from "react";

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;

    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const observerOptions = {
      threshold,
      root,
      rootMargin,
    };

    const observer = new IntersectionObserver(updateEntry, observerOptions);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}

export default useIntersectionObserver;
