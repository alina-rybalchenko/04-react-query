import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App.tsx';
import 'modern-normalize/modern-normalize.css';
import './global.css';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
