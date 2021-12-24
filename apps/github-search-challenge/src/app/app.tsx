import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes';

export function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />

      <AppRoutes />
    </>
  );
}

export default App;
