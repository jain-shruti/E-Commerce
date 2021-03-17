window.onload = function(){

//cart box
	const iconShopping = document.querySelector('.cartIcon');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');
	iconShopping.addEventListener("click",function(){
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click",function(){
		cartBox.classList.remove('active');
	});

function CheckBrowser() {
    if ('localStorage' in window && window['localStorage'] !== null) {
        return true;
    } else {
            return false;
    }
}

let cart = [];
const addToCartBtn = document.getElementsByClassName('btn-primary')
for (let i = 0; i < addToCartBtn.length; i++) {
	var button = addToCartBtn[i];
	button.addEventListener('click',function(e){
		if (CheckBrowser()) 
		{
			let item = {
			id: i+1,
			name: e.target.parentElement.children[0].textContent, 
			price: e.target.parentElement.children[1].children[1].textContent,
			qty: 1,
			};
			for (var j = 0; j < cart.length; j++) {
				if(cart[j].name == item.name){
					alert("This item is already present");
					return;
				}
			}
			cart.push(item);
			localStorage.setItem("cart", JSON.stringify(cart));			
		shoppingCart();
		displayItems();		
	}
	else{
		 alert('Cannot save shopping list as your browser does not support HTML 5');
	}
	});
}


// adding data to shopping cart 
	function shoppingCart() {
		const shoppingIcon = document.querySelector('.cartQty');
		var no =0;
		if (JSON.parse(localStorage.getItem('cart')).length >0) {
			no = JSON.parse(localStorage.getItem('cart')).length;
			shoppingIcon.innerHTML = no;
		}
	}

	//adding cartbox data in table
	function displayItems() {
		const cardBoxTable = cartBox.querySelector('table');
		let tableData = '';
		var total = 0;
		if(JSON.parse(localStorage.getItem('cart')) === null){
			tableData += '<tr><td colspan="5">No items found</td></tr>'
		}
		else{			
			tableData += '<tr><th>No.</th><th>Name</th><th>Quantity</th><th>Price</th><th>Action</th></tr>';
			JSON.parse(localStorage.getItem('cart')).map(data=>{
				total += parseFloat(data.price)
				tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.qty+'	</th><th>'+data.price+'</th><th><button class="btn-danger" onclick=Delete(this);>Delete</button></th></tr>';			
			});
			tableData +='<tr><td colspan="5"><div style="float:right"><p>Total <span class="amount"> &#8377;'+Math.round(total*100)/100+'</span></p></div></td></tr>'
			tableData += '<tr><td colspan="5"><div style="text-align: center;"><button class="btn btn-info" onclick = purchase()>Checkout</button></div></td></tr>'
				
		}	
		cardBoxTable.innerHTML = tableData;
	}
	
	


	shoppingCart();
	displayItems();

}