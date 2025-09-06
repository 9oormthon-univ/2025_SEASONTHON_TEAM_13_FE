import { router } from './routes/routes';
import { RouterProvider } from 'react-router-dom';
import { IFrameAPIProvider } from './providers/iframe-api-provider';

function App () {
  return (
    <IFrameAPIProvider>
      <RouterProvider router={router} />
    </IFrameAPIProvider>
  );
}

export default App;
