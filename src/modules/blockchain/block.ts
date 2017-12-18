import { WordArray } from 'crypto-js';
//import sha256 from 'crypto-js/sha256';
// tslint:disable-next-line:no-require-imports,no-var-requires
const SHA256 = require('crypto-js/sha256');

export interface IBlock {
    index: number;
    prevHash: string;
    timestamp: number;
    nonce: number;
    payload: {};
    //txs: Transaction[]
    hash: string;
}

export class Block implements IBlock {
    public prevHash: string;
    public hash: string;
    public index: number;
    public timestamp: number;
    public nonce: number = 0;
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
     *
     * In this case we use the <nonce> to change the hash of our block
     */
    public genHash(): string {

        return SHA256(`
            ${this.index}
            ${this.prevHash}
            ${this.timestamp}
            ${JSON.stringify(this.payload) + this.nonce}
        `).toString();
    }

    // public static fromJson(data) {
    //     const block: IBlock = new Block();
    //     block.hash = this.HASH();
    // }
}
