

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
                            <a  > 
                            <img class="card-img-top img-fluid" style="width: 260px; height:178px" src=${image} alt="..." />
                            </a>
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
                        search.item += 1;
                    }
                    basket = basket.filter((x)=>x.id !==undefined);
                    
                    localStorage.setItem ("data" , JSON.stringify(basket));
                    document.getElementById("cartNumber").innerHTML = basket.length;
                    // console.log(basket.length)

                    
                }
            addToCart();
         

           