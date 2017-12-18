import { WordArray } from 'crypto-js';
//import sha256 from 'crypto-js/sha256';
// tslint:disable-next-line:no-require-imports,no-var-requires
const SHA256 = require('crypto-js/sha256');

export interface IBlock {
    index: number;
    previousHash: string;
    timestamp: number;
    nonce: number;
    //txs: Transaction[]
    hash: string;
}

export class Block {
    public prevHash: string;
    public hash: string;
    public index: number;
    public timestamp: number;
    public payload: {};

    constructor(index: number, timestamp: number, payload: {}, prevHash: string = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.payload = payload;
        this.prevHash = prevHash;
        this.hash = this.genHash();
    }

    /**
     * There are different implementations of the hash algorithm,
     * see: https://en.bitcoin.it/wiki/Hashcash
     */
    public genHash(): string {
        return SHA256(`
            ${this.index}
            ${this.prevHash}
            ${this.timestamp}
            ${JSON.stringify(this.payload)}
        `).toString();
    }

    // public static fromJson(data) {
    //     const block: IBlock = new Block();
    //     block.hash = this.HASH();
    // }
}
