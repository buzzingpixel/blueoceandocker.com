import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { Lessons } from '../../Lessons';
import LessonPage from '../LessonPage';

const getCurrentLesson = (slug: string) => {
    const href = `/lesson/${slug}`;

    const currentLesson = Lessons.find(
        (lesson) => lesson.href === href,
    );

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
        params: Promise<{ slug: string }>;
    },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let baseTitle = (await parent)?.title.absolute || '';

    if (baseTitle) {
        baseTitle = ` | ${baseTitle}`;
    }

    const { slug } = await params;

    const currentLesson = getCurrentLesson(slug);

    if (!currentLesson) {
        return {};
    }

    return {
        title: `${currentLesson.name}${baseTitle}`,
        description: currentLesson.description,
    };
}

const Page = async ({ params }: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const currentLesson = getCurrentLesson(slug);

    if (!currentLesson) {
        return notFound();
    }

    return <LessonPage href={`/lesson/${slug}`} />;
};

export default Page;
