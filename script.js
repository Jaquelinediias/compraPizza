
let cart = [];
let modalQt = 1;
let modalKey = 0;

const j = (el)=>document.querySelector(el);
const jd =(el)=>document.querySelectorAll(el);

//  Listagem das pizzas 
pizzaJson.map((item, index)=>{
    let pizzaItem = j('.models .pizza-item').cloneNode(true)

    pizzaItem.setAttribute('data-key',index)
    //preencher as informações em pizzaitem

    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    pizzaItem.querySelector('.pizza-item--price').innerHTML= `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML= item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML= item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;

        modalKey = key

        j('.pizzaBig img').src = pizzaJson[key].img;
        j('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        j('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        j('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        j('.pizzaInfo--size.selected').classList.remove('selected');

        jd('.pizzaInfo--size').forEach((size,sizeIndex)=>{
           
              if(sizeIndex == 2){
                size.classList.add('selected')
              }
            size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex]

        });

        j('.pizzaInfo--qt').innerHTML = modalQt;
        
        
        j('.pizzaWindowArea').style.opacity = 0;
         
        j('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
           j('.pizzaWindowArea').style.opacity = 1;
        }, 200)
         
    })
    

    j('.pizza-area').append(pizzaItem)
});

//Eventos do Modal//

function closeModal() {
    j('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
       j('.pizzaWindowArea').style.display='none'
    },500)

}
jd('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',closeModal,);
})
j('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1) {
        modalQt--;
        j('.pizzaInfo--qt').innerHTML = modalQt;
    }
})
j('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    j('.pizzaInfo--qt').innerHTML = modalQt

})

jd('.pizzaInfo--size').forEach((size,sizeIndex)=>{
           
    size.addEventListener('click', (e)=>{
        j('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })

});
j('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(j('.pizzaInfo--size.selected').getAttribute('data-key'));
    //identificador
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=> item.identifier ==identifier)
    if(key > -1){
        cart[key].qt += modalQt;
    }else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt,
        })
    }
    updateCart()
    closeModal();
});
 j('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0) {
       j('aside').style.left = '0';
    }
});
 j('.menu-closer').addEventListener('click',()=>{
    j('aside').style.left = '100vw';
 })

function updateCart(){
    j('.menu-openner span').innerHTML = cart.length
    if(cart.length > 0){
        j('aside').classList.add('show');
        j('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id== cart[i].id);

            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = j('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }


             let pizzaName = `${pizzaItem.name}(${pizzaSizeName}) `;

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();

            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            j('.cart').append(cartItem);
        }
            
            desconto = subtotal * 0.1;
            total = subtotal - desconto;


            j('.subtotal span:last-child').innerHTML= `R$ ${subtotal.toFixed(2)}`;
            j('.desconto span:last-child').innerHTML= `R$ ${desconto.toFixed(2)}`;
            j('.total span:last-child').innerHTML= `R$ ${total.toFixed(2)}`;
    } else{
        j('aside').classList.remove('show');
        j('aside').style.left = '100vw';
    }
}
