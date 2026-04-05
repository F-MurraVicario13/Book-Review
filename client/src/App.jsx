import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="page">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
