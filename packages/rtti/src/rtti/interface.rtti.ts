import ts from 'typescript';
import { getDescriptor } from '../descriptor';
import { generate as generateAny } from './any.rtti';
import { Rtti } from './rtti';

export interface rtti {
  type: 'interface';
  properties: {
    key: string;
    isOptional: boolean;
    rtti: Rtti;
  }[];
}

export const generate = {
  kind: [ts.SyntaxKind.InterfaceDeclaration],
  fn: generateFn
};

export function generateFn(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.InterfaceDeclaration,
  typeList: ts.Expression[]
) {
  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('interface')),
    factory.createPropertyAssignment(
      'properties',
      factory.createArrayLiteralExpression(
        type.members.map(prop => {
          if (prop.name) {
            return factory.createObjectLiteralExpression([
              factory.createPropertyAssignment('key', factory.createStringLiteral(prop.name.getText())),
              factory.createPropertyAssignment(
                'isOptional',
                prop.questionToken ? factory.createTrue() : factory.createFalse()
              ),
              factory.createPropertyAssignment(
                'rtti',
                (prop as ts.PropertySignature).type
                  ? getDescriptor((prop as ts.PropertySignature).type, typeChecker, factory, typeList)
                  : generateAny.fn(factory, typeChecker, undefined, typeList)
              )
            ]);
          }

          throw '';
        })
      )
    )
  ]);
}
