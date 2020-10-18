import ts from 'typescript';
import { getDescriptor } from './descriptor';
import { createGenerateFunction } from './generate';

export interface TransformerOptions {}

export function transformer(program: ts.Program, opts?: TransformerOptions) {
  function visitor(ctx: ts.TransformationContext, sf: ts.SourceFile) {
    const typeChecker = program.getTypeChecker();

    const visitor: ts.Visitor = (node: ts.Node) => {
      if (ts.isCallExpression(node) && node.typeArguments && node.expression.getText(sf) == 'generateRtti') {
        const [type] = node.typeArguments;
        const types: ts.Expression[] = [];
        const typeSource = getDescriptor(type, typeChecker, ctx.factory, types);
        return ctx.factory.createCallExpression(createGenerateFunction(ctx.factory, typeSource, types), undefined, []);
      }

      return ts.visitEachChild(node, visitor, ctx);
    };

    return visitor;
  }

  return (ctx: ts.TransformationContext) => {
    return (sf: ts.SourceFile) => {
      return ts.visitNode(sf, visitor(ctx, sf));
    };
  };
}
