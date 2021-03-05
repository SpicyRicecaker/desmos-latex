// Desmos API can be found @ https://www.desmos.com/api/v1.5/docs/index.html
//
// Get list of all cells using the Desmos API
(() => {
  'use strict';
  const exps = Calc.getState().expressions.list;

  class DesmosLatex {
    output = '';
    _beginEnvStatement = '\\begin{align*}';
    _endEnvStatement = '\\end{align*}';

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
      this.append(this._beginEnvStatement);
    }

    endEnv() {
      this.append(this._endEnvStatement);
    }

    section(newString) {
      this.output += `\\section{${newString}}`;
    }

    static alignEquals(newString) {
      // Replace `=` with `&=` and add `\\` to the end of the line,
      // `replace` instead of `replaceAll` since we don't want to align multiple =s in one line
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
  for (let i = 0; i < exps.length; i += 1) {
    switch (exps[i].type) {
      // If it is an equation
      case 'expression': {
        // Make sure it's not empty
        if ('latex' in exps[i]) {
          dL.append(DesmosLatex.alignEquals(exps[i].latex));
        }
        // Otherwise treat the linebreak as a new align environment
        else {
          // TODO
          dL.endEnv();
          dL.beginEnv();
        }
        break;
      }
      // If it's just regular old text
      case 'text': {
        // Replace `$$` with `\(\)` as it's more accurate
        dL.append(DesmosLatex.createIntertext(exps[i].text));
        break;
      }
      // If it's a folder
      case 'folder': {
        // End our current align environment and add a section
        dL.endEnv();
        dL.append(DesmosLatex.createSection(exps[i].title));
        dL.beginEnv();
      }
      default: {
        break;
      }
    }
  }
  dL.endEnv();

  try {
    // Only works in developer console
    // Try copying result to clipboard
    copy(dL.getOutput);
    console.log('Successfully copied to clipboard.');
  } catch (e) {
    // Otherwise just log the result
    console.log(dL.getOutput);
  }
})();
