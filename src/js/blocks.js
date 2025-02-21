import { blockchainClient } from '../helpers/explorer.js';
import { createElement, createTextElement } from '../helpers/dom.js';

class BlockExplorer {
  constructor(numBlocksToShow = 10) {
    this.blockList = document.querySelector('#block-list');
    this.client = blockchainClient.getProvider();
    this.numBlocksToShow = numBlocksToShow;

    if (!this.blockList) {
      console.error(
        "Elementet '#block-list' hittades inte! Kontrollera blocks.html."
      );
      return;
    }

    this.listBlocks();
  }

  async listBlocks() {
    try {
      const latestBlock = await this.client.getBlockNumber();
      const startBlock = Math.max(latestBlock - (this.numBlocksToShow - 1), 0);

      this.blockList.innerHTML = ''; // Rensa listan innan vi lägger till nya block

      for (let i = latestBlock; i >= startBlock; i--) {
        try {
          const block = await this.client.getBlock(i);
          const transactions = await this.getTransactions(block.transactions);
          this.displayBlock(block, transactions);
        } catch (blockError) {
          console.error(`Fel vid hämtning av block #${i}:`, blockError);
        }
      }
    } catch (error) {
      console.error('Fel vid hämtning av senaste blocknumret:', error);
    }
  }

  // Hämta detaljer om varje transaktion i blocket
  async getTransactions(transactionHashes) {
    const transactions = [];
    for (const hash of transactionHashes) {
      try {
        const tx = await this.client.getTransaction(hash);
        transactions.push(tx);
      } catch (error) {
        console.error(`Fel vid hämtning av transaktion ${hash}:`, error);
      }
    }
    return transactions;
  }

  // Visa blockinformation samt transaktionsdetaljer
  displayBlock(block, transactions) {
    const blockDiv = createElement('div');
    blockDiv.classList.add('block-card');

    blockDiv.appendChild(createTextElement('h3', `📦 Block #${block.number}`));
    blockDiv.appendChild(
      createTextElement(
        'p',
        `⏳ Tid: ${new Date(block.timestamp * 1000).toLocaleString()}`
      )
    );
    blockDiv.appendChild(
      createTextElement('p', `🔗 Block Hash: ${block.hash}`)
    );
    blockDiv.appendChild(
      createTextElement('p', `⛽ Gas limit: ${block.gasLimit}`)
    );
    blockDiv.appendChild(
      createTextElement('p', `🔥 Gas used: ${block.gasUsed}`)
    );

    // Visa transaktioner
    if (transactions.length > 0) {
      blockDiv.appendChild(createTextElement('h4', '💸 Transaktioner:'));

      const transactionsList = createElement('ul');
      transactions.forEach((tx) => {
        const txInfo = createElement('li');
        txInfo.innerText = `
        📤 Avsändare: ${tx.from} 
        📥 Mottagare: ${tx.to || 'N/A'} 
        🔗 Transaktionshash: ${tx.hash}`;
        transactionsList.appendChild(txInfo);
      });

      blockDiv.appendChild(transactionsList);
    } else {
      blockDiv.appendChild(
        createTextElement('p', 'Inga transaktioner i detta block.')
      );
    }

    this.blockList.appendChild(blockDiv);
  }
}

// Initiera BlockExplorer när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  new BlockExplorer(10); // Visar de senaste 10 blocken
});
