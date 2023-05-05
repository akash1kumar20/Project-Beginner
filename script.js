async function getDetails (event){
    event.preventDefault();
    let price = event.target.priceDetail.value;
    let dish = event.target.dishDetail.value;
    let quantity = event.target.quantityDetail.value;
    let table = event.target.tableDetail.value;

    let objForValue = {
        price,
        dish,
        quantity,
        table
    }
    // console.log(objForValue);
  
    try{
        let response = await axios.post('https://crudcrud.com/api/adf0ea5e6efe4070ba71b52d7cd26277/tableOrder', objForValue)
        showOnScreen(response.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

//to display everything on the screen, even after refresh.
// window.addEventListener('DOMContentLoaded', async () => {
//     try{
//          let resolve = await axios.get('https://crudcrud.com/api/adf0ea5e6efe4070ba71b52d7cd26277/tableOrder') 
//              // console.log(resolve.data);
//              for(var i=0; i<resolve.data.length; i++){
//                  showOnScreen(resolve.data[i]);
//              }
//     } catch (reject) {
//      console.log(reject)
//     }
    
//  });

    function showOnScreen(objForValue){
    let parent = '';
    if(objForValue.table === 'First'){
    parent = document.getElementById('displayOne');
    }
    if(objForValue.table === 'Second'){
    parent = document.getElementById('displayTwo');
    } 
    if(objForValue.table === 'Third'){
    parent = document.getElementById('displayThree');
    }

    let child = document.createElement('li');
    child.textContent = 'Price: ' + objForValue.price + ' Dish: ' + objForValue.dish + ' Quantity: ' + objForValue.quantity;
    child.style.color = 'rgb(255, 255,255)';
    child.style.fontWeight = 'bolder';

    let btnDel = document.createElement('button');
    btnDel.className = 'btn btn-danger btn-sm ms-2 mb-2'
    btnDel.textContent = 'Delete Order';
    child.appendChild(btnDel);
    parent.appendChild(child);

    btnDel.addEventListener("click", deleteItem);
    async function deleteItem() {
        try{
           let resolve = await axios.delete(`https://crudcrud.com/api/adf0ea5e6efe4070ba71b52d7cd26277/tableOrder/${objForValue._id}`)
           console.log('Element deleted',resolve)
           parent.removeChild(child);
        } catch (reject) {
            console.log('Can not delete element');
        }
    }

    const bill = document.getElementById('billGenerator');
    bill.style.display = 'block';
    const tableSelector = document.getElementById('tableBill');
    tableSelector.onclick = () => {
        const billValue = tableSelector.value;
        console.log(billValue); 
        if(billValue != ''){
        const billBtn = document.getElementById('finalCall');
        billBtn.addEventListener('click', billGeneration);
        async function billGeneration(){
            try { 
            let resolve = await axios.get('https://crudcrud.com/api/adf0ea5e6efe4070ba71b52d7cd26277/tableOrder')
            console.log('a',resolve.data);
            let newArr = [];
            for(var i=0; i<resolve.data.length; i++){
                if(billValue === resolve.data[i].table){
                newArr.push(
                    {
                        for: resolve.data[i].table,
                        count: resolve.data[i].quantity,
                        amo: resolve.data[i].price
                    }
                )
                }
            }
            console.log(newArr);
            let calution = 0;
            for(var i=0; i<newArr.length; i++){
                calution = calution + Math.abs(newArr[i].count * newArr[i].amo)   
            } 
           
            let billView = document.getElementById('displayBill');
            let fortable = document.createElement('div');
            fortable.className = 'text-center';
            fortable.textContent = 'Bill for Table ' + billValue + ' is:'
            billView.appendChild(fortable);
            let forBill = document.createElement('div');
            forBill.className = 'text-center';
            forBill.textContent = 'Total amount to pay ' + calution;
            billView.appendChild(forBill);
            // console.log('Total amount to pay', calution);
        }
        catch (reject) {
            console.log(reject);
        } 
        document.getElementById('anotherBill').addEventListener('click', anotherGeneration);
        async function anotherGeneration(){
            location.reload();
            try{
                let resolve = await axios.delete(`https://crudcrud.com/api/adf0ea5e6efe4070ba71b52d7cd26277/tableOrder/${objForValue._id}`)
                console.log('Element deleted',resolve)
                parent.removeChild(child);
             } catch (reject) {
                 console.log('Can not delete element');
             }
          parent.removeChild(child);
        }
        }
    }
    }

}

