function myFunction(){
  let selector = document.getElementById("salaryrangeDetail");
  let depVal = document.getElementById('departmentDetail').value;
  let i = selector.selectedIndex;
  if(selector.onchange){
    location.refresh();
  }
  let board = document.getElementById("toDisplay")
  board.style.display = 'block';
  board.innerHTML = 'Sector is '+ depVal + ' & Salary is ' + selector.options[i].text; 
  document.getElementById('buttonCollection').style.visibility = 'visible';
  let changerBtn = document.getElementById('buttonReset');
  changerBtn.onclick = () => {
    let changer = document.getElementById("toDisplay");
    changer.textContent = 'Please fill the value again';
    changer.style.color = 'red';
  
  }
  board.style.color = 'green';
}

async function printDetails(event){
  event.preventDefault();

  let department = event.target.departmentValue.value;
  let salary = event.target.salaryRangeValue.value;

  let objToStore = {
    department,
    salary
  }
  // console.log(objToStore);
  try{
    let resolve = await axios.post('https://crudcrud.com/api/5a481932c36b4113999c11b6267081f6/incomeTax', objToStore)
    // console.log(resolve);
  }catch (reject){
    console.log(reject)
  }

  let obj = {
    0: 'Slab is first & tax to bededucted on your salary is 0%',
    5: 'Slab is second & tax  to be deducted on your salary is 5%',
    10: 'Slab is third & tax to be deducted on your salary is 10%',
    15: 'Slab is fourth & tax to be deducted on your salary is 15%',
    20: 'Slab is fifth & tax to be deducted on your salary is 20%',
    30: 'Slab is sixth & tax to be deducted on your salary is 30%',
  }

  let key = Object.keys(obj);
  let value = Object.values(obj);
  let toShow = '';
  for(var i=0; i<key.length; i++){
    if(key[i] === salary){
      toShow = toShow + value[i];
    }
  }
  // console.log(toShow);
  let parent = document.getElementById('toDisplay2');
  parent.style.visibility = 'visible';
  let child = document.createElement('div');
  child.textContent = toShow;
  parent.appendChild(child);

  let newObj = {
    0: 'Please type your exact salary below 3 Lakhs',
    5: 'Please type your exact salary in b/w 3 to 6 Lakhs',
    10: 'Please type your exact salary in b/w 6 to 9 Lakhs',
    15: 'Please type your exact salary in b/w 9 to 12 Lakhs',
    20: 'Please type your exact salary in b/w 12 to 15 Lakhs',
    30: 'Please type your exact salary above 15 Lakhs',
  }
  
  document.getElementById('toDisplay3').style.visibility = 'visible';
  let newKey = Object.keys(newObj);
  let newVal = Object.values(newObj);
  let pop = '';
  for(var i=0; i<newKey.length; i++){
    if(newKey[i] === salary){
      pop = pop + newVal[i];
    }
  }

  let place = document.getElementById('textDetails');
  place.placeholder = pop;

  let btnRes = document.getElementById('buttonReset');
  btnRes.onclick = () => {
    location.reload();
  }
}

function finalStep(event){ 
  event.preventDefault();
  let salary = event.target.textValue.value;
  let base = 300000;
  let a = 0;
  let b = 0;
  let c = 0;
  let total = 0;
  if(salary <= 300000){
    total = salary;
  }
  if(salary > 300000 && salary <= 600000){
    a = salary - 300000;
    b = a * 0.05;
    c = a - b;
    total = 300000 + c;
  }
  if(salary > 600000 && salary <= 900000){
    a = salary - 600000;
    b = a * .10 + base * 0.05;
    c = a - b;
    total = 600000 + c;
  }
  if(salary > 900000 && salary <= 1200000){
    a = salary - 900000;
    b = a * .15 + base * .10 + base * 0.05;
    c = a - b; 
    total = 900000 + c;
  }
  if(salary > 1200000 && salary <= 1500000){
    a = salary - 1200000;
    b = a * .20 + base * .15 + base * .10 + base * 0.05;
    c = a - b; 
    total = 1200000 + c;
  }
  if(salary > 1500000){
    a = salary - 1500000;
    b = a* .30 + base * .20 + base * .15 + base * .10 + base * 0.05;
    c = a - b;
    total = 1500000 + c;
  }
  // console.log('a',a);
  // console.log('Tax Dedcuted',b);
  // console.log('Amount left',c);
  // console.log('Total salary left',total); 
  let finalPrinter = document.getElementById('toDisplay4');
  finalPrinter.style.visibility = 'visible';
  let div1 = document.createElement('div');
  div1.textContent = 'Salary before deduction is ' + salary;
  finalPrinter.appendChild(div1);
  let div2 = document.createElement('div');
  div2.textContent = 'Tax deducted on your salary is ' + b;
  finalPrinter.appendChild(div2);
  let div3 = document.createElement('div');
  div3.textContent = 'Salary remain after tax deduction is ' + total;
  finalPrinter.appendChild(div3);
  document.getElementById('buttonCollection').innerHTML = 'Calculation based on your detials:';
  document.getElementById('buttonCollection').style.fontWeight = 'bolder';
  document.getElementById('buttonCollection').style.color = 'black';
  document.getElementById('toDisplay5').style.visibility = 'visible';
}
