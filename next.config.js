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
    future: {
        webpack5: true,
        strictPostcssConfiguration: true
    },
}
