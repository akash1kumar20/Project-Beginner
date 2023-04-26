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
        let response = await axios.post('https://crudcrud.com/api/556d33aa9eb64c19bca5a198670bd4d8/tableOrder', objForValue)
        showOnScreen(response.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}


window.addEventListener('DOMContentLoaded', async () => {
   try{
        let resolve = await axios.get('https://crudcrud.com/api/556d33aa9eb64c19bca5a198670bd4d8/tableOrder') 
            // console.log(resolve.data);
            for(var i=0; i<resolve.data.length; i++){
                showOnScreen(resolve.data[i]);
            }
   } catch (reject) {
    console.log(reject)
   }
   
});

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
           let resolve = await axios.delete(`https://crudcrud.com/api/556d33aa9eb64c19bca5a198670bd4d8/tableOrder/${objForValue._id}`)
           console.log('Element deleted')
           parent.removeChild(child);
        } catch (reject) {
            console.log('Can not delete element');
        }
    }
}