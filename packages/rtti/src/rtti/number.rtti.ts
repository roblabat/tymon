import ts from 'typescript';

export interface rtti {
  type: 'number';
}

export const generate = {
  kind: [ts.SyntaxKind.NumberKeyword],
  fn: generateFn
};

export function generateFn(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  type: ts.Node | undefined,
  typeList: ts.Expression[]
) {
  return factory.createObjectLiteralExpression([
    factory.createPropertyAssignment('type', factory.createStringLiteral('number'))
  ]);
}
