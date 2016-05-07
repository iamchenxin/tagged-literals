const {SQL, inst} = require('../sql.js');
console.log(SQL);

describe('test SQL tagged template', () => {
  let userId;
  let password;

  beforeEach(() => {
    userId = '001';
    password = '123456';
  });


  it('test empty string', () => {
    expect(SQL``)
    .toEqual({
      text: '',
      values: []
    });
  });

  it('test string with params', () => {
    expect(SQL`select name from user where id=${userId} and password=${password}`)
    .toEqual({
      text: 'select name from user where id=$1 and password=$2',
      values: [userId, password]
    });
  });

  it('test directly insert value [inst]', () => {
    let column = 'name';
    let table = 'admin';
    expect(SQL`select ${inst(column)} from ${inst(table)}
where id=${userId} and password=${password}`)
    .toEqual({
      text: `select "name" from "admin"
where id=$1 and password=$2`,
      values: [userId, password]
    });
  });

});
