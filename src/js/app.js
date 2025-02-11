import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545'); // Ganache RPC URL

const getBalance = async () => {
  const addressInput = document.getElementById('address').value;
  const balanceElement = document.getElementById('balance');

  if (!addressInput) {
    balanceElement.innerText = '❌ Ange en Ethereum-adress!';
    return;
  }

  try {
    const balance = await provider.getBalance(addressInput);
    const balanceInEther = ethers.formatEther(balance);
    balanceElement.innerText = `💰 ${balanceInEther} ETH`;
  } catch (error) {
    balanceElement.innerText = '❌ Fel: Kontrollera adressen!';
    console.error('Fel vid hämtning av saldo:', error);
  }
};

const initApp = () => {
  console.log('Appen är initierad!');
  document.getElementById('getBalance').addEventListener('click', getBalance);
};

export { initApp };
