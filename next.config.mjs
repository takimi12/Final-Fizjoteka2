import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    MONGODB_URL: process.env.MONGODB_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: "http://localhost:3000",
  },
  images: {    domains: [
    'raddys-web-storage1.s3.eu-north-1.amazonaws.com',
    'bal.ergotree.pl',
    // Add more domains here if needed
  ],

  },
  // async redirects(){
  //   return [
  //     {
  //       source: "/pl/blog",
  //       destination: "/blog",
  //       permanent: true
  //     }
  //   ]
  // }
};

export default withNextIntl(nextConfig);
