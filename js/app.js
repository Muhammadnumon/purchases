'use strict';
const rootEl = document.getElementById('root');
const formEl = document.createElement('form');
formEl.dataset.id = ('purchase-form');
rootEl.appendChild(formEl);

const nameEl = document.createElement('input');
nameEl.dataset.input = ('name');
formEl.appendChild(nameEl);

const priceEl = document.createElement('input');
priceEl.dataset.input = ('price');
priceEl.type = ('number');
formEl.appendChild(priceEl);

const buttonEl = document.createElement('button');
buttonEl.dataset.action = ('add');
buttonEl.textContent = 'Добавить';
formEl.appendChild(buttonEl);

const listEl = document.createElement('ul');
listEl.dataset.id = ('purchases-list');
rootEl.appendChild(listEl);

const totalEl = document.createElement('div');
totalEl.textContent = ('Самая дорогая покупка: ');
rootEl.appendChild(totalEl);

const mostExpensiveEl = document.createElement('span');
mostExpensiveEl.dataset.id = ('most-expensive');
mostExpensiveEl.textContent = '0 с.';
totalEl.appendChild(mostExpensiveEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

let nextId = 1;
let maxPrice=0;
const purchases = [];
formEl.onsubmit = evt => {
    evt.preventDefault();
    errorEl.textContent = '';
    let error = null;
    const name = nameEl.value.trim();
    if (name === '') {
        error = 'Значение не может быть пустым';
        errorEl.textContent = error;
        nameEl.focus();
        return;
    }
    if (priceEl.value <= 0) {
        error = 'Цена должна быть больше нуля';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }
    if (isNaN(priceEl.value)) {
        error = 'Цена должна быть числом';
        errorEl.textContent = error;
        priceEl.focus();
        return;
    }
    
    const purchase = {
        id: nextId++,
        name,
        price:priceEl.value,
    };
    purchases.unshift(purchase);
    formEl.reset();
    nameEl.focus();
    let total = 0;
    
    const rowEl = document.createElement('li');
    rowEl.dataset.purchaseId = purchase.id;
    rowEl.textContent=purchase.name +`на сумму `+purchase.price;
    listEl.insertBefore(rowEl, listEl.firstElementChild);

    const removeEl=document.createElement('button');
    removeEl.dataset.action='remove';
    removeEl.textContent='Удалить';
  
    removeEl.onclick=()=>{
/*let max=purchases.reduce((prev,curr)=>{
if (prev.price>curr.price) {
    return prev.price;
}
return curr.price;
//totalEl.textContent=purchase.name+` kkvk `+max;
});
*/
let most=purchases.reduce((prev,curr,index)=>{
    if (prev>curr.price){
return purchases[index-1].name+prev;
    }
    return purchases[index].name+curr.price;
},0);
mostExpensiveEl.textContent=`${most} с. `;
console.log(most);
listEl.removeChild(rowEl);
    };
  rowEl.appendChild(removeEl);
  

  let max=purchases.reduce((prev,curr)=>{
    if (prev.price>curr.price) {
        return prev.price;
    }
    return curr.price;
    
    },0);
    totalEl.textContent=purchase.name+` kkvk `+`${max}`;









  /*
  if (purchase.price>=maxPrice) {
      maxPrice=purchase.price;
totalEl.textContent=purchase.name+ `на сумму `+purchase.price;
  }
  */
  
    /*  if (purchase.price < 100 && purchase.price >nine) {
        cashback = (purchase.price * (halfOne / 100));
        total = purchases.reduce((prev, curr) => prev + Number(curr.price), 0);
        rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. (кэшбек - ${cashback} с.)`;
        listEl.insertBefore(rowEl, listEl.firstElementChild);
        cashbackTotalEl.textContent = `${(total * (halfOne / 100)).toFixed(two)} с.`;
        
    } else {
        cashback = Math.floor(((purchase.price * 100) * (halfOne/ 100)) / 100);
        total = purchases.reduce((prev, curr) => prev + Number(curr.price), 0);
        rowEl.textContent = `${name} на сумму ${purchase.price} с. (кэшбек - ${cashback} с.)`;
        listEl.insertBefore(rowEl, listEl.firstElementChild);
        cashbackTotalEl.textContent = `${Math.floor(((total * 100) * (halfOne / 100)) / 100)} с.`;
    }
     console.log(cashbackTotalEl.textContent);
    return;
*/

};