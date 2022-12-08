import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DressUp from "./DressUp/DressUp";
import Menu from "./Menu/Menu";

export enum View {
    Menu,
    DressUp
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/dressup/:identifier',
    element: <DressUp />
  }
])

const App = () => {
    return (
    <RouterProvider router={router} />
    )
}

export default App;