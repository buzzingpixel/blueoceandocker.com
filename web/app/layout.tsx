import React from 'react';
import './app-style.css';
import MainMenu from './MainMenu';

export const metadata = {
    title: 'Blue Ocean Docker',
    description: 'Learn all about how to use Docker!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body>
            <MainMenu />
            {children}
        </body>
    </html>
);

export default RootLayout;
