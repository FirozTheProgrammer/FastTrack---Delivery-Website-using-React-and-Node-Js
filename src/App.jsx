import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home';
import UserRequest from './pages/UserRequest';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Inventory from './pages/Inventory';
import ClientDashboard from './pages/ClientDashboard';
import Services from './pages/Services';
import Analytics from './pages/Analytics';
import BulkUploadPage from './pages/BulkUploadPage';
import ApiSettings from './pages/ApiSettings';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={
            <ProtectedRoute>
              <UserRequest />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute requiredRole="admin">
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute requiredRole="admin">
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/bulk-upload" element={
            <ProtectedRoute requiredRole="admin">
              <BulkUploadPage />
            </ProtectedRoute>
          } />
          <Route path="/api-settings" element={
            <ProtectedRoute requiredRole="admin">
              <ApiSettings />
            </ProtectedRoute>
          } />

          {/* Client Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
