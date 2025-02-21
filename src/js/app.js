import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';

class BlockchainExplorer {
  constructor(rpcUrl) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl); // Ganache RPC URL
  }

  // Hämta Ethereum-saldo för en adress
  async getBalance() {
    const addressInput = document.getElementById('address').value;
    const balanceElement = document.getElementById('balance');

    if (!addressInput) {
      balanceElement.innerText = 'Ange en Ethereum-adress!';
      return;
    }

    try {
      const balance = await this.provider.getBalance(addressInput);
      const balanceInEther = ethers.formatEther(balance);
      balanceElement.innerText = `💰 ${balanceInEther} ETH`;
    } catch (error) {
      balanceElement.innerText = 'Fel: Kontrollera adressen!';
      console.error('Fel vid hämtning av saldo:', error);
    }
  }

  // Hämta antalet block i blockchainen
  async getBlockCount() {
    const blockElement = document.getElementById('blockCount');

    try {
      const blockNumber = await this.provider.getBlockNumber();
      blockElement.innerText = `Antal block i nätverket: ${blockNumber}`;
    } catch (error) {
      blockElement.innerText = 'Fel vid hämtning av blocknummer!';
      console.error('Fel vid hämtning av blocknummer:', error);
    }
  }

  // Skicka en transaktion från rätt konto
  async sendTransaction() {
    const sender = document.getElementById('sender').value;
    const receiver = document.getElementById('receiver').value;
    const amount = document.getElementById('amount').value;
    const statusElement = document.getElementById('transactionStatus');

    if (!sender || !receiver || !amount) {
      statusElement.innerText = 'Fyll i alla fält!';
      return;
    }

    try {
      // Hämta alla konton från Ganache
      const signers = await this.provider.listAccounts(); // Returnerar signer-objekt
      const accounts = signers.map((signer) => signer.address.toLowerCase()); // Extrahera adresser

      // Kontrollera att avsändaren finns i listan
      if (!accounts.includes(sender.toLowerCase())) {
        statusElement.innerText = 'Avsändaradressen finns inte i Ganache!';
        return;
      }

      // Hitta rätt signer från listan
      const signer = signers.find(
        (signer) => signer.address.toLowerCase() === sender.toLowerCase()
      );

      if (!signer) {
        statusElement.innerText = 'Kunde inte skapa signer!';
        return;
      }

      // 🔹 Skapa transaktionen
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
      statusElement.innerText = 'Fel vid transaktion!';
      console.error('Fel vid transaktion:', error);
    }
  }

  // Koppla knappar till metoder
  initApp() {
    document
      .getElementById('getBalance')
      .addEventListener('click', () => this.getBalance());
    document
      .getElementById('sendTransaction')
      .addEventListener('click', () => this.sendTransaction());
    document
      .getElementById('getBlockCount')
      .addEventListener('click', () => this.getBlockCount());
  }
}

// Skapa en instans av BlockchainExplorer och starta appen
document.addEventListener('DOMContentLoaded', () => {
  const explorer = new BlockchainExplorer('http://127.0.0.1:7545');
  explorer.initApp();
});

export { BlockchainExplorer };
