

let basket = JSON.parse(localStorage.getItem("data")) || [];
// let basket = [];
// Fetching Data form Api

fetch('https://fakestoreapi.com/products')
        // fetch('../data.json')
            .then(res=>res.json())
            .then(data=>
                {
                    // stop loading
                document.querySelector(".spinner-container").style.display = "none";
                // console.log(json)
                let products = ""
                
                data.map((product)=>{
                    let {id,title,image,price} = product;
                   
                    products += `
                    <div id = product-id-${id} class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 individualCard">
                        <div class="card h-100">
                            <!-- Product image-->
                            <div data-toggle="modal" data-target="#exampleModal" onClick ="productDetail(${id})">
                            <img class="card-img-top img-fluid" style="width: 260px; height:178px" src=${image} alt="..." />
                            </div>
                        
                            <!-- Product details-->
                            <div class="card-body">
                                <div class="text-center">
                                    <!-- Product name-->
                                    <h6 class="fw-bold ">${title}</h6>
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer py-3 px-0 pt-0 border-top-0 bg-transparent d-flex justify-content-between ">
                            
                                    <span class=" p-price mt-auto ms-3 text-center">$${price}</span>
                                    <a class="btn btn-outline-dark mx-3 text-center " href="#">
                                    <i onClick="addToCart(${id})" class="fas fa-shopping-cart"></i>
                                    </a>
                        </div>
                            </div>
                            </div>
                     
                    `
                });
                
                document.getElementById("fetchProducts").innerHTML = products;
                
            }).catch((error)=>{
                console.log(error)
            })
            
            // Searching Project

            const Search = ()=> {
                const searchbox = document.getElementById("search-product").value.toUpperCase(); 
                const storeitems = document.getElementById("product-list"); 
                const product = document.querySelectorAll(".individualCard");
                const pname = storeitems.getElementsByTagName("h6");
                
                
                
                for (var i = 0; i < pname.length; i++) {
                    let match = product[i].getElementsByTagName('h6')[0]
                    if (match){
                        let textValue = match.textContent || match.innerHTML; 
                        if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                            product[i].style.display = "";
                        }
                        else
                        {
                            product[i].style.display = "none";
                            
                        }
                    }
                }
                
                }


                // add to cart items
                
                const addToCart = (id)=>{
                   
                    // console.log("addToCart id is", id)
                    
                    let search = basket.find((x) => x.id===id)
                   
                    if (search === undefined)
                    {
                        basket.push({
                        id : id,
                        item : 1
                    })
                    
                    }
                    else {
                        document.getElementsByClassName('fa-shopping-cart').disabled = true;
                        alert("Already Added ");
                        // search.item += 1;
                    }
                    basket = basket.filter((x)=>x.id !==undefined);
                    
                    localStorage.setItem ("data" , JSON.stringify(basket));
                    document.getElementById("cartNumber").innerHTML = basket.length;
                    // console.log(basket.length)
 
                }
            addToCart();
           let productDetail =(id)=>{
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>
                {     
                    
                    let search = data.find((x) => x.id===id);
                    let modalBody = document.getElementById("modal-body");
                    modalBody.innerHTML = ` 
                    <div class="col-md-12">
                    <img class="card-img-top mb-5 mb-md-0" src=${search.image} alt="..." />
                    <div class="col-md-12">
                    <div class="small mb-1">SKU: BST-${search.id}</div>
                        <h1 class="display-5 fw-bolder">${search.title}</h1>
                        <div class="fs-5 mb-5">
                            <span class="text-decoration-line-through"></span>
                            <span>$${search.price.toFixed(2)}</span>
                            </div>
                            <p class="lead">${search.description}</p>
                            <div class="d-flex">
                            <button onClick="addToCart(${id})" class="btn btn-outline-dark flex-shrink-0" type="button">
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                            </button>
                            </div>
                            </div>
                    </div>`

                    console.log(modalBody)

                    
                   
                })
                        
                  
        }   