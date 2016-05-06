'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


function SQL_LITERALS_ERROR(value) {
  this.value = value;
  this.message = 'the value inserted to SQL must be string,\n    but it is ' + value;
  this.toString = function () {
    return this.message;
  };
}

function InsertValue(value) {
  this.value = value;
}

function inst(value) {
  if (typeof value !== 'string') {
    throw new SQL_LITERALS_ERROR(value);
  }
  if (value[0] !== '"') {
    value = '"' + value + '"'; // auto double quoted,to void
  }
  return new InsertValue(value);
}

//for postgres sql
function SQL(strs) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var values = [];
  var text = strs.reduce(function (prev, curr, i) {
    var arg = args[i - 1];
    if (arg instanceof InsertValue) {
      return prev + arg.value + curr;
    } else {
      values.push(arg);
      return prev + '$' + values.length + curr;
    }
  });

  return {
    text: text,
    values: values
  };
}

exports.inst = inst;
exports.SQL = SQL;
//# sourceMappingURL=sql.js.map
