export default class View {
  constructor($element) {
    this.$element = $element;
  }

  show() {
    this.$element.hidden = false;
  }

  hide() {
    this.$element.hidden = true;
  }

  on(event, handler) {
    return this.$element.addEventListener(event, handler);
  }
}
