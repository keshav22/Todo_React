
import './App.css';
import Todo from './components/todo';

function App() {
  return (
    <div className='App container' style={{paddingTop:30}}>
      <h2> Add Todos / Buckets</h2>
      <Todo />
    </div>
  );
}

export default App;
