// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import markdownit from 'markdown-it';
import markdownitgithubalerts from 'markdown-it-github-alerts';
import fs from 'node:fs';
import Prism from 'prismjs';
import { LessonItemType } from '../Lessons';
import widont from '../typography/widont';
import { MenuSecondLevelItem } from '../Menu';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-csv';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-editorconfig';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';
import 'prism-themes/themes/prism-one-light.css';

import 'markdown-it-github-alerts/styles/github-colors-light.css';
import 'markdown-it-github-alerts/styles/github-base.css';

export function parseImageUrls (
    content: string,
    lessonHref: string,
): string {
    return content.replace(
        /(<img.+src=")(.*)(">)/ig,
        (a: string, b: string, c: string, d: string) => {
            if (c.indexOf('./') !== 0) {
                return a;
            }

            c = `${lessonHref}/${c.slice(2)}`;

            return `${b}${c}${d}`;
        },
    );
}

export default function LessonContent (
    {
        lesson,
    }: {
        lesson: MenuSecondLevelItem & LessonItemType;
    },
) {
    const href = lesson.href === '/' ? '' : lesson.href;

    const fileContents = fs.readFileSync(
        `${process.cwd()}/public${href}/content.md`,
    ).toString();

    const md = markdownit({
        html: true,
        typographer: true,
        highlight: (code, lang) => {
            if (!lang) {
                return code;
            }

            return Prism.highlight(code, Prism.languages[lang], lang);
        },
    });

    md.use(markdownitgithubalerts);

    const content = parseImageUrls(
        md.render(fileContents).trim(),
        lesson.href,
    );

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: widont(content),
            }}
        />
    );
}
