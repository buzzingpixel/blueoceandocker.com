import React from 'react';

export const metadata = {
    title: 'Hello World',
    description: 'Testing Next',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body>{children}</body>
    </html>
);

export default RootLayout;
