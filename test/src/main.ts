import { readType } from '@tymon/typeReader';

interface hello {
  world: string;
}

type hey = {
  world: number;
};

console.log(readType<hello>());
console.log(readType<hey>());
