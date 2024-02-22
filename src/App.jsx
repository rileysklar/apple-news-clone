import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Feed from "./components/feed/feed";
import Footer from "./components/footer/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="body-wrapper">
        <Header />
        <Feed />
        <Footer />
      </div>
    </>
  );
}

export default App;
