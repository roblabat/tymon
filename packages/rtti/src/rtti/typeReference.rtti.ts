import ts from 'typescript';
import { getDeclarationDescriptor, getDescriptor } from '../descriptor';
import { localTypeReferencesName, typeReferencesName } from '../names';
import { Rtti } from '../rtti';

export interface rtti {
  type: 'typeReference';
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
  const symbol = typeChecker.getSymbolAtLocation(type.typeName);

  if (symbol) {
    const typeId: number = (symbol as any)?.id;

    if (!typeList[typeId]) {
      const declaration = symbol?.declarations?.[0];

      if (declaration?.kind === ts.SyntaxKind.TypeParameter) {
        return accessArray(factory, localTypeReferencesName, typeId);
      }

      typeList[typeId] = factory.createNull();
      typeList[typeId] = getDeclarationDescriptor(declaration, typeChecker, factory, typeList);
    }

    return access(factory, typeChecker, type, typeList, typeReferencesName, typeId);
  }

  throw new Error('symbol not found');
}

function access(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.TypeReferenceNode,
  typeList: ts.Expression[],
  listName: string,
  typeId: number
) {
  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('typeReference')),
    factory.createGetAccessorDeclaration(
      undefined,
      undefined,
      'rtti',
      [],
      undefined,
      factory.createBlock([
        factory.createReturnStatement(
          factory.createCallExpression(
            factory.createElementAccessExpression(factory.createIdentifier(listName), typeId),
            undefined,
            [
              factory.createArrayLiteralExpression(
                type.typeArguments?.map(arg => getDescriptor(arg, typeChecker, factory, typeList))
              ),
              factory.createIdentifier(localTypeReferencesName)
            ]
          )
        )
      ])
    )
  ]);
}

function accessArray(factory: ts.NodeFactory, listName: string, typeId: number) {
  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('typeReference')),
    factory.createGetAccessorDeclaration(
      undefined,
      undefined,
      'rtti',
      [],
      undefined,
      factory.createBlock([
        factory.createReturnStatement(factory.createElementAccessExpression(factory.createIdentifier(listName), typeId))
      ])
    )
  ]);
}
