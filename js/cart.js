let basket = JSON.parse(localStorage.getItem("data")) || [];
let shoppingCart = document.getElementById("shoppingCart");
let cartEmpty = document.getElementById("cartEmpty");
let summary = document.getElementById("summary");

 

// const calculation =()=>
//             {   
//             console.log
//             (
//                 basket.map((x)=>x.price).reduce((acc,curr)=> acc + curr, 0)
//             ) 
//             }
//             calculation ()  ;
                // getting data from json file

                let generateCartItems =()=>{
                    // fetch('../data.json')
                    fetch('https://fakestoreapi.com/products')
                    .then(res=>res.json())
                    .then(data=>
                        {
                           
                           if (basket.length !==0){
                                return (shoppingCart.innerHTML= basket.map((x)=>{
                                    let {id,item} =x;
                                    let search = data.find((y)=> y.id ===id) ||[];
                                    document.getElementById("items-quantity").innerHTML= `${basket.length}  items`;
                                    return `
                                    <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src=${search.image}></div>
                                    <div class="col">
                                        <div class="row text-muted">${search.category}</div>
                                        <div class="row">${search.title}</div>
                                        <div class="row text-danger">$${search.price}</div>
                                    </div>
                                    <div class="col">
                                        <a> <button onClick ="decreament(${id})" class="border-light">-</button></a>
                                        <a id=${id} class="border">${item}</a>
                                        <a > <button onClick ="increament(${id})"  class="border-light">+</button></a>
                                    
                                    </div>
                                    <div class="col">&dollar; ${(item * search.price).toFixed(2)} 
                                    <a><span onClick = "removeItem(${id})" class="close">&#10005;</span></a> </div>
                                 </div>
                                   `
                                }).join(""))
                           
                                }
                                else{
                                  
                                    cartEmpty.innerHTML = `
                                    <div class="col-md-8 cart"> 
                                    <div class="row border-top border-bottom">
                                        <div class="row main align-items-center">
                                        <div class="col"><h4><b>Your Cart is empty</b></h4></div>
                                        </div>
                                    </div>
                                    <div class="back-to-shop"><a href="./index.html">&leftarrow;</a><span class="text-muted">Back to shop</span></div>
                                </div>
                                     `
                                }
                        })
                          
                }    
           
                generateCartItems();
                const increament  = (id)=>{
                   

                    let search = basket.find((x) => x.id===id)
                   
                    if (search === undefined)
                    {
                        basket.push({
                        id : id,
                        item : 1
                    })
                    
                    }
                    else {
                        search.item += 1;
                        console.log(search.item)
                    }
                    // basket = basket.filter((x)=>x.id !==undefined);
                    update (id);
                    generateCartItems();
                    totalAmount();
                    localStorage.setItem ("data" , JSON.stringify(basket));
                    
                }
                const decreament = (id)=>{
                    let search = basket.find((x) => x.id===id)
                   
                    if (search.item === 0)
                    return;
                    else {
                        search.item -= 1;
                        console.log(search.item)
                    }
                
                    
                    update (id);
                    basket =basket.filter((x) => x.item!=0)
                    generateCartItems();
                    totalAmount();
                    localStorage.setItem ("data" , JSON.stringify(basket));
                }
            
                const update = (id)=>{
                    let search = basket.find((x) => x.id===id)
                    document.getElementById(id).innerHTML = search.item;
                    
                }
                

               const removeItem = (id) =>{
                basket = basket.filter((x) => x.id!==id)
                generateCartItems();
                totalAmount();
                localStorage.setItem ("data" , JSON.stringify(basket));
                }

                
                     // getting data from json file


        const totalAmount = () =>{
            // fetch('../data.json')
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>
                {
                    
                    if(basket.length !==0){
                       let amount = basket
                       .map((x)=>{
                            let {id,item} =x;
                            let search = data.find((y)=> y.id ===id) ||[];
                            // console.log(item)
                            return item * search.price
                      
                        }).reduce((x,y)=>x+y,0);
                        // console.log(amount)

                        summary.innerHTML= `
                        <div><h5><b>Summary</b></h5></div>
                <hr>
                <div class="row">
                    <div id="item-quantity" class="col" style="padding-left:0;">ITEMS ${basket.length}</div>
                    <div class="col text-right">&dollar; ${amount.toFixed(2)}</div>
                </div>
                <form>
                    <p>SHIPPING</p>
                    <select><option class="text-muted">Standard-Delivery- &dollar;5.00</option></select>
                    <p>GIVE CODE</p>
                    <input id="code" placeholder="Enter your code">
                </form>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">TOTAL PRICE</div>
                    <div  id="total-price" class="col text-right">&dollar; ${(amount+5).toFixed(2)}</div>
                </div>
                <button class="btn">CHECKOUT</button>
                        `
                        }
                        else return ;
                        
                });
            }
            totalAmount();