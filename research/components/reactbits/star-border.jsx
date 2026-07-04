/*
 * ReactBits — StarBorder (Animation)
 * Source: https://reactbits.dev/animations/star-border
 * GitHub:  https://github.com/DavidHDev/react-bits/tree/main/src/content/Animations/StarBorder
 *
 * Dependencies: none (plain CSS + React, zero external packages)
 *
 * A polymorphic wrapper (renders as any tag/component via the `as` prop,
 * defaults to <button>) with two radial-gradient "comet" blobs animating
 * along the top and bottom edges in a continuous loop, giving the
 * appearance of a shooting-star/orbit trail circling the border. Despite
 * the name it's a lightweight, dependency-free CSS animation (no WebGL),
 * making it the cheapest literal "star" themed component in the library --
 * excellent for CTA buttons, nav pills, or "Explore this planet" links
 * throughout the galaxy site, without adding any new npm dependency.
 *
 * Usage:
 *   import StarBorder from './star-border';
 *   <StarBorder as="a" href="/services/web" color="#7cff67" speed="5s">
 *     Explore Web Development
 *   </StarBorder>
 *
 * Props:
 *   as: elementType             - tag/component to render (default 'button')
 *   className: string
 *   color: string (any CSS color) - color of the comet-trail gradient
 *   speed: string (CSS duration)   - animation-duration of the trail loop, e.g. '6s'
 *   thickness: number (px)          - outer padding, controls border "thickness"
 *   children: ReactNode
 */
import './star-border.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
