import { Block } from './modules/blockchain/block';
import { Blockchain } from './modules/blockchain/blockchain';

const main = (() => {
  console.log('Welcome to Typescript Chain');

  const tsChain = new Blockchain();
  tsChain.addBlock(new Block(1, new Date().getTime(), { amount: 4 }));
  tsChain.addBlock(new Block(2, new Date().getTime(), { amount: 8 }));

  console.log('Blockchain valid? ' + tsChain.isValid());

  console.log('Changing a block...');
  tsChain.chain[1].payload = { amount: 100 };
  console.log("Blockchain valid? " + tsChain.isValid());

})();
