'use client';

import React, { Fragment, useState } from 'react';
import {
    Dialog,
    Disclosure,
    Popover,
    Transition,
} from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Lessons } from './Lessons';
import { MenuTopLevel } from './Menu';

function classNames (...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const LessonsForMenu = Lessons;

LessonsForMenu.pop();

export const Menu:MenuTopLevel = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Lessons',
        dropdown: LessonsForMenu,
    },
    {
        name: 'Get Updates',
        dropdown: [
            {
                name: 'Email Updates',
                href: '/lesson/sign-up-for-more',
            },
            {
                name: 'RSS Feed',
                href: '/feed.xml',
            },
        ],
    },
    {
        name: 'About',
        href: '/about',
    },
];

const MainMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative z-50">
            <div className="w-full h-2 bg-cyan-600" />
            <div className="p-6 lg:px-8">
                <nav className="mx-auto flex max-w-6xl items-center justify-between" aria-label="Global">
                    <div className="flex lg:hidden ml-auto">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12 mx-auto">
                        {Menu.map((menuItem) => {
                            if (!menuItem.dropdown) {
                                return (
                                    <Link
                                        key={menuItem.name}
                                        href={menuItem.href || ''}
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        {menuItem.name}
                                    </Link>
                                );
                            }

                            return (
                                <Popover className="relative" key={menuItem.name}>
                                    <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                        {menuItem.name}
                                        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute -left-8 top-full z-50 mt-3 w-screen max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                            <div className="p-4">
                                                {menuItem.dropdown.map((item) => (
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
                                                ))}
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            );
                        })}
                    </Popover.Group>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 ml-auto"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {Menu.map((menuItem) => {
                                        if (menuItem.dropdown) {
                                            return (
                                                <Disclosure as="div" className="-mx-3" key={menuItem.name}>
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                                {menuItem.name}
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                                    aria-hidden="true"
                                                                />
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                                {/* We checked this above. Sigh. Typescript is not too bright sometimes */}
                                                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                                                {/* @ts-ignore */}
                                                                {menuItem.dropdown.map((item) => (
                                                                    <Link
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={menuItem.name}
                                                href={menuItem.href || ''}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {menuItem.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </div>
        </header>
    );
};

export default MainMenu;
