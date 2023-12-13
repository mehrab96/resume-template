/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    async headers(){
        return [
            {
                source: "/:path*",
                headers: [
                    {key: 'referrer-policy' , 'value' : 'no-referrer'}
                ]
            }
        ]
    }
}

module.exports = nextConfig
