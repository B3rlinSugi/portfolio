import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal — lightweight, CSS-driven scroll reveal wrapper.
 * Uses IntersectionObserver + GPU-accelerated CSS transitions.
 * Replaces heavy useSpring chains for section entry animations.
 */
const ScrollReveal = ({
  children,
  direction = "up",     // 'up' | 'down' | 'left' | 'right' | 'scale' | 'none'
  delay = 0,            // seconds
  duration = 0.8,       // seconds
  distance = 48,        // px
  threshold = 0.12,
  rootMargin = "0px",
  once = true,          // only animate once
  as: Tag = "div",      // wrapping element
  className = "",
  style = {},
  ...rest
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    scale: `scale(0.92)`,
    none: "none",
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) translateX(0) scale(1)" : transforms[direction],
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * ScrollRevealGroup — staggers children reveals automatically.
 * Each child gets an increasing delay.
 */
export const ScrollRevealGroup = ({
  children,
  stagger = 0.1,
  direction = "up",
  duration = 0.7,
  distance = 36,
  threshold = 0.08,
  className = "",
  style = {},
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const transforms = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    scale: `scale(0.92)`,
    none: "none",
  };

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className} style={style}>
      {childArray.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) translateX(0) scale(1)" : transforms[direction],
            transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${i * stagger}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${i * stagger}s`,
            willChange: "opacity, transform",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollReveal;
