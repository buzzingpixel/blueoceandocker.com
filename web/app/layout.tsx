import React from 'react';
import './app-style.css';
import { Metadata } from 'next';
import MainMenu from './MainMenu';

export const metadata: Metadata = {
    title: 'Blue Ocean Docker',
    description: 'Learn all about how to use Docker!',
    alternates: {
        types: {
            'application/rss+xml': [
                {
                    title: 'Blue Ocean Docker RSS Feed',
                    url: 'https://www.blueoceandocker.com/feed.xml',
                },
            ],
        },
    },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body>
            <MainMenu />
            <div className="absolute z-10 left-0 top-0 w-full h-full opacity-75">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
            <div className="relative z-20">
                {children}
            </div>
        </body>
    </html>
);

export default RootLayout;
