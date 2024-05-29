
import "./Nav.css";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav className="nav1">
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
      
     
    </nav>
  );
};

export default Nav;
