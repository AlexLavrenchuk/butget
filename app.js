// "budget__title--month"

// "budget__value"
// "budget__income--value"
// "budget__expenses--value"

// "add__type"
// "add__description"
// "add__value"
// "add__btn"

// id="income-0"
// "item__description"
// "item__value"
// "item__delete--btn"

// id="expense-0"
// "item__description"
// "item__value"
// "item__percentage"
// "item__delete--btn"


const select = document.querySelector('select');
const inputDescription = document.querySelector('.add__description');
const inputValue = document.querySelector('.add__value');
const form = document.querySelector('.add__container');
const incomeList = document.querySelector('.income__list');
const expensesList = document.querySelector('.expenses__list');
const bottom = document.querySelector('.bottom');

let income = [];
let expenses = [];

const markupIncome = (description, value, index) => {
    return `
    <div class="item clearfix" id="income-${index}">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
        <div class="item__value">+ ${value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `
};

const addMarkupIncome = (description, value) => {
    let plus = {
        description,
        value,
        index: 0
    };

    income.push(plus);
    // for (let i = 0 ; true; ++i) {
    //     let a
    //     income.forEach((el) => {
    //         if (el.index === i) return a = true;
    //     }); 
    //     console.log(a);  
    // }
    // plus.index = income.indexOf(plus);
    
    addMarkupIncomeView(description, value, plus.index);
};

const addMarkupIncomeView = (description, value, index) => {
    let markup = markupIncome(description, value, index);
    incomeList.insertAdjacentHTML('beforeend', markup);
};

//----------

const markupExpenses = (description, value, index) => {
    return `
    <div class="item clearfix" id="expense-${index}">
        <div class="item__description">${description}</div>
        <div class="right clearfix">
            <div class="item__value">- ${value}</div>
            <div class="item__percentage">00%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>
    `
};

const addMarkupExpenses = (description, value) => {
    let minus = {
        description,
        value
    };
    
    minus.index = expenses.push(minus);
    addMarkupExpensesView(description, value, minus.index);
};

const addMarkupExpensesView = (description, value, index) => {
    let markup = markupExpenses(description, value, index);
    expensesList.insertAdjacentHTML('beforeend', markup);
};

//-----------

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (select.value === "income") {
        addMarkupIncome(inputDescription.value, inputValue.value);
        inputDescription.value = "";
        inputValue.value = "";
    }

    if (select.value === 'expense') {
        addMarkupExpenses(inputDescription.value, inputValue.value);
        inputDescription.value = "";
        inputValue.value = "";
    }
});

incomeList.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.parentElement.className === "item__delete--btn") {
        e.path.forEach(element => {
            if (element.id) {
                console.log(element);
                let id = element.id;
                deleteItem(id);
                element.parentElement.removeChild(element);
            }    
        });
    }
});


const deleteItem = (id) => {
    
};