import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import Layout from './routes/Layout.tsx';
import Home from './routes/Home.tsx';
import Budget from './routes/Budget.tsx';
import { SettingsProvider } from './components/settings-provider.tsx';
import Prevision from '@/routes/Prevision.tsx';
import Tutorial from '@/routes/Tutorial.tsx';
import ScrollToTop from '@/components/ScrollToTop.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='budgets/:id' element={<Budget />} />
              <Route path='previsions/:id' element={<Prevision />} />
              <Route path='tutorial' element={<Tutorial />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
)
