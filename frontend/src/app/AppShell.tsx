import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '@components/Container';
import { Header } from '@components/Header';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <Header title="Nodipar" subtitle="Modern PERN starter" />
      <nav className="app-shell__nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
          Home
        </NavLink>
      </nav>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
