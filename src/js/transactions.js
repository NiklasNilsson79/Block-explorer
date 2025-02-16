import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';
import { createWallet } from '../helpers/explorer.js';
import { initApp } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Appen är initierad!');

  const form = document.querySelector('#transaction-form');
  const fromInput = document.querySelector('#from');
  const toInput = document.querySelector('#to');
  const valueInput = document.querySelector('#value');
  const statusElement = document.querySelector('#transactionStatus');

  if (!form) {
    console.error('❌ Formuläret #transaction-form hittades inte!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Förhindra att sidan laddas om
    console.log('Skapar transaktion...');

    const sender = fromInput.value.trim();
    const receiver = toInput.value.trim();
    const amount = valueInput.value.trim();

    if (!sender || !receiver || !amount) {
      statusElement.innerText = '❌ Fyll i alla fält!';
      return;
    }

    try {
      // 🔹 Hämta signer för avsändaren automatiskt
      const signer = await createWallet(sender);

      // 🔹 Skapa transaktionen
      const tx = {
        to: receiver,
        value: ethers.parseEther(amount),
      };

      // 🔹 Skicka transaktionen
      const transaction = await signer.sendTransaction(tx);
      statusElement.innerText = '⏳ Skickar transaktion... Vänta...';

      await transaction.wait();
      statusElement.innerText = `✅ Transaktion genomförd! TX-hash: ${transaction.hash}`;
      console.log('Transaktion skickad:', transaction);

      // 🔹 Skicka användaren till blocks.html
      location.href = './blocks.html';
    } catch (error) {
      statusElement.innerText = '❌ Fel vid transaktion!';
      console.error('Fel vid transaktion:', error);
    }
  });
});
