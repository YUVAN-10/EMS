import "./Loader.css";

/**
 * Loading spinner component.
 * Centered on the page by default. Use `size` prop for different sizes.
 */
const Loader = ({ size = "md", text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <div className={`loader loader--${size}`} />
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
};

export default Loader;
