module.exports = {
    images: {
        domains: [
            'markmanson.net',
            'img.youtube.com'
        ],
    },
    async redirects() {
        return [
            {
                source: '/cp',
                destination: '/cp/posts',
                permanent: true,
            },
        ]
    },
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    publicRuntimeConfig: {
        staticFolder: '/static',
    },
}
