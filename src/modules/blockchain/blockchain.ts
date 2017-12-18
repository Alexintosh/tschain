import {last} from 'lodash';
import { Block } from './block';
import { GENESIS_BLOCK } from './genesisBlock';
import { Miner } from '../miner/miner';

export class Blockchain {
    public chain: Block[];
    public DIFFICULTY: number = 2;

    constructor() {
        this.chain = [GENESIS_BLOCK()];
    }

    public getLastBlock(): Block {
        return last(this.chain);
    }

    public addBlock(newBlock: Block): void {
        newBlock.prevHash = this.getLastBlock().hash;
        const miner = new Miner(this);
        const minedBlock: Block = miner.genNextBlock(newBlock);
        this.chain.push(minedBlock);
    }

    public isValid() {

        // Check if the genesis block is the same
        if (JSON.stringify(this.chain[0]) !== JSON.stringify(GENESIS_BLOCK())) {
            console.error('Genesis blocks aren\'t the same');
            throw new Error('Genesis blocks aren\'t the same');
        }

        // tslint:disable-next-line:no-increment-decrement
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.genHash()) {
                console.error(`Block: ${currentBlock.index} has been compromised`);

                return false;
            }

            if (currentBlock.prevHash !== previousBlock.hash) {
                console.error('Invalid block sequence');

                return false;
            }
        }

        return true;
    }
}
