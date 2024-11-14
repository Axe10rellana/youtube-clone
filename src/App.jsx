//react
import React from "react";

//react-router-dom
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//material-ui
import { Box } from "@mui/material";

//components
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed } from "./components";

const Layout = () => (
  <Box sx={{ backgroundColor: "#000" }}>
    <Navbar />
    <Outlet />
  </Box>
);

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Feed /> },
        { path: "/video/:id", element: <VideoDetail /> },
        { path: "/channel/:id", element: <ChannelDetail /> },
        { path: "/search/:searchTerm", element: <SearchFeed /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const App = () => {
  return <RouterProvider router={router} future={{ v7_startTransition: true, }} />;
};

export default App;
