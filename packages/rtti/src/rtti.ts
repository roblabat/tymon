import { rtti as interfaceDeclaration } from './declaration/interface.declaration';
import { rtti as typeDeclaration } from './declaration/type.declaration';
import { rtti as anyRtti } from './rtti/any.rtti';
import { rtti as booleanRtti } from './rtti/boolean.rtti';
import { rtti as numberRtti } from './rtti/number.rtti';
import { rtti as stringRtti } from './rtti/string.rtti';
import { rtti as typeRtti } from './rtti/type.rtti';
import { rtti as typeReferenceRtti } from './rtti/typeReference.rtti';

export type Rtti =
  | booleanRtti
  | numberRtti
  | stringRtti
  | typeDeclaration
  | typeReferenceRtti
  | interfaceDeclaration
  | anyRtti
  | typeRtti;
