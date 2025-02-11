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

// Skicka en transaktion
const sendTransaction = async () => {
  const sender = document.getElementById('sender').value;
  const receiver = document.getElementById('receiver').value;
  const amount = document.getElementById('amount').value;
  const statusElement = document.getElementById('transactionStatus');

  if (!sender || !receiver || !amount) {
    statusElement.innerText = '❌ Fyll i alla fält!';
    return;
  }

  try {
    // Skapa en signer från avsändaradressen
    const signer = new ethers.Wallet(
      '0x3a6ebf6472171368c4f84d04becae7d25970886befed933eef1d975f582f935d',
      provider
    ); // Använd en privat nyckel från Ganache

    // Skapa transaktionen
    const tx = {
      to: receiver,
      value: ethers.parseEther(amount),
    };

    // Skicka transaktionen
    const transaction = await signer.sendTransaction(tx);
    statusElement.innerText = '⏳ Skickar transaktion... Vänta...';

    await transaction.wait();
    statusElement.innerText = `✅ Transaktion genomförd! TX-hash: ${transaction.hash}`;
    console.log('Transaktion skickad:', transaction);
  } catch (error) {
    statusElement.innerText = '❌ Fel vid transaktion!';
    console.error('Fel vid transaktion:', error);
  }
};

const initApp = () => {
  document.getElementById('getBalance').addEventListener('click', getBalance);
  document
    .getElementById('sendTransaction')
    .addEventListener('click', sendTransaction);
};

export { initApp };
