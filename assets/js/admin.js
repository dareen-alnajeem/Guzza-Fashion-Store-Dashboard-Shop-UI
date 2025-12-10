let productForm = document.querySelector(".productForm");
let productTableBody = document.querySelector(".productTable tbody");

// تعريف المصفوفة مرة واحدة
let products = JSON.parse(localStorage.getItem("products")) || [];

// create product
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newProduct = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        category: document.getElementById("category").value,
        image: document.getElementById("image").value,
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    productForm.reset();
});

// delete product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// edit product
function editProduct(index) {
    let product = products[index];
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("image").value = product.image;
    deleteProduct(index);
}

// display products
function displayProducts() {
    productTableBody.innerHTML = "";
    products.forEach((product, index) => {
        productTableBody.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td><img src="${product.image}" width="50"></td>
            <td>
                <button onclick="deleteProduct(${index})">delete</button>
                <button onclick="editProduct(${index})">edit</button>
            </td>
        </tr>`;
    });
}

displayProducts();