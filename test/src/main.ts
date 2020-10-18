import { generateRtti } from '@tymon/rtti';
import { Rtti } from '@tymon/rtti/dist/rtti/rtti';

interface a {
  world: string;
}

type b = {
  world: number;
};

interface c {
  a: a;
  b: b;
  c: {
    hey: number[];
    date: Date;
    bool: boolean;
    array: Array<string>;
  };
}

enum d {
  hello,
  world
}

type e = 'hello' | 'world';

enum f {
  hello = 'hello',
  world = 'world'
}

type g = [number, string];

interface h<T> {
  key: T;
}

interface i<T> {
  [key: string]: T;
}

interface j {
  circular: k;
}

interface k {
  ref: j;
}

console.log(log(generateRtti<a>()));
// console.log(generateRtti<b>());
// console.log(generateRtti<c>());
// console.log(generateRtti<d>());
// console.log(generateRtti<e>());
// console.log(generateRtti<f>());
// console.log(generateRtti<g>());
// console.log(generateRtti<h<string>>());
// console.log(generateRtti<i<any>>());
console.log(log(generateRtti<j>()));
console.log(log(generateRtti<k>()));

console.log('babel');

function log(rtti: Rtti, dep = 0) {
  if (rtti) {
    let str = "{ type: '" + rtti.type + "'";

    if (rtti.type === 'reference') {
      str += ', getRtti(): ' + (dep < 3 ? log(rtti.rtti, dep + 1) : '[Function]');
    } else if (rtti.type === 'interface') {
      str +=
        ', properties: [' +
        rtti.properties.map(
          prop => "{ key: '" + prop.key + "', isOptional: " + prop.isOptional + ', rtti:' + log(prop.rtti, dep) + '}, '
        ) +
        ']';
    }

    return str;
  }
}
