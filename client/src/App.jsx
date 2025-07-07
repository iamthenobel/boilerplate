// App.js (no changes needed here)
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Home from './pages/Home';
import Insight from './pages/Insight';
import Create from './pages/Create';
import Notifications from './pages/Notifications';
import Chats from './pages/Chats';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="search" element={<Search />} />
        <Route path="home" element={<Home />} />
        <Route path="insight" element={<Insight />} />
        <Route path="create" element={<Create />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="chats" element={<Chats />} />
      </Route>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
