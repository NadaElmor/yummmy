/// <reference types="../@types/jquery" />

export class Contact {
  constructor() {
    //----global
    this.formData = document.querySelector("form");
    this.inputs = document.querySelectorAll("input");
    this.valid1 = 0;
    this.btn = $("#submit");
    //events
    this.formData.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    //event 2
    this.formData.addEventListener("input", () => {
      this.valid();
      if (this.valid1 == 1) {
        this.btn.removeAttr("disabled");
      } else {
        this.btn.attr("disabled", "disabled");
        console.log("invalid");
      }
    });
  }

  //  =============> Validation ===============>
  valid() {
    if (
      this.validationName(this.inputs[0]) &&
      this.validationEmail() &&
      this.validationNumber() &&
      this.validationAge() &&
      this.validationPassword() &&
      this.validationSecondPassword()
    ) {
      this.valid1 = 1;
    } else {
      this.valid1 = 0;
    }
  }
  validationName(inputs) {
    const regexStyle =
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

    if (regexStyle.test(inputs.value)) {
      inputs.classList.add("is-valid");
      inputs.classList.remove("is-invalid");
      return true;
    } else {
      inputs.classList.add("is-invalid");
      inputs.classList.remove("is-valid");

      return false;
    }
  }

  validationEmail() {
    const regexStyle =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexStyle.test(this.inputs[1].value)) {
      this.inputs[1].classList.add("is-valid");
      this.inputs[1].classList.remove("is-invalid");
      return true;
    } else {
      this.inputs[1].classList.add("is-invalid");
      this.inputs[1].classList.remove("is-valid");

      return false;
    }
  }

  validationPassword() {
    const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexStyle.test(this.inputs[4].value)) {
      this.inputs[4].classList.add("is-valid");
      this.inputs[4].classList.remove("is-invalid");
      return true;
    } else {
      this.inputs[4].classList.add("is-invalid");
      this.inputs[4].classList.remove("is-valid");

      return false;
    }
  }

  validationAge() {
    const regexStyle = /^([1-7][0-9]|80)$/;

    if (regexStyle.test(this.inputs[3].value)) {
      this.inputs[3].classList.add("is-valid");
      this.inputs[3].classList.remove("is-invalid");
      return true;
    } else {
      this.inputs[3].classList.add("is-invalid");
      this.inputs[3].classList.remove("is-valid");

      return false;
    }
  }
  validationNumber() {
    const regexStyle = /^01[0-2,5]{1}[0-9]{8}$/;

    if (regexStyle.test(this.inputs[2].value)) {
      this.inputs[2].classList.add("is-valid");
      this.inputs[2].classList.remove("is-invalid");
      return true;
    } else {
      this.inputs[2].classList.add("is-invalid");
      this.inputs[2].classList.remove("is-valid");

      return false;
    }
  }
  validationSecondPassword() {
    if (this.inputs[4].value == this.inputs[5].value) {
      this.inputs[5].classList.add("is-valid");
      this.inputs[5].classList.remove("is-invalid");
      return true;
    } else {
      this.inputs[5].classList.add("is-invalid");
      this.inputs[5].classList.remove("is-valid");

      return false;
    }
  }
}
