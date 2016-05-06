/*
 * @flow
 */

declare module 'es6-literals' {
  declare type InsertValue = {
    value: string
  };

  declare type sqlResult = {
    text:string,
    values:mixed[]
  };

  declare function inst(value:string):InsertValue;

  declare function SQL(strs:string[], ...args:mixed[]): sqlResult;
}
