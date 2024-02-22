import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Feed from "./components/feed/feed";
import Footer from "./components/footer/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Feed />
      <Footer />
    </>
  );
}

export default App;
