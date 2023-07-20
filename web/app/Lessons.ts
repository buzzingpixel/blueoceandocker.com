import { MenuSecondLevelItem } from './Menu';

type LessonItemType = {
    description: string;
    isLastPage?: boolean;
    youTubeId?: string | null;
    date?: Date;
};

type LessonsType = Array<MenuSecondLevelItem & LessonItemType>;

export const Lessons: LessonsType = [
    {
        name: 'Lesson 1: Why Docker',
        description: 'Learn about why you would want to use Docker and how it can benefit you!',
        href: '/',
        youTubeId: 'J3fk7fNMxGo',
        date: new Date('2023-07-17T08:00:00-06:00'),
    },
    {
        name: 'Lesson 2: Key Concepts',
        description: 'Learn about the important key concepts of Docker',
        href: '/lesson/key-concepts',
        youTubeId: null,
    },
    {
        name: 'Lesson 3: Running a Container',
        description: 'Learn how to set up and run a Docker container',
        href: '/lesson/running-a-container',
        youTubeId: null,
    },
    {
        name: 'There’s more coming soon!',
        description: 'Sign up to get updates when new content comes out!',
        href: '/lesson/sign-up-for-more',
        isLastPage: true,
        youTubeId: null,
    },
];
