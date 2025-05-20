// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import { Lessons } from '../Lessons';
import LessonSignUpForm from './LessonSignUpForm';
import LessonNav, { PaginationJustify } from './LessonNav';
import typography from '../typography/typography';
import LessonContent from '../LessonContent';

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

    let paginationJustify: PaginationJustify = 'justify-end';

    let previousLesson = null;

    if (currentIndex > 0) {
        paginationJustify = 'justify-between';

        previousLesson = Lessons[currentIndex - 1];
    }

    const nextLesson = Lessons[currentIndex + 1];

    const lessonNav = (
        <LessonNav
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            paginationJustify={paginationJustify}
        />
    );

    console.log(currentLesson);

    return (
        <>
            <div className="px-6 py-2 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mt-2 text-4xl font-bold tracking-tight text-cyan-700 sm:text-5xl">
                        Blue Ocean Docker
                    </h2>
                    <p
                        className="mt-4 text-base sm:text-2xl font-semibold leading-7 text-cyan-600"
                        dangerouslySetInnerHTML={{
                            __html: typography(currentLesson.name),
                        }}
                    />
                </div>
                <div className="mx-auto max-w-6xl">
                    {lessonNav}
                </div>
                {(() => {
                    if (currentLesson.youTubeId || currentLesson.hasContent) {
                        return (
                            <>
                                {(() => {
                                    if (!currentLesson.youTubeId) {
                                        return null;
                                    }

                                    return (
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
                                    );
                                })()}
                                {(() => {
                                    if (!currentLesson.hasContent) {
                                        return null;
                                    }

                                    const wrapperClasses = [
                                        'mx-auto',
                                        'max-w-3xl',
                                        'prose',
                                        'pb-6',
                                    ];

                                    if (currentLesson.youTubeId) {
                                        wrapperClasses.push('pt-16');
                                    } else {
                                        wrapperClasses.push('pt-8');
                                    }

                                    return (
                                        <div className={wrapperClasses.join(' ')}>
                                            <h2
                                                dangerouslySetInnerHTML={{
                                                    __html: typography('If you prefer to read the lesson, rather than watch the video, I\'ve got you covered!'),
                                                }}
                                            />
                                            <h3>Lesson article:</h3>
                                            <hr />
                                            <LessonContent lesson={currentLesson} />
                                        </div>
                                    );
                                })()}
                            </>
                        );
                    }

                    return (
                        <div className="mx-auto max-w-6xl text-center pt-8">
                            <div className="shadow-2xl">
                                <LessonSignUpForm isLastPage={!!currentLesson.isLastPage} />
                            </div>
                        </div>
                    );
                })()}
                <div className="border-t border-gray-200 my-8 py-4 mx-auto max-w-6xl">
                    {lessonNav}
                </div>
            </div>
        </>
    );
};

export default Page;
