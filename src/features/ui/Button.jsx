import { Link } from "react-router-dom";

export default function Button({ children, to }) {
  const customClass =
    "rounded-full bg-yellow-400 px-3 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-yellow-200";

  return (
    <Link to={to} className={customClass}>
      {children}
    </Link>
  );
}
