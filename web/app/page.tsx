import React from 'react';
import LessonPage from './LessonPage';
import { Lessons } from './Lessons';

export const metadata = {
    title: `${Lessons[0].name} | Blue Ocean Docker`,
    description: Lessons[0].description,
};

const Page = () => <LessonPage href="/" />;

export default Page;
