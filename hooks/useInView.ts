"use client";

import { useCallback, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // If node is null (unmount), reset state
      if (!node) {
        setInView(false);
        return;
      }

      // Create new observer for the new node
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) {
              observer.unobserve(node);
            }
          } else if (!triggerOnce) {
            setInView(false);
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold, rootMargin, triggerOnce]
  );

  return { ref, inView };
}
