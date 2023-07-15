import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { Lessons } from '../../Lessons';
import LessonPage from '../LessonPage';

const getCurrentLesson = ({ params }: {
    params: { slug: string };
}) => {
    const href = `/lesson/${params.slug}`;

    const currentLesson = Lessons.filter(
        (lesson) => lesson.href === href,
    )[0];

    if (!currentLesson) {
        return null;
    }

    return currentLesson;
};

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

export async function generateMetadata (
    { params }: {
        params: { slug: string };
    },
    parent?: ResolvingMetadata,
): Promise<Metadata> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let baseTitle = (await parent)?.title.absolute || '';

    if (baseTitle) {
        baseTitle = ` | ${baseTitle}`;
    }

    const currentLesson = getCurrentLesson({ params });

    if (!currentLesson) {
        return {};
    }

    return {
        title: `${currentLesson.name}${baseTitle}`,
        description: currentLesson.description,
    };
}

const Page = ({ params }: {
    params: { slug: string };
}) => {
    const currentLesson = getCurrentLesson({ params });

    if (!currentLesson) {
        return notFound();
    }

    return <LessonPage href={`/lesson/${params.slug}`} />;
};

export default Page;
