import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { AuthRoute, ProtectedRoute } from './components/auth';
import MainLayout from './components/layouts/MainLayout';
import AuthContext from './contexts/auth/auth-context';
import Account from './pages/account';
import Classroom from './pages/classroom';
import ReadFileExcelListStudents from './pages/import-excel-list-students';
import Main from './pages/main';
import AdminMapIdStudent from './pages/mapping-id-student';
import SignIn from './pages/sign-in';
import { getMe } from './services/auth';

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `;

function App() {
  const { setUser, setLoaded } = useContext(AuthContext);
  useQuery({
    queryKey: 'me',
    queryFn: async () => {
      const data = await getMe();
      setLoaded(true);
      return data;
    },
    enabled: true,
    onSuccess: (data) => {
      setUser(data.data.data);
    },
  });
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/classroom"
            element={
              <ProtectedRoute>
                <Classroom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mapping-id-student"
            element={
              <ProtectedRoute>
                <AdminMapIdStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/import-excel-list-students"
            element={
              <ProtectedRoute>
                <ReadFileExcelListStudents />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/sign-in"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
