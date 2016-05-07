/*
 * @flow
 */

declare module 'tagged-literals' {
  declare type InsertValue = {
    value: string
  };

  declare type pgQueryConfig = {
    text:string,
    values:mixed[]
  };

  declare function inst(value:string):InsertValue;

  declare function SQL(strs:string[], ...args:mixed[]):pgQueryConfig;
}
