import ts from 'typescript';

export interface rtti {
  type: 'number';
}

export const generate = {
  kind: [ts.SyntaxKind.PropertySignature],
  fn: generateFn
};

export function generateFn(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.PropertySignature | undefined,
  typeList: ts.Expression[]
) {
  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('number'))
  ]);
}
