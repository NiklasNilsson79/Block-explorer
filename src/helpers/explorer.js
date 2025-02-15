import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';

// Skapa en publik klient (anslutning till blockchainen)
export const createClient = () => {
  return new ethers.JsonRpcProvider('http://127.0.0.1:7545'); // Anslut till Ganache
};

// Skapa en signer baserat på avsändaradress
export const createWallet = async (senderAddress) => {
  const provider = createClient();

  // 🔹 Hämta alla adresser från Ganache
  const accounts = await provider.send('eth_accounts', []);

  // 🔹 Kontrollera att avsändaren finns i listan
  const senderIndex = accounts.findIndex(
    (acc) => acc.toLowerCase() === senderAddress.toLowerCase()
  );

  if (senderIndex === -1) {
    throw new Error(`❌ Ingen matchande signer hittades för ${senderAddress}`);
  }

  // 🔹 Returnera rätt signer från Ganache
  return provider.getSigner(senderIndex);
};
