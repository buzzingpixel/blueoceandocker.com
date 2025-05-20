'use client';

import React from 'react';
// import { ResponseStatus } from './send-sign-up-request/ResponseStatus';

// const inputRef = useRef<HTMLInputElement>(null);

// const [isSubmitting, setIsSubmitting] = useState(false);

// const [message, setMessage] = useState<{
//     status: string;
//     message: string;
// } | null>(null);

// const subscribeEmailAddress = async (e: FormEvent) => {
//     e.preventDefault();
//
//     setIsSubmitting(true);
//
//     const res = await (fetch('/lesson/send-sign-up-request', {
//         body: JSON.stringify({
//             email: inputRef?.current?.value,
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         method: 'POST',
//     }));
//
//     const json = await res.json();
//
//     setMessage(json);
//
//     setTimeout(() => {
//         setIsSubmitting(false);
//     }, 100);
// };

const LessonSignUpForm = (
    {
        isLastPage,
    }: {
        isLastPage: boolean;
    },
) => (
    <div className="bg-gray-900 py-16 sm:py-24 lg:py-36 xl:py-52 text-center">
        <div className="mx-auto grid px-6 lg:px-8 max-w-xl">
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                {(() => {
                    if (isLastPage) {
                        return (
                            <>
                                <h2 className="mb-8">I&rsquo;m working on more lessons!</h2>
                                <p className="font-normal text-xl">Subscribe to the RSS feed if you&rsquo;d like to know when more lessons are released!</p>
                            </>
                        );
                    }

                    return (
                        <>
                            <h2 className="mb-2">This lesson is coming soon!</h2>
                        </>
                    );
                })()}
            </div>
            {/* {(() => {
                    if (message) {
                        let fontColor = 'text-cyan-200';

                        if (message.status === ResponseStatus.FAILURE) {
                            fontColor = 'text-red-600';
                        }

                        return (
                            <div className="w-full lg:pt-2">
                                <div className={`${fontColor} font-bold text-xl`}>
                                    {message.message}
                                </div>
                            </div>
                        );
                    }

                    let buttonBgColor = 'bg-cyan-500';

                    if (isSubmitting) {
                        buttonBgColor = 'bg-gray-400';
                    }

                    return (
                        <form className="w-full lg:pt-2" onSubmit={subscribeEmailAddress}>
                            <div className="sm:flex gap-x-4 max-w-xs mx-auto sm:max-w-full">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    ref={inputRef}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6 mb-2 sm:mb-0 w-full"
                                    placeholder="Enter your email"
                                />
                                <button
                                    type="submit"
                                    className={`flex-none rounded-md ${buttonBgColor} px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 w-full sm:w-auto`}
                                    disabled={isSubmitting}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    );
                })()} */}
        </div>
    </div>
);
export default LessonSignUpForm;
