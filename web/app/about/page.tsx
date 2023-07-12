import React from 'react';

export const metadata = {
    title: 'About your host, TJ Draper | Blue Ocean Docker',
    description: 'TJ has been a software engineer in some form or fashion since 2005 and would love to help you understand Docker',
};

const Page = () => (
    <div className="mt-4">
        <main className="isolate">
            <div className="relative">
                <div>
                    <div className="mx-auto max-w-5xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Your Host,
                                {' '}
                                <a
                                    href="https://buzzingpixel.com"
                                    className="text-cyan-700 hover:text-cyan-500 underline"
                                >
                                    TJ Draper
                                </a>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 text-justify">
                                I&rsquo;m a senior software engineer at
                                {' '}
                                <a href="https://www.rxante.com" className="text-cyan-700 hover:text-cyan-500 underline">RxAnte</a>
                                {' '}
                                and I&rsquo;ve been writing software in some form or fashion since 2005. I&rsquo;ve also been involved in dev ops and believe that all software engineers should be well connected with the operations of the software they write. Over the last several years, Docker has come on the scene and made that easier in many ways, but the problem is one of education. This course and series of lessons will help educate developers and dev ops professionals alike on how to best leverage Docker for the success of your platform and team. These lessons incorporate everything I wish I had known going in to Docker and more!
                            </p>
                        </div>
                        <div className="mt-10 flow-root mx-auto" style={{ maxWidth: 400 }}>
                            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <img
                                    src="/images/about/headshot.jpg"
                                    alt="TJ Draper"
                                    width={400}
                                    height={400}
                                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </main>
    </div>
);

export default Page;
