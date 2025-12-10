// start slider
let currentIndex= 0;
let slides =document.querySelectorAll(".slide");
let dots =document.querySelectorAll(".dot");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

function showSlide(index){
    slides.forEach((slide,i)=>{
        slide.classList.remove("active");
        dots[i].classList.remove("active")
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}
function nextSlide(){
currentIndex++;
if(currentIndex > slides.length-1){
    currentIndex = 0
}

showSlide(currentIndex);

}
function prevSlide(){
    currentIndex--;
    if(currentIndex < 0){
        currentIndex=slides.length -1;
    }
    showSlide(currentIndex);

}
prevBtn.addEventListener("click",prevSlide);
nextBtn.addEventListener("click",nextSlide);

dots.forEach((dot , index)=>{
    dot.addEventListener("click", function(){
        currentIndex = index;
        showSlide(currentIndex);
    })
});
// auto slider
setInterval(function(){ nextSlide();},5000)

////// cards//////
let products =[
    {id: 1, name:"Women Sweater", price:10 ,category:"Women", image:"./assets/img/img6.jpg"},
    {id: 2, name:"Men Jacket", price:30, category:"Men", image:"./assets/img/img7.jpg"},
    {id: 3, name:"Women Jacket",price:40,category:"Women", image:"./assets/img/img8.jpg"},
    {id: 4, name:"Girls Overall",price:20,category:"kids", image:"./assets/img/img9.jpg"},
    {id: 5, name:"Accessories",price:50,category:"Women", image:"./assets/img/img10.jpg"},
    {id: 6, name:"men Sweater",price:10,category:"men", image:"./assets/img/img11.jpg"},
    {id: 7, name:"Women bags",price:29,category:"Women", image:"./assets/img/img12.jpg"},
    {id: 8, name:"Women Scarf",price:300,category:"Women", image:"./assets/img/img13.jpg"},
];
localStorage.setItem("products", JSON.stringify(products));

function displayProducts(productsToDisplay){
let container = document.querySelector(".cards .container")
container.innerHTML="";

productsToDisplay.forEach(product =>{
    let card = document.createElement("div")
    card.classList.add("card");

    card.innerHTML =`<img src="${product.image}" class= img-card>
    <p>${product.name}</p>
    <p>${product.price}</p>
    `
    container.appendChild(card)
});
}
let storedProducts = JSON.parse(localStorage.getItem("products"));
displayProducts(storedProducts);

////// search box//////
const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();

    // فلترة المنتجات حسب الاسم
    const filteredProducts = storedProducts.filter(product => 
        product.name.toLowerCase().includes(searchValue)
    );

    // عرض النتائج
    displayProducts(filteredProducts);
});

////// categories box/////
const categorySelect = document.getElementById("categories-box");

categorySelect.addEventListener("change", function() {
    const selectedCategory = categorySelect.value;

    // إذا اخترنا "All categories" نعرض كل المنتجات
    if (selectedCategory === "All categories") {
        displayProducts(storedProducts);
    } else {
        const filteredByCategory = storedProducts.filter(product => 
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        displayProducts(filteredByCategory);
}
});

////price box  /////
const priceselect = document.getElementById("price-box");

priceselect.addEventListener("change",function(){
    selectPrice = priceselect.value;

    let filteredByprice = storedProducts.filter(product=>{
        if (selectPrice ==="0$-20$")return product.price>=0 && product.price<=20;
        if (selectPrice ==="20$-50$")return product.price>=20 && product.price<=50;
            if (selectPrice ==="50$-100$")return product.price>=50 && product.price<=100;
            if (selectPrice ==="100$-200$")return product.price>=100 && product.price<=200;
                if (selectPrice ==="200$ +")return product.price>200;
    });
        displayProducts(filteredByprice);
});
