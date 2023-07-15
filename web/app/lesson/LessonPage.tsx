import React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Lessons } from '../Lessons';

const Page = (
    {
        href,
    }: {
        href: string;
    },
) => {
    const currentLesson = Lessons.filter(
        (lesson) => lesson.href === href,
    )[0];

    const currentIndex = Lessons.findIndex(
        (lesson) => lesson.href === href,
    );

    if (!currentLesson) {
        throw new Error('Unable to retrieve current lesson');
    }

    let paginationJustify = 'justify-end';

    let previousLesson = null;

    if (currentIndex > 0) {
        paginationJustify = 'justify-between';

        previousLesson = Lessons[currentIndex - 1];
    }

    const nextLesson = Lessons[currentIndex + 1];

    return (
        <>
            <div className="px-6 py-2 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-cyan-700 sm:text-5xl">
                        Blue Ocean Docker
                    </h2>
                    <p className="mt-4 text-base sm:text-2xl font-semibold leading-7 text-cyan-600">
                        {currentLesson.name}
                    </p>
                </div>
                <div className="mx-auto max-w-6xl text-center pt-8">
                    <div className="aspect-w-16 aspect-h-9 shadow-2xl">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube-nocookie.com/embed/${currentLesson.youTubeId}?modestbranding=1&color=white&showinfo=0&showsearch=0&iv_load_policy=3&rel=0`}
                            title={currentLesson.name}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
                {(() => {
                    if (!previousLesson && !nextLesson) {
                        return null;
                    }

                    return (
                        <nav
                            className="flex items-center justify-between border-t border-gray-200 bg-white my-8 py-4 mx-auto max-w-6xl"
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
                                            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
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
                })()}
            </div>
        </>
    );
};

export default Page;
