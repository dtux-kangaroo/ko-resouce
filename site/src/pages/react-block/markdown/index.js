import Markdown from '../../../utils/markdown';

import './style.scss';

export default class Button extends Markdown {

  document(locale) {
    return require(`./doc/button.md`);
  }
}
