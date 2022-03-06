let head = document.createElement('div');
head.setAttribute("class", "head");


let search = document.createElement('input');
search.setAttribute("id", "search");
search.setAttribute("placeholder", "Search for 'Brand','Product Name','Category'...");
head.append(search);
document.body.append(head);

parabutton = document.createElement('p');

let button = document.createElement('button');
button.addEventListener("click", foo);
button.setAttribute("id", "button");
button.innerHTML = "submit";

parabutton.append(button);
head.append(parabutton);
document.body.append(head);

let h2 = document.createElement('h2');
h2.innerHTML = `Product Details!`;
document.body.append(h2);

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
                

                let para = document.createElement("p");
                para.setAttribute("class", "para");
                para.innerHTML = `<u>Search Result Position</u>: ${i}/930`;

                let p = document.createElement("div");
                p.setAttribute("class", "box");

                let div = document.createElement('div');
                div.setAttribute("class", "main");
                div.innerHTML = `<b>Brand:</b> "${data[i].brand}" <br><b>Name:</b> "${data[i].name}"</br>`;
                p.append(div);
                document.body.append(p);

                let div1 = document.createElement('div');
                div1.setAttribute("class", "main1");
                div1.innerHTML = `<b>Price:</b> "${data[i].price}"`;
                p.append(div1);
                document.body.append(p);

                let div2 = document.createElement('div');
                div2.setAttribute("class", "main2");
                div2.innerHTML = `<b>Image link:</b> <a href="${data[i].image_link}" target="_blank">"${data[i].image_link}"</a> 
                <br><b>Product link:</b> <a href="${data[i].product_link} target="_blank">"${data[i].product_link}"</a></br>`;
                p.append(div2);
                document.body.append(p);

                let div3 = document.createElement('div');
                div3.setAttribute("class", "main3");
                div3.innerHTML = `<b>Description:</b> "${data[i].description}"`;
                p.append(div3);
                para.append(p);
                document.body.append(para);


                //console.log(`Brand: ${data[i].brand} and Name: ${data[i].name}`);
                // console.log(`Price: ${data[i].price}`);
                // console.log(`${data[i].image_link} and Product link: ${data[i].product_link}`);
                //console.log(`Description: ${data[i].description}`);
            }
        }
        if (flag == 0) {
            let nodata = document.createElement('p');
            nodata.innerHTML = "Please enter valid product name!"
            nodata.setAttribute("class", "nodata");
            para.append(nodata);
            document.body.append(para);
            //alert("Please enter valid product name!");

        }
    }
    catch (error) {
        console.log(Error);
    }
}

