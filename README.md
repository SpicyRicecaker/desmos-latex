# Desmos-Latex
Feat. automatic conversion from desmos page to full project

## Steps
1. desmos equations
2. clone latex template
3. copy desmos => latex
4. compile latex => pdf
5. upload pdf => gdrive
6. clone HTML template
7. inject desmos url, github latex & html future url, pdf url => html
8. push * => git
9. copy HTML => clipboard
## pre
```javascript
let params = {
  context: "disc-{x}-{some-stuff-here}",
  rootDir: "
  urlDesmos: "https://www.desmos.com/calculator/{0123456789}",
  urlLatex: "https://raw.githubusercontent.com/SpicyRicecaker/lahtml-template/master/example.hbs",
  urlHtml: "https://raw.githubusercontent.com/SpicyRicecaker/lahtml-template/master/example.tex"
}
```

## 1
Manual lol

## 2
```javascript
fetch(urlLatex)
.then(data => fs.writeFile(data, /))
```

## 3
```javascript
import {getTexDesmos} from 'bob'

fetch(urlDesmos)
.then(data => getTexDesmos(data))
.then(data => /*scan for '\begin{align}' then fs.write add there*/)
```

## 4
```javascript
// Call pdflatex on path somehow
```

## 5
