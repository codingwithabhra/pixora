import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./styles/album-card.css";
import "./styles/buttons.css";
import "./styles/card.css";
import "./styles/galleryImage.css";
import "./styles/input.css";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home.jsx";
import AlbumDetails from "./pages/AlbumDetails.jsx";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ImageDetails from "./pages/ImageDetails.jsx";
import AllPhotos from "./pages/AllPhotos.jsx";
import Album from "./pages/Album.jsx";
import Favourites from "./pages/Favourites.jsx";
import SharedAlbums from "./pages/SharedAlbums.jsx";
import SharedWithMe from "./pages/SharedWithMe.jsx";
import MyProfile from "./pages/MyProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/albums/:albumId",
    element: <AlbumDetails />,
  },
  {
    path: "/albums/:albumId/images/:imageId",
    element: <ImageDetails />,
  },
  {
    path: "/allphotos",
    element: <AllPhotos />,
  },
  {
    path: "/albums",
    element: <Album />,
  },
  {
    path: "/favourites",
    element: <Favourites />,
  },
  {
    path: "/sharedalbums",
    element: <SharedAlbums />,
  },
  {
    path: "/shared-with-me",
    element: <SharedWithMe />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
