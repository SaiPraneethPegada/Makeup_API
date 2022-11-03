let navBar = document.createElement("main");
navBar.setAttribute("class", "main");

let nav = document.createElement("header");
nav.setAttribute("class", "head");

let searchInput = document.createElement("input");
searchInput.setAttribute("id", "search");
searchInput.setAttribute("placeholder", "Search for 'Product Name','Brand'...");
nav.appendChild(searchInput);
document.body.append(nav);

let button = document.createElement("button");
button.addEventListener("click", search);
button.setAttribute("class", "btn btn-info mb-2");
button.innerHTML = "Search";
nav.appendChild(button);
document.body.appendChild(nav);

navBar.appendChild(nav);
document.body.append(navBar);

let container = document.createElement("div");
container.setAttribute("class", "grid-container");
container.setAttribute("id", "main_container");

navBar.appendChild(container);
document.body.append(navBar);

let spinner = document.createElement("div");
spinner.setAttribute("id", "spinner");
spinner.setAttribute("hidden", true);

document.body.append(spinner);

const url = "https://makeup-api.herokuapp.com/api/v1/products.json";

async function getData() {
  spinner.removeAttribute("hidden");
  main_container.innerHTML = "";
  let response = await fetch(`${url}`);
  //   console.log(response);
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    alert(message);
    // throw new Error(message);
  }
  let products = await response.json();
  //   console.log(data);
  spinner.setAttribute("hidden", "");
  // let limit_products = data.slice(0, 10);
  products.map((product) => {
    displayData(product);
  });
}
getData();

const displayData = (obj) => {
  main_container.innerHTML += `<div class="card mb-3 rounded-3 px-5 pt-3" >
    <h3 class="title text-center"><span>${obj.name}</span></h3>
    <p><b>Brand:</b> ${obj.brand}</p>
    <p><b>Price:</b> $${obj.price}</p>
    <p class="text-wrap"><b>Image URL:</b> <a href="${obj.image_link}" target="_blank" >${obj.image_link}</a></p>
    <p class="text-wrap"><b>Product URL:</b> <a href="${obj.product_link}" target="_blank" >${obj.product_link}</a></p>
    <p><b>Description:</b> ${obj.description}</p>
    </div>`;
};

async function search() {
  main_container.innerHTML = "";
  spinner.removeAttribute("hidden");
  let searchTerm = document.querySelector("input").value.toLowerCase();
  // console.log(searchTerm);
  const response = await fetch(`${url}`);
  const products = await response.json();
  spinner.setAttribute("hidden", "");

  if (searchTerm !== "") {
    for (obj of products) {
      let name = obj.name;
      let brand = obj.brand;
      if (
        name.toLowerCase().includes(searchTerm) ||
        brand.toLowerCase().includes(searchTerm)
      ) {
        displayData(obj);
      }
    }
  } else {
    products.map((product) => {
      displayData(product);
    });
  }
}
