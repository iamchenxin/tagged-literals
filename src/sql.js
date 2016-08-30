/*
 *@flow
 */
export type pgQueryConfig = {
   text:string,
   values:mixed[],
   name?:string
};

function SQL_LITERALS_ERROR(value) {
  this.value = value;
  this.message = `the value inserted to SQL must be string,
    but it is ${value}`;
  this.toString = function() { return this.message;};
}

function InsertValue(value) {
  this.value = value;
}

// ToDo: should check if value is a legal postgres literal
// R: raw , replace, the words in string, not push to pg.values
function R(value:string):InsertValue {
  if (typeof value !== 'string') {
    throw new SQL_LITERALS_ERROR(value);
  }
  return new InsertValue(value);
}

//for postgres sql
function SQL(strs:string[], ...args:mixed[]):pgQueryConfig {
  const values =[];
  const text = strs.reduce((prev, curr, i) => {
    const arg = args[i-1];
    if (arg instanceof InsertValue) { // if R, just replace words in string
      return prev+arg.value+curr;
    } else {
      values.push(arg); // push to pg {values}
      return prev+'$'+values.length+curr;
    }
  });

  return {
    text:text,
    values: values
  };
}

module.exports = {
  R:R,
  SQL:SQL
};
