/*
 * @flow
 */

const sql = require('./sql');
import type {pgQueryConfig} from './sql';
export type {pgQueryConfig};
module.exports = {
  SQL:sql.SQL,
  inst:sql.inst
};
