
$(document).ready(function(){
  $(".section-title, .button-content").each(function() {
		var elText,openSpan = '<span class="first-word">',closeSpan = '</span>';
		elText = $(this).text().split(" ");
		elText.unshift(openSpan);
		elText.splice(2, 0, closeSpan);
		elText = elText.join(" ");
		$(this).html(elText);
		});
});
$(document).ready(function(){
  $(".related-products-title").each(function() {
		var elText,openSpan = '<span class="first-word">',closeSpan = '</span>';
		elText = $(this).text().split(" ");
		elText.unshift(openSpan);
		elText.splice(2, 0, closeSpan);
		elText = elText.join(" ");
		$(this).html(elText);
		});
});
$(document).on("click", '.product-form-inline-atc .quantity-decrement', function(event) {
  var id_product= $(".product-form-inline input[name='id']").val();
  var quantityProduct =$(".quantity-input").attr("value");
  var quantity = parseInt(quantityProduct)-1;
   updateCartJson(id_product, quantity);
});

$(document).on('change', '.quantity-input', function(){
  var idproduct= $(".product-form-inline input[name='id']").val();
  var product_price =$("span[id_products ="+idproduct+"]").text().replace(/[^0-9]/g,'');
  var total = parseInt($(this).val()) * parseFloat(product_price);
  $('.money_detail').html(Shopify.formatMoney(parseFloat(total)));
})

$(document).on("blur", '.cart_product_quantity_item[data-id]', function(event) {
  	var quantity1 =$(this).val();
    var dev = $(this).attr("data-id");
  	$('[data-id='+dev+'].cart_product_quantity_item').attr('value',quantity1);
  	var id_product= $(this).attr("data-id") ;
  updateCartJson(id_product, quantity1);
});
$('document').ready(function(){

      	$('#site-actions-cart').bind("DOMSubtreeModified",function(){
          var gettext =  $('.site-actions-cart-label').text();
          if(gettext == "0"){
          $('#site-actions-cart').removeClass("bigquard").addClass("smallsquard");
          $('.site-actions-cart-label').text(gettext);
          }
          else{
          	$('#site-actions-cart').removeClass("smallsquard").addClass("bigquard");
            $('.site-actions-cart-label').css("display","block").removeClass("smallsquard");
          }

  	 });
  	var windowSize = $(window).width();
  if (windowSize <= 479){
  	$( ".product-images" ).find( ".dot_products" ).insertAfter( $( ".flickity-viewport" ) );
  }
 });
$(document).on("click", '.button_addtocart_detail', function(event) {
   $(window).scrollTop(0);
});

$(document).mouseup(function(e)
{
    var miniCart = $(".product-alert");

    // if the target of the click isn't the container nor a descendant of the container
    if (!miniCart.is(e.target) && miniCart.has(e.target).length === 0)
    {
        miniCart.removeClass("visible");
        clearTimeout(miniCartTO);
    }
});


$(document).on("click", '.push_product', function(event) {
  var id_product= $(this).attr("data-item") ;
  var updateJson = {
        id: id_product,
        quantity: 1
      };
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: updateJson,
        dataType: 'json'
      }).done(function(){
        Shopify.getCart(function(data){
          $('.site-actions-cart-label').html(data.item_count);
          $('.show_products_popup_cart .cart-items').html(renderCartSummary(data.items));
           $('.show_products_popup_cart .cart-total-row-value.money').html(Shopify.formatMoney(data.total_price, data.items.money_format));
        })
      });
});
$(document).on("click", '.minus_product', function(event) {
  var idProduct= $(this).attr("data-item") ;
  var quantityProduct =$(this).next().attr("value");
  var quantity = parseInt(quantityProduct)-1;
  updateCartJson(idProduct, quantity);
});
function renderCartSummary(items){
  var cartContent = '';
  items.forEach(function(product) {
    cartContent = cartContent+ '<div class="cart_product_detail">';
    cartContent = cartContent + '<div class="cart_product_name">'+product.product_title+'</div>';
    cartContent =  cartContent+ '<div  class="cart_product_quantity">'
    cartContent = cartContent + '<label class="minus_product" onblur="changeitem()" data-item='+product.id+'>-</label>';
    cartContent = cartContent + '<input data-id='+product.id+' class="cart_product_quantity_item" value='+product.quantity+'>';
    cartContent = cartContent + '<label class="push_product" onblur="changeitem()" data-item='+product.id+'>+</label>';
    cartContent = cartContent +'</div>';
    cartContent =  cartContent+'<div  class="cart_product_price">'+Shopify.formatMoney(product.price, items.money_format)+'</div>';
    cartContent = cartContent+'</div>';
  });

  return cartContent;
}

// When the user clicks on div, open the popup
function sharingPopupFunction() {
    var sharingPopup = document.getElementById("show-share");
    sharingPopup.classList.toggle("show");
}

function updateCartJson(idProduct, quantity){
   var updateJson = {
        id: idProduct,
        quantity: quantity
      };

      $.ajax({
        type: 'POST',
        url: '/cart/change.js',
        data: updateJson,
        dataType: 'json'
      }).done(function(){
        Shopify.getCart(function(data){
          $('.site-actions-cart-label').html(data.item_count);
          $('.show_products_popup_cart .cart-items').html(renderCartSummary(data.items));
          $('.show_products_popup_cart .cart-total-row-value.money').html(Shopify.formatMoney(data.total_price, data.items.money_format));
        })
      });

}
