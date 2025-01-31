import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const router = createBrowserRouter([PrivateRoutes()]);
  return <RouterProvider router={router} />;
}

export default App;
