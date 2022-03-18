let content = document.createElement('main');
content.setAttribute("class", "main");



let head = document.createElement('header');
head.setAttribute("class", "head");

let search = document.createElement('input');
search.setAttribute("id", "search");
search.setAttribute("placeholder", "Search for 'Brand','Product Name','Category'...");
head.appendChild(search);
document.body.appendChild(head);

parabutton = document.createElement('p');

let button = document.createElement('button');
button.addEventListener("click", foo);
button.setAttribute("id", "button");
button.innerHTML = "Search";

parabutton.append(button);
head.append(parabutton);
document.body.append(head);

content.append(head);
document.body.append(content);




let container = document.createElement("div");
container.setAttribute("class", "grid-container");

async function foo() {

    try {
        let products = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        let data = await products.json();
        console.log(data);

        let user_input = document.getElementById("search").value;
        let flag = 0;


        for (var i = 0; i < data.length; i++) {

            if (user_input == data[i].brand || user_input == data[i].name || user_input == data[i].category) {
                flag = 1;

                let join = document.createElement("div");
                join.setAttribute("class", "join");

                let div = document.createElement('div');
                div.setAttribute("class", "part");
                div.innerHTML = `<b>Brand:</b> "${data[i].brand}" <br><b>Name:</b> "${data[i].name}"</br>`;
                join.appendChild(div);
                document.body.append(join);

                let div1 = document.createElement('div');
                div1.setAttribute("class", "part1");
                div1.innerHTML = `<b>Price:</b> "${data[i].price}"`;
                join.appendChild(div1);
                document.body.append(join);

                let div2 = document.createElement('div');
                div2.setAttribute("class", "part2");
                div2.innerHTML = `<b>Image link:</b> <a href="${data[i].image_link}" target="_blank">"Product Image"</a> 
                <br><b>Product link:</b> <a href="${data[i].product_link} target="_blank">"${data[i].product_link}"</a></br>`;
                join.appendChild(div2);
                document.body.append(join);

                let div3 = document.createElement('div');
                div3.setAttribute("class", "part3");
                div3.innerHTML = `<b>Description:</b> "${data[i].description}"`;
                join.appendChild(div3);
                document.body.append(join);

                let para = document.createElement("p");
                para.setAttribute("class", "para");
                para.innerHTML = `<u>Search Result Position</u>: ${i}/930`;
                join.appendChild(para);

                container.appendChild(join);
                content.appendChild(container);
                document.body.append(content);

            }
        }
        if (flag == 0) {
            let nodata = document.createElement('p');
            nodata.innerHTML = "Please enter valid product name!"
            nodata.setAttribute("class", "nodata");
            content.appendChild(nodata);
            document.body.append(content);

        }
    }
    catch (error) {
        console.log(Error);
    }
}
