import { NextRequest, NextResponse } from 'next/server';
import { ResponseStatus } from './ResponseStatus';

export async function POST (req: NextRequest) {
    const body = await req.json();

    const { email } = body;

    if (!email) {
        return NextResponse.json(
            {
                status: ResponseStatus.FAILURE,
                message: 'Email address is required',
            },
            { status: 400 },
        );
    }

    try {
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
        const apiKey = process.env.MAILCHIMP_API_KEY;
        const dataCenter = process.env.MAILCHIMP_API_SERVER;
        const data = {
            email_address: email,
            status: 'subscribed',
        };

        const response = await fetch(
            `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
            {
                body: JSON.stringify(data),
                headers: {
                    Authorization: `apikey ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            },
        );

        const responseJson = await response.json();

        if (response.status >= 400) {
            return NextResponse.json(
                {
                    status: responseJson.title === 'Member Exists'
                        ? ResponseStatus.EXISTS
                        : ResponseStatus.FAILURE,
                    message: responseJson.title === 'Member Exists'
                        ? 'You\'re already subscribed'
                        : 'An unknown error occurred',
                },
                { status: response.status },
            );
        }

        // return res.status(201).json({ error: '' });
        return NextResponse.json({
            status: ResponseStatus.SUCCESS,
            message: 'You\'re in! Keep an eye on your inbox.',
        });
    } catch (error) {
        return NextResponse.json(
            {
                status: ResponseStatus.FAILURE,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                message: error.message || error.toString(),
            },
            { status: 500 },
        );
    }
}
