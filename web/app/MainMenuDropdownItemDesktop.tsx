import Link from 'next/link';
import React, { useEffect } from 'react';
import { MenuSecondLevelItem } from './Menu';

const MainMenuDropdownItemDesktop = (
    {
        close,
        item,
    }: {
        close: () => void;
        item: MenuSecondLevelItem;
    },
) => {
    useEffect(() => {
        const clickHandler = () => {
            close();
        };

        document.body.addEventListener('click', clickHandler);

        return () => {
            document.body.removeEventListener('click', clickHandler);
        };
    });

    return (
        <div
            key={item.name}
            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
        >
            <div className="flex-auto">
                <Link
                    href={item.href}
                    className="block font-semibold text-gray-900"
                >
                    {item.name}
                    <span className="absolute inset-0" />
                </Link>
            </div>
        </div>
    );
};

export default MainMenuDropdownItemDesktop;
