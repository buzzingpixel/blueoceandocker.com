// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    publicRuntimeConfig: {
    },
    serverRuntimeConfig: {
        prettyLogs: String(process.env.PRETTY_LOGS) === '1',
        redisHost: String(process.env.REDIS_HOST),
    },
    // We run this in a separate step in CI
    eslint: {
        ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
};
