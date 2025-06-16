import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Paste from './component/Paste';
import Viewpaste from './component/Viewpaste';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       <Navbar/>
        <Home/>
      </>
    ),
  },
  {
    path: "/pastes",
    element: (
      <>
        <Navbar />
        <Paste/>
      </>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <>
        <Navbar />
        <Viewpaste/>
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
