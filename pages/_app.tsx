import MatrixProvider from '../components/matrixContext';

import '../styles/globals.css';

import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/matrixContext'),
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    // Any of the children components of this provider can now get the value.
    <DynamicComponentWithNoSSR>
      <Component {...pageProps} />
    </DynamicComponentWithNoSSR>
  );
}

export default MyApp;
