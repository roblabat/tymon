import { rtti as anyRtti } from './any.rtti';
import { rtti as booleanRtti } from './boolean.rtti';
import { rtti as interfaceRtti } from './interface.rtti';
import { rtti as numberRtti } from './number.rtti';
import { rtti as referenceRtti } from './reference.rtti';
import { rtti as stringRtti } from './string.rtti';

export type Rtti = booleanRtti | numberRtti | stringRtti | referenceRtti | interfaceRtti | anyRtti;
