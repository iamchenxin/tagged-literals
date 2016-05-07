/*
 *@flow
 */
type pgQueryConfig = {
  text:string,
  values:mixed[]
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

function inst(value:string):InsertValue {
  if (typeof value !== 'string') {
    throw new SQL_LITERALS_ERROR(value);
  }
  if (value[0]!=='"') {
    value = `"${value}"`; // auto double quoted,to void
  }
  return new InsertValue(value);
}

//for postgres sql
function SQL(strs:string[], ...args:mixed[]):pgQueryConfig {
  const values =[];
  const text = strs.reduce((prev, curr, i) => {
    const arg = args[i-1];
    if (arg instanceof InsertValue) {
      return prev+arg.value+curr;
    } else {
      values.push(arg);
      return prev+'$'+values.length+curr;
    }
  });

  return {
    text:text,
    values: values
  };
}

export {
  inst,
  SQL
};
