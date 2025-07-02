import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import { APIProvider } from '@vis.gl/react-google-maps';
import { BrowserRouter } from "react-router";
import RouterConfig from './navigation/RouterConfig.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </APIProvider>
  </Provider>
</StrictMode>
)