import { generateRtti } from '@tymon/typereader';

interface hello {
  world: string;
}

type hey = {
  world: number;
};

console.log(generateRtti<hello>());
// console.log(generateRtti<hey>());

console.log('babel');
