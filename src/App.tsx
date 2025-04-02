import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/components/store/Store";

function App() {
  const router = createBrowserRouter([PrivateRoutes()]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
