import { Block } from './block';

export const GENESIS_BLOCK = () => {
    return new Block(0, 1513609312000, {message: 'Genesis Block'}, '0');
};
