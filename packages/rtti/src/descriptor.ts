import ts from 'typescript';
import * as generateDeclarationFunctions from './declaration/generate';
import * as generateFunctions from './rtti/generate';

export function getDescriptor(
  type: ts.Node | undefined,
  typeChecker: ts.TypeChecker,
  factory: ts.NodeFactory,
  typeList: ts.Expression[] = []
): ts.Expression {
  if (!type) {
    return ts.createLiteral('unknown');
  }

  const generate = Object.values(generateFunctions).find(gen => gen.kind.includes(type.kind));

  if (generate) {
    return generate.fn(factory, typeChecker, type as any, typeList);
  }

  throw new Error('Unknown type ' + ts.SyntaxKind[type.kind]);
}

export function getDeclarationDescriptor(
  type: ts.Node | undefined,
  typeChecker: ts.TypeChecker,
  factory: ts.NodeFactory,
  typeList: ts.Expression[] = []
): ts.Expression {
  if (!type) {
    return ts.createLiteral('unknown');
  }

  const generate = Object.values(generateDeclarationFunctions).find(gen => gen.kind.includes(type.kind));

  if (generate) {
    return generate.fn(factory, typeChecker, type as any, typeList);
  }

  throw new Error('Unknown type ' + ts.SyntaxKind[type.kind]);
}
