import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// Create an instance of the Alchemy SDK with the provided settings
const alchemy = new Alchemy(settings);

function App() {
  // Define a state variable to store the latest block number
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    // Define an async function to fetch the latest block number
    async function getBlockNumber() {
      // Fetch the latest block number using the Alchemy SDK
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      // Update the state with the latest block number
      setBlockNumber(latestBlockNumber);
    }

    // Call the async function to fetch the block number when the component mounts
    getBlockNumber();
  }, []); // Pass an empty dependency array to run the effect only once

  // Render the block number in the component's JSX
  return <div className="App">Block Number: {blockNumber}</div>;
}

export default App;
