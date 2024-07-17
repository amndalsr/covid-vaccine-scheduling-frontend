import { BrowserRouter } from "react-router-dom";
import Banner from "./components/Banner";
import Menu from "./components/Menu";

function App() {
  return (
    <BrowserRouter>
      <Menu />;
      <Banner />
    </BrowserRouter>
  );
}

export default App;
