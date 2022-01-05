import { Lodash } from "lodash";
import { Handbook } from "Handbook.module";

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  new Handbook({
    as: 1
  });

  return element;
}
  
document.body.appendChild(component());