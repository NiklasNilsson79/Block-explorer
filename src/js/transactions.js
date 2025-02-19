import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';
import { blockchainClient } from '../helpers/explorer.js';

class TransactionHandler {
  constructor(formSelector, statusSelector) {
    this.form = document.querySelector(formSelector);
    this.statusElement = document.querySelector(statusSelector);

    if (!this.form) {
      console.error(`❌ Formuläret ${formSelector} hittades inte!`);
      return;
    }

    // Hämta inputfält
    this.fromInput = this.form.querySelector('#from');
    this.toInput = this.form.querySelector('#to');
    this.valueInput = this.form.querySelector('#value');

    // Bind eventlyssnare
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault(); // Förhindra att sidan laddas om
    console.log('⏳ Skapar transaktion...');

    const sender = this.fromInput?.value.trim();
    const receiver = this.toInput?.value.trim();
    const amount = this.valueInput?.value.trim();

    if (!sender || !receiver || !amount) {
      this.updateStatus('Fyll i alla fält!');
      return;
    }

    try {
      // Skapa signer för avsändaren
      const signer = await blockchainClient.getSigner(sender);
      if (!signer) {
        console.error('Kunde inte skapa signer.');
        return;
      }

      // Skapa och skicka transaktionen
      const transaction = await signer.sendTransaction({
        to: receiver,
        value: ethers.parseEther(amount),
      });

      this.updateStatus('⏳ Skickar transaktion... Vänta...');
      await transaction.wait();

      this.updateStatus(
        `✅ Transaktion genomförd! TX-hash: ${transaction.hash}`
      );
      console.log('Transaktion skickad:', transaction);

      // Skicka användaren till blocks.html efter lyckad transaktion
      setTimeout(() => {
        location.href = './blocks.html';
      }, 2000);
    } catch (error) {
      this.updateStatus('Fel vid transaktion!');
      console.error('Fel vid transaktion:', error);
    }
  }

  updateStatus(message) {
    if (this.statusElement) {
      this.statusElement.innerText = message;
    }
  }
}

// Initiera transaktionshanteraren när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  new TransactionHandler('#transaction-form', '#transactionStatus');
});
