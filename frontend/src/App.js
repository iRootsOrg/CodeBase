import logo from './logo.svg';
import './App.css';
import Output from './Components/Output.jsx';
import CodeEditor from "./Components/CodeEditor";

function App() {
  return (
    <div className="flex h-screen">
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 h-full overflow-y-auto">
          <CodeEditor />
        </div>
        <div className="w-1 bg-gray-300 cursor-ew-resize"></div>
        <div className="flex-1 h-full overflow-y-auto">
          <Output />
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
