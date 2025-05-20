import Rss from 'rss';
import fs from 'node:fs';
import markdownit from 'markdown-it';
import markdownitgithubalerts from 'markdown-it-github-alerts';
import { Lessons } from '../Lessons';
import { parseImageUrls } from '../lesson/LessonContent';

export async function GET () {
    const siteUrl = 'https://www.blueoceandocker.com';
    const lessons = Lessons.filter(
        (lesson) => !!lesson.youTubeId || !!lesson.date,
    );

    lessons.reverse();

    const feed = new Rss({
        title: 'Lessons from Blue Ocean Docker',
        description: 'Learn how to use Docker to its fullest potential with the latest lessons from  Blue Ocean Docker',
        generator: 'Blue Ocean Docker',
        feed_url: `${siteUrl}/feed.xml`,
        site_url: siteUrl,
        managingEditor: 'TJ Draper',
        webMaster: 'TJ Draper',
        copyright: (new Date()).getFullYear().toString(),
        language: 'en',
        pubDate: lessons[0].date,
    });

    lessons.forEach((lesson) => {
        let description = `${lesson.description}<br><br><iframe width="560" height="315" src="https://www.youtube.com/embed/${lesson.youTubeId}" title="${lesson.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

        if (lesson.hasContent) {
            const href = lesson.href === '/' ? '' : lesson.href;

            const fileContents = fs.readFileSync(
                `${process.cwd()}/public${href}/content.md`,
            ).toString();

            const md = markdownit({
                html: true,
                typographer: true,
            });

            md.use(markdownitgithubalerts);

            const content = parseImageUrls(
                md.render(fileContents).trim(),
                lesson.href,
            );

            description += `<br><br>If you prefer to read the lesson, rather than watch the video, I’ve got you covered!<h3>Lesson article:</h3><hr />${content}`;
        }

        feed.item({
            title: lesson.name,
            description,
            url: siteUrl + lesson.href,
            // We actually know this is defined based on filter above
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            guid: lesson.youTubeId,
            author: 'TJ Draper',
            // We actually know this is defined based on filter above
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            date: lesson.date,
        });
    });

    return new Response(feed.xml(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
