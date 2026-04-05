import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="nav">
      <Link to="/" className="logo">Book Club</Link>
      <nav>
        <Link to="/">Home</Link>
        {user && <Link to="/profile">Profile</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign Up</Link>}
        {user && (
          <button className="linkish" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
