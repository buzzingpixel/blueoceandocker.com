import Rss from 'rss';
import { Lessons } from '../Lessons';

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
        feed_url: `${siteUrl}/rss.xml`,
        site_url: siteUrl,
        managingEditor: 'TJ Draper',
        webMaster: 'TJ Draper',
        copyright: (new Date()).getFullYear().toString(),
        language: 'en',
        pubDate: lessons[0].date,
    });

    lessons.forEach((lesson) => {
        feed.item({
            title: lesson.name,
            description: `${lesson.description}<br><br><iframe width="560" height="315" src="https://www.youtube.com/embed/${lesson.youTubeId}" title="${lesson.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
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
