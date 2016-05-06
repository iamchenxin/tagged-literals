/*
 * @flow
 */

 type ABC = {
   ab: {
     color: 'bk'|'rd',
     style: 'aa'|'bb'
   },
   cd: 123|678
 };

 function ts():void {
   const a:ABC = {
     ab: {
       color: 'bk',
       style: 'aa'
     },
     cd: 123
   };

   console.log(a);
 }
