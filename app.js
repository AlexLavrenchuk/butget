
const form = document.forms['form'];
const select = document.querySelector('.add__type');
const inputDescription = document.querySelector('.add__description');
const inputValue = document.querySelector('.add__value');
const button = document.querySelector('.add__btn');
const incomeList = document.querySelector('.income__list');
const expensesList = document.querySelector('.expenses__list');
const incomeView = document.querySelector('.budget__income--value');
const expensesView = document.querySelector('.budget__expenses--value');

let incomeArr = [];
let expensesArr = [];
let income = 0;
let expenses = 0;

//---------------

/**
 * @docs addIncome - recording and withdrawal of income
 * @param {string} description 
 * @param {string} value 
 */
const addIncome = (description, value) => {
    let plus = {
        description,
        value
    };

    income += +value
    incomeView.textContent = `+ ${income}`;


    incomeArr.push(plus);    
    addMarkupIncomeView(description, value);
};

/**
 * @dosc addMarkupIncomeView - add to page
 * @param {string} description 
 * @param {string} value 
 */
const addMarkupIncomeView = (description, value) => {
    let markup = markupIncome(description, value);
    incomeList.insertAdjacentHTML('beforeend', markup);
};

/**
 * @docs markupIncome - creating markup with the necessary parameters
 * @param {string} description 
 * @param {string} value 
 */
const markupIncome = (description, value) => {
    return `
    <div class="item clearfix">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
            <div class="item__value">${value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `
};

//----------

/**
 * @docs addExpenses - recording and withdrawing costs
 * @param {string} description 
 * @param {string} value 
 */
const addExpenses = (description, value) => {
    let minus = {
        description,
        value
    };

    expenses += +value
    expensesView.textContent = `- ${expenses}`;
    
    expensesArr.push(minus);
    addMarkupExpensesView(description, value);
};

/**
 * @dosc addMarkupExpensesView - add to page
 * @param {string} description 
 * @param {string} value 
 */
const addMarkupExpensesView = (description, value) => {
    let markup = markupExpenses(description, value);
    expensesList.insertAdjacentHTML('beforeend', markup);
};

/**
 * @docs markupExpenses - creating markup with the necessary parameters
 * @param {string} description 
 * @param {string} value 
 */
const markupExpenses = (description, value) => {
    return `
    <div class="item clearfix">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
            <div class="item__value">${value}</div>
            <div class="item__percentage">${(100 / (income / value)).toFixed(1)}%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    ` 
};

//-----------

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (select.value === "income") {
        addIncome(inputDescription.value, inputValue.value);
        form.reset();
    }

    if (select.value === 'expense') {
        addExpenses(inputDescription.value, inputValue.value);
        form.reset();
    }

    document.querySelector('.budget__value').textContent = income - expenses;
});

/**
 * @docs changeOption - class change when select is changed
 */
const changeOption = (e) => { 
    select.classList.toggle('red-focus');
    inputDescription.classList.toggle('red-focus');
    inputValue.classList.toggle('red-focus');
    button.classList.toggle('red');
};

select.addEventListener("change", changeOption);

//-----------

/**
 * @docs deleteItemIncome - remove from array and variable
 * @param {string} description 
 * @param {string} value 
 */
const deleteItemIncome = (description, value) => {
    income -= +value
    incomeView.textContent = `+ ${income}`;

    let index;
    for (let i = 0; i < incomeArr.length; i++) {
        if (incomeArr[i].description === description && incomeArr[i].value === value) {
            index = i
        }
    }
    incomeArr.splice(index, 1);
};

incomeList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.parentElement.className !== "item__delete--btn") return;

    deleteItemIncome(e.target.closest('.item').firstElementChild.innerHTML,
    e.target.closest('.item').lastElementChild.firstElementChild.innerHTML);

    e.target.closest('.item').parentElement.removeChild(e.target.closest('.item'));

    document.querySelector('.budget__value').textContent = income - expenses;
});

//--------------

/**
 * @docs deleteItemExpenses - remove from array and variable
 * @param {string} description 
 * @param {string} value 
 */
const deleteItemExpenses = (description, value) => {
    expenses -= +value
    expensesView.textContent = `- ${expenses}`;

    let index;
    for (let i = 0; i < expensesArr.length; i++) {
        if (expensesArr[i].description === description && expensesArr[i].value === value) {
            index = i
        }
    }
    expensesArr.splice(index, 1);
};

expensesList.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.parentElement.className !== "item__delete--btn") return;

    deleteItemExpenses(e.target.closest('.item').firstElementChild.innerHTML,
    e.target.closest('.item').lastElementChild.firstElementChild.innerHTML);

    e.target.closest('.item').parentElement.removeChild(e.target.closest('.item'));

    document.querySelector('.budget__value').textContent = income - expenses;
});

//--------------
