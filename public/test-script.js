const script = document.createElement("script");
script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
script.type = "text/javascript";
script.onreadystatechange = handler;
script.onload = handler;
document.getElementsByTagName("head")[0].appendChild(script);

function handler() {

const body = $('body'); // save our body in a body variable

body.css({
    'position': 'relative'
}) // our app is gonna be fixed relative to the body

const shop = Shopify.shop; // save our shop in the object Shopify

const makeApp = products => { 

    const bestSellerContainer = $( // is gonna contain all products we have
        `<div style="overflow-y: scroll;">
            <h3>Our Best Sellers</h3>
            ${products.map(item => { // map through our items and apply the same tags to all of them
                return `
                <a href="/products/${item.handle}" style="display: flex; align-items: center; padding: 20px 10px; border-top: 1px solid black;">
                    <img src=${item.images[0].originalSrc} style="width: 75px;" />
                    <div style="display: flex; justify-content: space-between; align-items: start; width: 100%;">
                        <p style="padding: 0 10px;">${item.title}</p>
                        <p>${item.variants[0].price}</p>
                    </div>
                </a>
                `
            }).join('') // when we iterate over items in JS, it puts them in objects, separated by a comma. With this we join this arrays of objects together.
        }
        </div>`
    )
    .css({
        'position': 'fixed', // position relative to the body of the page
        'background-color': '#ffffff', // white
        'padding': '10px',
        'border': '1px solid black',
        'bottom': '80px',
        'right': '25px',
        'height': '400px',
        'width': '350px',
        'display': 'none' // we will only activate this container when the bestSellerButton is clicked
    })

    const bestSellerButton = $('<img />').attr('src', 'https://cdn.shopify.com/s/files/1/0325/3174/2765/files/bestseller-button-trans.png?v=1584741923')
        .css({
            'position': 'fixed',
            'width': '150px',
            'bottom': '20px',
            'right': '20px',
            'cursor': 'pointer'
        })

        // we append both container and button to our body container
        body.append(bestSellerButton);
        body.append(bestSellerContainer);

        //on click, the button will open the bestSellerContainer
        bestSellerButton.click(() => {
            bestSellerContainer.slideToggle();
        })
}

fetch(
  `https://cors-anywhere.herokuapp.com/https://facd1e2e89c5.ngrok.io/api/products?shop=${shop}`
)
  .then((res) => res.json())
  .then((data) => {
    makeApp(data.data);
    console.log(data);
  })
  .catch((error) => console.log(error));
}