/*
 * @flow
 */

declare module 'tagged-literals' {
  // -- sql.js ---
  declare type InsertValue = {
    value: string
  };

  declare type pgQueryConfig = {
    text:string,
    values:mixed[],
    name?:string
  };

  declare function inst(value:string):InsertValue;

  declare function SQL(strs:string[], ...args:mixed[]):pgQueryConfig;
}
