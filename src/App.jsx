import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import MainLayout from './components/layouts/MainLayout';
import Account from './pages/account';
import Classroom from './pages/classroom';
import Main from './pages/main';
import SignIn from './pages/sign-in';

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `;

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/account" element={<Account />} />
          <Route path="/classroom" element={<Classroom />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
