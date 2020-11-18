import { readFileSync } from 'fs';

export default () => ({
  abi: JSON.parse(readFileSync('./env/Contract.abi', 'utf-8'))
});
