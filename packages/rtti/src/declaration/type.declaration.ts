import ts from 'typescript';
import { getDescriptor } from '../descriptor';
import { Rtti } from '../rtti';
import { generateFunctionLocal } from './generateFunctionLocal.util';

export interface rtti {
  type: 'typeDeclaration';
  rtti: Rtti;
}

export const generate = {
  kind: [ts.SyntaxKind.TypeAliasDeclaration],
  fn: generateFn
};

export function generateFn(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.TypeAliasDeclaration,
  typeList: ts.Expression[]
) {
  const expression = factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('typeDeclaration')),
    factory.createGetAccessorDeclaration(
      undefined,
      undefined,
      'rtti',
      [],
      undefined,
      factory.createBlock([factory.createReturnStatement(getDescriptor(type.type, typeChecker, factory, typeList))])
    )
  ]);

  return generateFunctionLocal(factory, typeChecker, expression, type.typeParameters);
}
