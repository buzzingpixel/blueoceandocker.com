import React from 'react';
import { notFound } from 'next/navigation';
import { Lessons } from '../../Lessons';
import LessonPage from '../../LessonPage';

export const generateStaticParams = async () => {
    const paths = [] as Array<{ slug: string }>;

    Lessons.forEach((lesson) => {
        const slugArray = lesson.href.split('/');

        const slug = slugArray[slugArray.length - 1];

        if (!slug) {
            return;
        }

        paths.push({ slug });
    });

    return paths;
};

const Page = ({ params }: {
    params: { slug: string };
}) => {
    const href = `/lesson/${params.slug}`;

    const currentLesson = Lessons.filter(
        (lesson) => lesson.href === href,
    )[0];

    if (!currentLesson) {
        return notFound();
    }

    return <LessonPage href={href} />;
};

export default Page;
