import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'raddys-web-storage1.s3.eu-north-1.amazonaws.com',
      'bal.ergotree.pl',
      'eu-central-1-shared-euc1-02.graphassets.com'
    ],
  },
  

};

export default withNextIntl(nextConfig);
