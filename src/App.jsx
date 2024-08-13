import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/useAuth.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './components/views/Home.jsx';
import Modules from './components/views/Modules.jsx';
import Students from './components/views/Students.jsx';
import Login from './components/views/Login.jsx';

function App() {
  // Initialisation ------------------------------
  const title = 'Building a reusable form'; // with compound components';

  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout title={title}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/modules' element={<Modules />} />
            <Route path='/students' element={<Students />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
