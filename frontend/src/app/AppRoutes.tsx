import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from './AppShell';

const Home = lazy(() => import('@features/frontendHome/HomeLanding'));

export function AppRoutes() {
  return (
    <AppShell>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
