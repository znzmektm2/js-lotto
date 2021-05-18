import { $ } from "../utils/DOM.js";
import View from "./View.js";

export default class PurchasedLottosView extends View {
  constructor($element) {
    super($element);
    this.$switchInput = $("#switchInput");
    this.$lottoNumberLists = $(".lottoNumberLists");
    this.$total = $("#total");
    this.toggleSwitch();
  }

  toggleSwitch() {
    this.$switchInput.addEventListener("click", () => {
      this.viewLottosNumbers(this.$switchInput.checked);
    });
  }

  reset() {
    this.hide();
    this.$total.innerText = "0";
    this.$lottoNumberLists.innerText = "";
    this.$switchInput.checked = false;
    this.$lottoNumberLists.classList.remove("showLottoNumbers");
  }

  viewLottosNumbers(isChecked) {
    isChecked === true
      ? this.$lottoNumberLists.classList.add("showLottoNumbers")
      : this.$lottoNumberLists.classList.remove("showLottoNumbers");
  }

  renderLottoLists(lottos) {
    const lottoLists = lottos
      ?.map(
        (lotto) =>
          `<li>
            <span class="icon">🎟️</span>
            <span class="lottoNumbers"
              ><span>${[...lotto.values()].join(", ")}</span></span
            >
          </li>`
      )
      .join("");

    this.$total.innerText = lottos.length;
    this.$lottoNumberLists.innerHTML = lottoLists;
  }
}
