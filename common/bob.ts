/* global Calc */
const b = Calc.getState().expressions.list;

let st = '';
for (let i = 0; i < b.length; i += 1) {
  switch (b[i].type) {
    case 'expression': {
      if ('latex' in b[i]) {
        st += `${b[i].latex.replace('=', '&=')}\\\\\n`;
      }
      break;
    }
    case 'text': {
      st += `\\intertext{${b[i].text}}\n`;
      break;
    }
    default: {
      break;
    }
  }
}
console.log(st);
