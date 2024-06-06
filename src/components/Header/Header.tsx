import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/psyhologists">Psyhologists</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </header>
  );
};
