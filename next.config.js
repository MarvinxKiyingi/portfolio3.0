/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    sassOptions:{
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
		domains: ['cdn.sanity.io']
	},
    async rewrites() {
        return [
          {
            source: '/about',
            destination: '/',
          },
        ]
    },
}

module.exports = nextConfig
