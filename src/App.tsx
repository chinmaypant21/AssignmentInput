import InputComponent from 'component/InputComponent';
import './App.css';

function App() : JSX.Element {
  return (
    <div className="App p-10 h-full w-full flex flex-col gap-5 items-center">
      <span className='font-bold text-3xl text-green-600'>Pick Users</span>
      <InputComponent />
    </div>
  );
}

export default App;
