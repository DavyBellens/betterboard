import withTM from 'next-transpile-modules';

export default withTM(['@luzmo/react-embed', '@luzmo/embed', '@luzmo/shared-embed'])({
  reactStrictMode: true,
  webpack: (config) => {
    return config;
  },
});
