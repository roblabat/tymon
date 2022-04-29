import { generateRtti, Rtti } from '@tymon/rtti';

interface a {
  world: string;
}

type b = {
  world?: number;
};

interface c {
  a: a;
  b: b;
  c: {
    hey: number[];
    date: Date;
    bool: boolean;
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

console.log('a: ', log(generateRtti<a>()));
console.log('b: ', log(generateRtti<b>()));
// console.log('c: ', log(generateRtti<c>()));
// console.log('d: ', log(generateRtti<d>()));
// console.log('e: ', log(generateRtti<e>()));
// console.log('f: ', log(generateRtti<f>()));
// console.log('g: ', log(generateRtti<g>()));
console.log('h: ', log(generateRtti<h<h<string>>>()));
// console.log('i: ', log(generateRtti<i<any>>()));
console.log('j: ', log(generateRtti<j>()));
console.log('k: ', log(generateRtti<k>()));

function log(rtti: Rtti, dep = 0) {
  if (rtti) {
    let str = "{ type: '" + rtti.type + "'";

    if (rtti.type === 'typeReference' || rtti.type === 'typeDeclaration') {
      str += ', rtti: ' + (dep < 10 ? log(rtti.rtti, dep + 1) : '[Function]');
    } else if (rtti.type === 'interfaceDeclaration' || rtti.type === 'type') {
      str +=
        ', properties: [' +
        rtti.properties.map(
          prop => "{ key: '" + prop.key + "', isOptional: " + prop.isOptional + ', rtti:' + log(prop.rtti, dep) + '}, '
        ) +
        ']';
    }

    str += ' }';

    return str;
  }
}

const test = {
  type: 'typeReference',
  rtti: {
    type: 'interfaceDeclaration',
    properties: [
      {
        key: 'circular',
        isOptional: false,
        rtti: {
          type: 'typeReference',
          rtti: {
            type: 'interfaceDeclaration',
            properties: [
              {
                key: 'ref',
                isOptional: false,
                rtti: {
                  type: 'typeReference',
                  rtti: {
                    type: 'interfaceDeclaration',
                    properties: [
                      {
                        key: 'circular',
                        isOptional: false,
                        rtti: {
                          type: 'typeReference',
                          rtti: {
                            type: 'interfaceDeclaration',
                            properties: [
                              {
                                key: 'ref',
                                isOptional: false,
                                rtti: {
                                  type: 'typeReference',
                                  rtti: {
                                    type: 'interfaceDeclaration',
                                    properties: [
                                      {
                                        key: 'circular',
                                        isOptional: false,
                                        rtti: {
                                          type: 'typeReference',
                                          rtti: {
                                            type: 'interfaceDeclaration',
                                            properties: [
                                              {
                                                key: 'ref',
                                                isOptional: false,
                                                rtti: {
                                                  type: 'typeReference',
                                                  rtti: {
                                                    type: 'interfaceDeclaration',
                                                    properties: [
                                                      {
                                                        key: 'circular',
                                                        isOptional: false,
                                                        rtti: {
                                                          type: 'typeReference',
                                                          rtti: {
                                                            type: 'interfaceDeclaration',
                                                            properties: [
                                                              {
                                                                key: 'ref',
                                                                isOptional: false,
                                                                rtti: {
                                                                  type: 'typeReference',
                                                                  rtti: {
                                                                    type: 'interfaceDeclaration',
                                                                    properties: [
                                                                      {
                                                                        key: 'circular',
                                                                        isOptional: false,
                                                                        rtti: {
                                                                          type: 'typeReference',
                                                                          rtti: {
                                                                            type: 'interfaceDeclaration',
                                                                            properties: [
                                                                              {
                                                                                key: 'ref',
                                                                                isOptional: false,
                                                                                rtti: {
                                                                                  type: 'typeReference',
                                                                                  rtti: [Function]
                                                                                }
                                                                              }
                                                                            ]
                                                                          }
                                                                        }
                                                                      }
                                                                    ]
                                                                  }
                                                                }
                                                              }
                                                            ]
                                                          }
                                                        }
                                                      }
                                                    ]
                                                  }
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
};
