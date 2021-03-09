import { MatrixProvider } from '../components/matrixContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // Any of the children components of this provider can now get the value.
    <MatrixProvider>
      <Component {...pageProps} />
    </MatrixProvider>
  );
}

export default MyApp;
