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
          this.displayBlock(block);
        } catch (blockError) {
          console.error(`Fel vid hämtning av block #${i}:`, blockError);
        }
      }
    } catch (error) {
      console.error('Fel vid hämtning av senaste blocknumret:', error);
    }
  }

  displayBlock(block) {
    const blockDiv = createElement('div');
    blockDiv.classList.add('block-card');

    blockDiv.appendChild(createTextElement('h3', `Block #${block.number}`));
    blockDiv.appendChild(
      createTextElement(
        'p',
        `⏳ Tid: ${new Date(block.timestamp * 1000).toLocaleString()}`
      )
    );
    blockDiv.appendChild(createTextElement('p', `🔗 Hash: ${block.hash}`));
    blockDiv.appendChild(
      createTextElement('p', `⛽ Gas limit: ${block.gasLimit}`)
    );
    blockDiv.appendChild(
      createTextElement('p', `🔥 Gas used: ${block.gasUsed}`)
    );

    this.blockList.appendChild(blockDiv);
  }
}

// Initiera BlockExplorer när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
  new BlockExplorer(10); // Visar de senaste 10 blocken
});
