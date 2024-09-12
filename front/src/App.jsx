import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Init from './pages/Init';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/subpages/Home';
import Menu from './pages/subpages/Menu';
import Orders from './pages/subpages/Orders';
import Books from './pages/subpages/Books';
import Workers from './pages/subpages/Workers';
import Costumers from './pages/subpages/Costumers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/costumers" element={<Costumers />} />
        <Route path="/bookings" element={<Books />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
