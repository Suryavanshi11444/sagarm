import Quiz from "./components/Quiz";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quiz Application</h1>
      </header>
      <main className="app-main">
        <Quiz />
      </main>
    </div>
  );
}

export default App;
