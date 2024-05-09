import React, { useState } from 'react';
import './App.css';
import { ethers } from 'ethers'; // Import ethers.js library

function App() {
  const [blockInput, setBlockInput] = useState('');
  const [transactionInput, setTransactionInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState('');
  const [lastBlockTransactions, setLastBlockTransactions] = useState([]);

  const handleBlockInputChange = (e) => {
    setBlockInput(e.target.value);
  };

  const handleTransactionInputChange = (e) => {
    setTransactionInput(e.target.value);
  };

  const handleTokenInputChange = (e) => {
    setTokenInput(e.target.value);
  };

  const handleAddBlock = async () => {
    if (blockInput.trim() !== '') {
      // Add the block to the list of blocks
      setBlocks([...blocks, blockInput]);
      // Set the last block
      setLastBlock(blockInput);
      // Clear the input field
      setBlockInput('');

      // Initialize Ethereum provider
      const provider = new ethers.providers.JsonRpcProvider('YOUR_API_KEY');

      try {
        // Fetch block details using the provider
        const block = await provider.getBlockWithTransactions(blockInput);
        console.log('Block data:', block);
      } catch (error) {
        console.error('Error fetching block data:', error);
      }
    }
  };

  const handleShowTransactions = async () => {
    if (transactionInput.trim() !== '') {
      // Add the transaction to the last block transactions
      setLastBlockTransactions([...lastBlockTransactions, transactionInput]);
      // Clear the input field
      setTransactionInput('');

      // Initialize Ethereum provider
      const provider = new ethers.providers.JsonRpcProvider('YOUR_API_KEY');

      try {
        // Fetch transactions for the last block using the provider
        const block = await provider.getBlockWithTransactions(lastBlock);
        console.log('Transactions for the last block:', block.transactions);
      } catch (error) {
        console.error('Error fetching transactions for the last block:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Blockchain Explorer</h1>
      <div>
        <input
          type="text"
          value={blockInput}
          onChange={handleBlockInputChange}
          placeholder="Enter block"
        />
        <button onClick={handleAddBlock}>Add Block</button>
      </div>
      <div>
        <input
          type="text"
          value={transactionInput}
          onChange={handleTransactionInputChange}
          placeholder="Enter transaction"
        />
        <button onClick={handleShowTransactions}>Add Transaction</button>
      </div>
      <div>
        <input
          type="text"
          value={tokenInput}
          onChange={handleTokenInputChange}
          placeholder="Enter token"
        />
      </div>
      <div>
        <h2>Last Block: {lastBlock}</h2>
        <h3>Last Block Transactions:</h3>
        <ul>
          {lastBlockTransactions.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>All Blocks:</h3>
        <ul>
          {blocks.map((block, index) => (
            <li key={index}>{block}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
