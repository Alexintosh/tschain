import {last} from 'lodash';
import { Block, IBlock } from './block';
import { GENESIS_BLOCK } from './genesisBlock';

export class Blockchain {
    public chain: Block[];

    constructor() {
        this.chain = [GENESIS_BLOCK()];
    }

    public getLastBlock(): IBlock {
        return last(this.chain);
    }

    public addBlock(newBlock: Block): void {
        newBlock.prevHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.genHash();
        this.chain.push(newBlock);
    }

    public isValid() {
        // tslint:disable-next-line:no-increment-decrement
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.genHash()) {
                return false;
            }

            if (currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
