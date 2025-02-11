import { ethers } from 'ethers';

// Anslut till Ganache
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');

async function checkConnection() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Ansluten till Ganache! Nuvarande blocknummer:', blockNumber);
  } catch (error) {
    console.error('Kunde inte ansluta till Ganache:', error);
  }
}

checkConnection();
