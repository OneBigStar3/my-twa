// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from './hooks/useCounterContract';
import { useTonConnect } from './hooks/useTonConnect';
import { minAddress } from "./utils/addressHelper";

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="center" style={{ marginBottom: '1rem' }}>
          <TonConnectButton />
        </div>
        <div className="center" style={{ marginBottom: '1rem' }}>
          <button onClick={() => sendIncrement()} disabled={!connected}>
            {connected ? 'Increment' : 'Disabled'}
          </button>
        </div>
        <b>Counter Address</b>
        <div className='Hint'>{minAddress(address, 8)}</div>
        <b>Counter Value</b>
        <div>{value ?? 'Loading...'}</div>
      </div>
    </>
  );
}

export default App;
