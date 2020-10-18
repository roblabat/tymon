import ts from 'typescript';
import { getDescriptor } from '../descriptor';
import { typeReferencesName } from '../names';
import { Rtti } from './rtti';

export interface rtti {
  type: 'reference';
  rtti: Rtti;
}

export const generate = {
  kind: [ts.SyntaxKind.TypeReference],
  fn: generateFn
};

export function generateFn(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.TypeReferenceNode,
  typeList: ts.Expression[]
) {
  const typeId: number = (type as any).id;

  if (!typeList[typeId]) {
    const symbol = typeChecker.getSymbolAtLocation(type.typeName);
    const descriptor = symbol?.declarations?.[0];
    typeList[typeId] = factory.createNull();
    typeList[typeId] = getDescriptor(descriptor, typeChecker, factory, typeList);
  }

  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('reference')),
    factory.createGetAccessorDeclaration(
      undefined,
      undefined,
      'rtti',
      [],
      undefined,
      factory.createBlock([
        factory.createReturnStatement(
          factory.createElementAccessExpression(factory.createIdentifier(typeReferencesName), typeId)
        )
      ])
    )
  ]);
}
