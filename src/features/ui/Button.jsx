import { Link } from "react-router-dom";

export default function Button({ children, to, type, onClick }) {
  const baseStyle =
    "rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200";

  const styles = {
    base: baseStyle,
    white:
      "rounded-full px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-stone-200",
    small:
      "rounded-full bg-yellow-400 px-2 py-1 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200",
  };

  if (onClick)
    return (
      <button className={type ? styles[type] : baseStyle} onClick={onClick}>
        {children}
      </button>
    );

  if (!to) return <button className={baseStyle}>{children}</button>;

  return (
    <Link to={to} className={type ? styles[type] : styles.base}>
      {children}
    </Link>
  );
}
