import { $, $All } from "../utils/DOM.js";
import View from "./View.js";

export default class ModalView extends View {
  constructor($element) {
    console.log("ModalView constructor");
    super($element);
  }

  reset() {
    this.hide();
  }
}
