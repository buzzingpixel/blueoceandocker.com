import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { LessonItemType } from '../Lessons';
import { MenuSecondLevelItem } from '../Menu';

export type PaginationJustify = 'justify-end' | 'justify-between';

export default function LessonNav (
    {
        previousLesson,
        nextLesson,
        paginationJustify,
    }: {
        previousLesson: (MenuSecondLevelItem & LessonItemType) | null;
        nextLesson: (MenuSecondLevelItem & LessonItemType) | null;
        paginationJustify: PaginationJustify;
    },
) {
    if (!previousLesson && !nextLesson) {
        return null;
    }

    return (
        <nav
            className="flex items-center justify-between"
            aria-label="Pagination"
        >
            <div className={`flex flex-1 ${paginationJustify}`}>
                {(() => {
                    if (!previousLesson) {
                        return null;
                    }

                    return (
                        <Link
                            href={previousLesson.href}
                            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                            <ChevronLeftIcon className="h-5 w-5 flex-none" />
                            {' '}
                            {previousLesson.name}
                        </Link>
                    );
                })()}
                {(() => {
                    if (!nextLesson) {
                        return null;
                    }

                    return (
                        <Link
                            href={nextLesson.href}
                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                        >
                            {nextLesson.name}
                            {' '}
                            <ChevronRightIcon className="h-5 w-5 flex-none" />
                        </Link>
                    );
                })()}
            </div>
        </nav>
    );
}
