const j = (el)=>document.querySelector(el);
const jd =(el)=>document.querySelectorAll(el);


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

        j('.pizzaBig img').src = pizzaJson[key].img;
        j('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        j('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        
        
        j('.pizzaWindowArea').style.opacity = 0;
         
        j('.pizzaWindowArea').style.display = 'flex'
        setTimeout(()=>{
           j('.pizzaWindowArea').style.opacity = 1;
        }, 200)
         
    })
    

    j('.pizza-area').append(pizzaItem)
});