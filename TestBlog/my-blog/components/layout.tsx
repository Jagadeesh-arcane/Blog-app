// components/Layout.tsx

import Footer from './footer';
import Header from './header';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
