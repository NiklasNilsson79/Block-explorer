import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';

class BlockchainClient {
  constructor(rpcUrl = 'http://127.0.0.1:7545') {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  // Hämta en signer baserat på avsändaradress
  async getSigner(senderAddress) {
    try {
      // Kontrollera att avsändaradressen är giltig
      if (!ethers.isAddress(senderAddress)) {
        throw new Error(`Ogiltig Ethereum-adress: ${senderAddress}`);
      }

      // Hämta alla konton från Ganache
      const accounts = await this.provider.send('eth_accounts', []);

      // Kontrollera om avsändaren finns i listan
      const senderIndex = accounts.findIndex(
        (acc) => acc.toLowerCase() === senderAddress.toLowerCase()
      );

      if (senderIndex === -1) {
        throw new Error(`Ingen matchande signer hittades för ${senderAddress}`);
      }

      // Returnera rätt signer från Ganache
      return this.provider.getSigner(senderIndex);
    } catch (error) {
      console.error('Fel vid skapande av signer:', error);
      return null;
    }
  }

  // Hämta provider
  getProvider() {
    return this.provider;
  }
}

// Skapa och exportera en instans av BlockchainClient
export const blockchainClient = new BlockchainClient();
