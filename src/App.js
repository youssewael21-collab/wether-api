import logo from "./logo.svg";
import "./App.css";
import Add from "./add";
import Weather from "./weather";

function App() {
  return (
    <div
    dir="rtlؤم"
      style={{
        background: "#0d47a1",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Weather />
    </div>
  );
}

export default App;
