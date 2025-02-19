import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';

class BalanceChecker {
  constructor(providerUrl) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.addressInput = document.getElementById('address');
    this.balanceElement = document.getElementById('balance');
    this.getBalanceButton = document.getElementById('getBalance');

    if (!this.addressInput || !this.balanceElement || !this.getBalanceButton) {
      console.error(
        '❌ Ett eller flera HTML-element saknas! Kontrollera balance.html.'
      );
      return;
    }

    this.getBalanceButton.addEventListener('click', () => this.getBalance());
  }

  async getBalance() {
    const address = this.addressInput.value.trim();

    if (!address) {
      this.updateBalanceStatus('❌ Ange en Ethereum-adress!');
      return;
    }

    if (!ethers.isAddress(address)) {
      this.updateBalanceStatus('❌ Ogiltig Ethereum-adress!');
      return;
    }

    try {
      const balance = await this.provider.getBalance(address);
      const balanceInEther = parseFloat(ethers.formatEther(balance)).toFixed(2);
      this.updateBalanceStatus(`💰 ${balanceInEther} ETH`);
    } catch (error) {
      this.updateBalanceStatus('❌ Fel: Kontrollera adressen!');
      console.error('❌ Fel vid hämtning av saldo:', error);
    }
  }

  updateBalanceStatus(message) {
    if (this.balanceElement) {
      this.balanceElement.innerText = message;
    }
  }
}

// Initiera balance checker när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  new BalanceChecker('http://127.0.0.1:7545');
});
