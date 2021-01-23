## Usage

On Desmos, go to your desired graph and open the developer console by pressing `ctrl+shift+i`. Then just copy the code below or from the `main.ts` source file into the console. If you're in need of a latex [template](https://github.com/SpicyRicecaker/autohtml_node/blob/master/pages/src/tex.tex)

```typescript
const b = Calc.getState().expressions.list;

let st = '\\begin{align*}\n';
for (let i = 0; i < b.length; i += 1) {
  switch (b[i].type) {
    case 'expression': {
      if ('latex' in b[i]) {
        st += `${b[i].latex.replace(/=/, '&=')}\\\\\n`;
      }
      break;
    }

    case 'text': {
      st += `\\intertext{${b[i].text.replaceAll(
        /\$([^$]*)\$/g,
        '\\($1\\)',
      )}}\n`;
      break;
    }
    default: {
      break;
    }
  }
}
st += '\\end{align*}';

try {
  copy(st);
  console.log('Successfully copied to clipboard.');
} catch (e) {
  console.log(st);
}
```