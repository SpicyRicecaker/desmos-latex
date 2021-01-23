// Desmos API can be found @ https://www.desmos.com/api/v1.5/docs/index.html
//
// Get list of all cells using the Desmos API
const b = Calc.getState().expressions.list;

let st = '\\begin{align*}\n';
// Loop through list of expressions
for (let i = 0; i < b.length; i += 1) {
  switch (b[i].type) {
    // If it is an equation
    case 'expression': {
      // Make sure it's not empty
      if ('latex' in b[i]) {
        // Replace `=` with `&=` and add `\\` to the end of the line,
        // `replace` instead of `replaceAll` since we don't want to align multiple =s in one line
        st += `${b[i].latex.replace(/=/, '&=')}\\\\\n`;
      }
      break;
    }
    // If it's just regular old text
    case 'text': {
      // Replace `$$` with `\(\)` as it's more accurate
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
  // Only works in developer console
  // Try copying result to clipboard
  copy(st);
  console.log('Successfully copied to clipboard.');
} catch (e) {
  // Otherwise just log the result
  console.log(st);
}
