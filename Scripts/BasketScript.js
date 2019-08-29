var massBasket = [];
var MassId = [];
var MassSendProd = [];
var temp;
var totalPrice = 0;
$(document).ready(function () {
    if (window.sessionStorage.key("MassItemToBasket")) {
        if (JSON.parse(window.sessionStorage.getItem("MassItemToBasket")).length == undefined) {
            massBasket.push(JSON.parse(window.sessionStorage.getItem("MassItemToBasket")));
            MassId.push("" + massBasket[0].idProd);
        }
        else {
            massBasket = JSON.parse(window.sessionStorage.getItem("MassItemToBasket"));
            for (var i = 0; i < massBasket.length; i++) {
                MassId.push("" + massBasket[i].idProd);
            }
        }
        CreateMenu()
    }
})

function SendMessage() {
    $.ajax({
        url: "/Product/SendMail",
        method: "POST",
        dataType: "json",
        data: {
            Id: massBasket,
            name: document.getElementById("txtName").value,
            phone: document.getElementById("txtPhone").value,
            city: document.getElementById("txtCity").value,
            deliveryMethod: document.getElementById("selDeliveryMethod").value
        },
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function CreateMenu() {
    $.ajax({
        url: "/Product/GetBasketProduct?id=" + MassId,
        method: "GET",
        success: function (data) {
            let count;

            $('#totalItem').append(data.length);
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].MapSizeers.length; j++) {
                    if (data[i].MapSizeers[j].Sizes == massBasket[i].SetSize) {
                        temp = data[i].MapSizeers[j].Prices;
                    }
                }
                totalPrice = totalPrice + temp;

                $('#Basket').append($('<div>')
                    .attr('class', 'basket-product')
                    .append($('<div>')
                        .attr('class', 'item')
                        .append($('<div>')
                            .attr('class', 'product-image')
                            .append($('<img>')
                                .attr('src', 'img/asset-6.png')
                                .attr('style', 'width: 18vh;height: 24vh;')
                                .attr('alt', 'Image 2')
                                .attr('class', 'product-frame')))
                        .append($('<div>')
                            .attr('class', 'product-details')
                            .append($('<h1>')
                                .append($('<strong>')
                                    .append(data[i].Name)))
                            .append($('<p>').
                                append(data[i].Description))
                            .append($('<p>')
                                .append($('<strong>')
                                    .append("Product Code - " + data[i].Article)))))
                    .append($('<div>')
                        .attr('id', data[i].Id)
                        .attr('class', 'subtotal')
                        .append(massBasket[i].SetSize))
                    .append($('<div>')
                        .attr('class', 'quantity'))
                    .append($('<div>')
                        .attr('class', 'price')
                        .append(temp))
                    .append($('<div>')
                        .attr('class', 'remove')
                        .append($('<button>')
                            .append("Видалити замовлення"))))

            }
            $('#basket-total').append(totalPrice);
            $('.quantity input').change(function () {
                updateQuantity(this);
            });
            $('.remove button').click(function () {
                count = $('#totalItem').text();
                count = count - 1;
                $('#totalItem').text(count);
                removeItem(this);
            });
        },
        error: function (error) {
            console.log(error);
        }
    })
};
$("#SendEmail").click(function () {
    //alert("qwe");

    if (window.sessionStorage.getItem("MassItemToBasket") != null && document.getElementById("txtPhone").value != "") {
        {
            swal("Ваше замовлення прийняте!", "Очікуйте дзвінка", "success").then((value) => {
                window.location = "../mainwindow/index.html";
            });
            SendMessage();
            window.sessionStorage.clear("MassItemToBasket");
        }
    }
    else {
        if (document.getElementById("txtPhone").value == "") {
            swal("Введіть номер телефону");

        }
        else {
            swal("Ваша корзина пуста");
        }

    }
    //
})




var fadeTime = 300;





//$(document).ready(function () {
//    updateSumItems();
//});



///* Recalculate cart */
//function recalculateCart(onlyTotal) {
//    var subtotal = 0;

//    /* Sum up row totals */
//    $('.basket-product').each(function () {
//        subtotal += parseFloat($(this).children('.price').text());
//    });

//    /* Calculate totals */
//    var total = subtotal;



//    /*If switch for update only total, update only total display*/
//    if (onlyTotal) {
//        /* Update total display */
//        $('.total-value').fadeOut(fadeTime, function () {
//            $('#basket-total').html(total.toFixed(2));
//            $('.total-value').fadeIn(fadeTime);
//        });
//    } else {
//        /* Update summary display. */
//        $('.final-value').fadeOut(fadeTime, function () {
//            $('#basket-subtotal').html(subtotal.toFixed(2));
//            $('#basket-total').html(total.toFixed(2));
//            if (total == 0) {
//                $('.checkout-cta').fadeOut(fadeTime);
//            } else {
//                $('.checkout-cta').fadeIn(fadeTime);
//            }
//            $('.final-value').fadeIn(fadeTime);
//        });
//    }
//}

/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });

    productRow.find('.item-quantity').text(quantity);
    updateSumItems();
}

//function updateSumItems() {
//    var sumItems = 0;
//    $('.quantity input').each(function () {
//        sumItems += parseInt($(this).val());
//    });
//    $('.total-items').text(sumItems);
//}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    let FullPric = $('#basket-total').text();
    let delPrice = productRow.children()[3].innerHTML;
    $('#basket-total').text(FullPric - delPrice);
    let IdProduct = productRow.children()[1].id;
    let Size = productRow.children()[1].innerHTML;
    Delte(IdProduct, Size);
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        //recalculateCart();
        //updateSumItems();
    });
}
function Delte(Idprod, size) {
    if (window.sessionStorage.key("MassItemToBasket")) {
        if (JSON.parse(window.sessionStorage.getItem("MassItemToBasket")).length == undefined) {
            window.sessionStorage.removeItem("MassItemToBasket");
        }

        else {
            massBasket = JSON.parse(window.sessionStorage.getItem("MassItemToBasket"));
            massBasket = jQuery.grep(massBasket, function (value) {
                if (value.idProd != Idprod || value.SetSize != size) {
                    return value;
                }
            })
            window.sessionStorage.clear("MassItemToBasket");
            window.sessionStorage.setItem("MassItemToBasket", JSON.stringify(massBasket));
        }
    }
}