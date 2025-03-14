const $mortgageForm = document.querySelector(".mortgage-calculator");

const $mortgageAmount = document.getElementById("mortgage-amount");
const $mortgageCurrency = document.getElementById("mortgage-currency");
const $mortgageTerm = document.getElementById("mortgage-term");
const $interestRate = document.getElementById("interest-rate");
const $mortgageTypeRadios = document.getElementsByName("mortgage-type");

const $clearAllButton = document.querySelector(
  ".mortgage-calculator__clear-all-button"
);

const $resultsInstructions = document.querySelector(
  ".results-instructions-wrapper"
);
const $resultsResults = document.querySelector(".results-results");

const $monthlyRepaymentsPrice = document.getElementById(
  "monthly-repayments-price"
);
const $totalRepaymentsPrice = document.getElementById("total-repayments-price");

const $mortgageAmountWrapper = document.querySelector(
  ".input-mega-wrapper:has(#mortgage-amount)"
);
const $mortgageTermWrapper = document.querySelector(
  ".input-mega-wrapper:has(#mortgage-term)"
);
const $mortgageRateWrapper = document.querySelector(
  ".input-mega-wrapper:has(#interest-rate)"
);
const $mortgageTypeWrapper = document.querySelector(
  ".input-mega-wrapper:has(.radio-input-wrapper-container)"
);

// console.log($mortgageForm);

// console.log($mortgageAmount);
// console.log($mortgageCurrency);
// console.log($mortgageTerm);
// console.log($interestRate);
// console.log($mortgageTypeRadios);

// console.log($clearAllButton);

// console.log($resultsInstructions);
// console.log($resultsResults);

// console.log($monthlyRepaymentsPrice);
// console.log($totalRepaymentsPrice);

// console.log($mortgageAmountWrapper);
// console.log($mortgageTermWrapper);
// console.log($mortgageRateWrapper);
// console.log($mortgageTypeWrapper);

let currency;

function resetPage() {
  $resultsInstructions.classList.remove("hidden");
  $resultsResults.classList.add("hidden");

  $mortgageAmountWrapper.classList.remove("error");
  $mortgageTermWrapper.classList.remove("error");
  $mortgageRateWrapper.classList.remove("error");
  $mortgageTypeWrapper.classList.remove("error");
}

$mortgageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  currency = $mortgageCurrency.value;
  const mortgageAmount = $mortgageAmount.value;
  const mortgageTerm = $mortgageTerm.value;
  const interestRate = $interestRate.value;
  const mortgageType = $mortgageTypeRadios[0].checked
    ? $mortgageTypeRadios[0].value
    : $mortgageTypeRadios[1].checked
    ? $mortgageTypeRadios[1].value
    : "";

  resetPage();

  let error = false;

  if (mortgageAmount === "") {
    error = true;
    $mortgageAmountWrapper.classList.add("error");
  }

  if (mortgageTerm === "") {
    error = true;
    $mortgageTermWrapper.classList.add("error");
  }

  if (interestRate === "") {
    error = true;
    $mortgageRateWrapper.classList.add("error");
  }

  if (mortgageType === "") {
    error = true;
    $mortgageTypeWrapper.classList.add("error");
  }

  if (error) {
    return;
  }

  let totalRepayments;
  let monthlyRepayments;

  if (mortgageType === "repayment") {
    totalRepayments = mortgageAmount * (1 + interestRate / 100) ** mortgageTerm;
    monthlyRepayments = totalRepayments / (mortgageTerm * 12);
  } else if (mortgageType === "interest") {
    totalRepayments =
      mortgageAmount * (1 + interestRate / 100) ** mortgageTerm -
      mortgageAmount;
    monthlyRepayments = totalRepayments / (mortgageTerm * 12);
  }

  $resultsInstructions.classList.add("hidden");
  $resultsResults.classList.remove("hidden");

  $monthlyRepaymentsPrice.textContent =
    currency + monthlyRepayments.toLocaleString("en-EN");
  $totalRepaymentsPrice.textContent =
    currency + totalRepayments.toLocaleString("en-EN");
});

$clearAllButton.addEventListener("click", (event) => {
  event.preventDefault();

  resetPage();

  $mortgageAmount.value = "";
  $mortgageTerm.value = "";
  $interestRate.value = "";
  $mortgageTypeRadios[0].checked = false;
  $mortgageTypeRadios[1].checked = false;
});
