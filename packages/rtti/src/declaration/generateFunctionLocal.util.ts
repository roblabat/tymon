import ts from 'typescript';
import { localTypeReferencesName } from '../names';

export function generateFunctionLocal(
  factory: ts.NodeFactory,
  typeChecker: ts.TypeChecker,
  expression: ts.Expression,
  typeParams?: ts.NodeArray<ts.TypeParameterDeclaration>
) {
  const keysDefinition = factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    [
      factory.createVariableDeclaration(
        'keys',
        undefined,
        undefined,
        factory.createArrayLiteralExpression(
          typeParams?.map(type =>
            factory.createNumericLiteral((typeChecker.getSymbolAtLocation(type.name) as any).id)
          ) ?? []
        )
      )
    ]
  );

  const typesDefinition = factory.createVariableStatement(undefined, [
    factory.createVariableDeclaration('types', undefined, undefined, factory.createObjectLiteralExpression([]))
  ]);

  const typesFillStatements = factory.createIfStatement(
    factory.createIdentifier('typeParams'),
    factory.createExpressionStatement(
      factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier('typeParams'), 'map'),
        undefined,
        [
          factory.createArrowFunction(
            undefined,
            undefined,
            [
              factory.createParameterDeclaration(undefined, undefined, undefined, 'type'),
              factory.createParameterDeclaration(undefined, undefined, undefined, 'index')
            ],
            undefined,
            undefined,
            factory.createBlock([
              factory.createIfStatement(
                factory.createElementAccessExpression(
                  factory.createIdentifier('keys'),
                  factory.createIdentifier('index')
                ),
                factory.createExpressionStatement(
                  factory.createAssignment(
                    factory.createElementAccessExpression(
                      factory.createIdentifier('types'),
                      factory.createElementAccessExpression(
                        factory.createIdentifier('keys'),
                        factory.createIdentifier('index')
                      )
                    ),
                    factory.createIdentifier('type')
                  )
                )
              )
            ])
          )
        ]
      )
    )
  );

  const paramsDefinition = factory.createVariableStatement(
    [factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    [
      factory.createVariableDeclaration(
        localTypeReferencesName,
        undefined,
        undefined,
        factory.createObjectLiteralExpression([
          factory.createSpreadAssignment(factory.createIdentifier('localTypeParams')),
          factory.createSpreadAssignment(factory.createIdentifier('types'))
        ])
      )
    ]
  );

  return factory.createArrowFunction(
    undefined,
    undefined,
    [
      factory.createParameterDeclaration(undefined, undefined, undefined, 'typeParams'),
      factory.createParameterDeclaration(undefined, undefined, undefined, 'localTypeParams')
    ],
    undefined,
    undefined,
    factory.createBlock([
      keysDefinition,
      typesDefinition,
      typesFillStatements,
      paramsDefinition,
      factory.createReturnStatement(expression)
    ])
  );
}
