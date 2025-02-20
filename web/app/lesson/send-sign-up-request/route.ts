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
        const response = await fetch(
            'https://connect.mailerlite.com/api/subscribers',
            {
                body: JSON.stringify({
                    email,
                    groups: [process.env.MAILERLITE_GROUP_ID],
                    status: 'active',
                }),
                headers: {
                    Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                method: 'POST',
            },
        );

        const responseJson = await response.json();

        if (response.status >= 400) {
            return NextResponse.json(
                {
                    status: responseJson.message,
                    message: responseJson.message,
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
