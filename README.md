## Usage

On Desmos, go to your desired graph and open the developer console by pressing `ctrl+shift+i`. Then just copy the code below or from the `main.ts` source file into the console. If you're in need of a latex [template](https://github.com/SpicyRicecaker/autohtml_node/blob/master/pages/src/tex.tex)

```javascript
(() => {
  // Get list of all cells using the Desmos API
  const exps = Calc.getState().expressions.list;

  class DesmosLatex {
    output = '';

    beginEnvStatement = '\\begin{align*}';

    endEnvStatement = '\\end{align*}';

    constructor() {
      this.beginEnv();
    }

    get getOutput() {
      return this.output;
    }

    append(newString) {
      this.output += `${newString}\n`;
    }

    appendSameLine(newString) {
      this.output += newString;
    }

    beginEnv() {
      this.append(this.beginEnvStatement);
    }

    endEnv() {
      this.append(this.endEnvStatement);
    }

    section(newString) {
      this.output += `\\section{${newString}}`;
    }

    static alignEquals(newString) {
      // Replace `=` with `&=` and add `\\` to the end of the line,
      // `replace` instead of `replaceAll` since we don't want to align multiple `=`s in one line
      return `${newString.replace(/=/, '&=')}\\\\`;
    }

    static createIntertext(newString) {
      let temp = newString;
      temp = DesmosLatex.updateInlineExpressions(temp);
      return `\\intertext{${temp}}`;
    }

    static createSection(newString) {
      return `\\section{${newString}}`;
    }

    static updateInlineExpressions(newString) {
      return newString.replaceAll(/\$([^$]*)\$/g, '\\($1\\)');
    }
  }

  const dL = new DesmosLatex();

  // Loop through list of expressions
  exps.forEach((exp) => {
    switch (exp.type) {
      // If it is an equation
      case 'expression': {
        // Make sure it's not empty
        if ('latex' in exps) {
          dL.append(DesmosLatex.alignEquals(exps.latex));
        } else {
          // Otherwise treat the linebreak as a new align environment
          // TODO
          dL.endEnv();
          dL.beginEnv();
        }
        break;
      }
      // If it's just regular old text
      case 'text': {
        // Replace `$$` with `\(\)` as it's more accurate
        dL.append(DesmosLatex.createIntertext(exps.text));
        break;
      }
      // If it's a folder
      case 'folder': {
        // End our current align environment and add a section
        dL.endEnv();
        dL.append(DesmosLatex.createSection(exps.title));
        dL.beginEnv();
        break;
      }
      default: {
        break;
      }
    }
  });
  dL.endEnv();

  try {
    // Only works in developer console
    // Try copying result to clipboard
    // eslint-disable-next-line no-undef
    copy(dL.getOutput);
    console.log('You can now paste into your `.tex` file');
  } catch (e) {
    // Otherwise just log the result
    console.log(dL.getOutput);
  }
})();
```