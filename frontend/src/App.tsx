import { useReducer } from "react";
import { BrowserRouter, createBrowserRouter, Route, Router, RouterProvider, Routes } from "react-router-dom";
import DressUp from "./DressUp/DressUp";
import { dressUpReducer } from "./DressUp/DressUpReducer";
import Menu from "./Menu/Menu";

export enum View {
    Menu,
    DressUp
}

const App = () => {

    const [state, stateDispatch] = useReducer(dressUpReducer, []);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/dressup/:identifier" element={<DressUp state={state} stateDispatch={stateDispatch} />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;