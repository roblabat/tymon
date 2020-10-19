import ts from 'typescript';
import { getDescriptor } from '../descriptor';
import { Rtti } from '../rtti';
import { generate as generateAny } from '../rtti/any.rtti';
import { generateFunctionLocal } from './generateFunctionLocal.util';

export interface rtti {
  type: 'interfaceDeclaration';
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
  const expression = factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('interfaceDeclaration')),
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

  return generateFunctionLocal(factory, typeChecker, expression, type.typeParameters);
}
