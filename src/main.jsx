import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './contexts/auth/auth-provider.jsx';
import NotificationProvider from './contexts/notification/notificationProvider.jsx';
import { queryClient } from './libs/utils/query-client.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <NotificationProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </NotificationProvider>
  </AuthProvider>
);
