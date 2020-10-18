import ts from 'typescript';
import { typeReferencesName } from './names';

export function createGenerateFunction(factory: ts.NodeFactory, type: ts.Expression, typeReferences: ts.Expression[]) {
  return factory.createArrowFunction(
    undefined,
    undefined,
    [],
    undefined,
    undefined,
    factory.createBlock([
      factory.createVariableStatement(undefined, [
        factory.createVariableDeclaration(
          typeReferencesName,
          undefined,
          undefined,
          convertToLiteralObject(factory, typeReferences)
        )
      ]),
      factory.createReturnStatement(type)
    ])
  );
}

function convertToLiteralObject(factory: ts.NodeFactory, array: ts.Expression[]) {
  const list: ts.PropertyAssignment[] = [];

  array.forEach((item, index) => {
    list.push(factory.createPropertyAssignment(index.toString(), item));
  });

  return factory.createObjectLiteralExpression(list);
}
