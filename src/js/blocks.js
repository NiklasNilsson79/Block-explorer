import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.5/dist/ethers.min.js';
import { createClient } from '../helpers/explorer.js';
import { createElement, createTextElement } from '../helpers/dom.js';

const blockList = document.querySelector('#block-list');
let client = undefined;

const initApp = () => {
  client = createClient();
  listBlocks();
};

// 🔹 Hämta och visa de senaste blocken
const listBlocks = async () => {
  try {
    const latestBlock = await client.getBlockNumber();
    const numBlocksToShow = 10; // Visa max 10 block
    const startBlock = Math.max(latestBlock - (numBlocksToShow - 1), 0);

    blockList.innerHTML = ''; // Rensa listan innan vi lägger till nya block

    for (let i = latestBlock; i >= startBlock; i--) {
      const block = await client.getBlock(i);

      const blockDiv = createElement('div');
      blockDiv.classList.add('block-card');

      // Lägg till mer relevant information
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

      blockList.appendChild(blockDiv);
    }
  } catch (error) {
    console.error('Fel vid hämtning av block:', error);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
