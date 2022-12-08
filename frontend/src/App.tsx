import { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClothingStage from "./Clothing/ClothingStage";
import Menu from "./Menu/Menu";
import { stateReducer } from "./DressUpReducer";

const App = () => {
    const [state, stateDispatch] = useReducer(stateReducer, []);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/dressup/:identifier" element={<ClothingStage state={state} stateDispatch={stateDispatch} />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;