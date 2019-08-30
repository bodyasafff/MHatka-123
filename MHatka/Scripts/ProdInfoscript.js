var idProduct = 0;
var massPrice;
var massBasket = [];

$(document).ready(function () {
    findGetParameter();
    GetProduct();
    CreateMenu();
});

function findGetParameter() {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            result = decodeURIComponent(tmp[1]);
        });
    idProduct = parseInt(result);
}

function GetProduct() {
    $.ajax({
        url: "/Product/GetProduct?id=" + idProduct,
        method: "GET",
        success: function (data) {
            console.log(data);
            $.each(data.Images, function (index, value) {
                $("#massPhoto").append($('<img>')
                    .attr('src', '/Image/' + value)
                    .attr('style', 'width: 65vh; height: 80vh;')
                    .attr('tabindex', '0')
                    .attr('alt', ''))

                //< img src = "images/asset-6.png" style = "width: 80vh; height: 98vh;" tabindex = "0" alt = "" />
            })
            $("#txtDescription").append(data.Description)
            $("#prodName").append(data.Name);
            massPrice = data.MapSizeers;
            $("#prodPrice").append(data.MapSizeers[0].Prices);
            $.each(massPrice, function (index, value) {
                $('#select-superpower').append($('<option>').attr('value', '').append(value.Sizes));
            })
            Bob();
        },
        error: function (error) {
            console.log(error);
        }
    })
};
function CreateMenu() {
    $.ajax({
        url: "/Product/GetMenu",
        method: "GET",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {

                $('#menu').append($('<div>')
                    .attr('class', 'item')
                    .attr('id', data[i].Id)
                    .append($('<a>')
                        .attr('href', '#' + data[i].Id)
                        .attr('class', 'btn')
                        .append(data[i].Name))
                    .append($('<div>')
                        .attr('class', 'smenu')
                        .attr('Id', 'data' + data[i].Id)
                    )
                )



                $.each(data[i].Groups, function (index, value) {
                    $('#data' + data[i].Id).append($('<button>')
                        .attr('value', value.Id)
                        .attr('Id', data[i].Id)
                        .append(value.Name)
                    )
                })
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
};

$('#menu').on('click', 'button', function () {
    window.location = "Products?productId=" + this.value;
});
function Bob() {
    /* ===== Logic for creating fake Select Boxes ===== */
    $('.sel').each(function () {
        $(this).children('select').css('display', 'none');

        var $current = $(this);

        $(this).find('option').each(function (i) {
            if (i === 0) {
                $current.prepend($('<div>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box')
                }));

                var placeholder = $(this).text();
                $current.prepend($('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                    text: placeholder,
                    'data-placeholder': placeholder,
                    'id': "selectSpan"
                }));

                return;
            }

            $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                text: $(this).text()
            }));
        });
    });

    // Toggling the `.active` state on the `.sel`.
    $('.sel').click(function () {
        $(this).toggleClass('active');
    });

    // Toggling the `.selected` state on the options.
    $('.sel__box__options').click(function () {
        var txt = $(this).text();
        var index = $(this).index();

        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
    });

    //=============carousel==js==css==============

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-46156385-1', 'cssscript.com');
    ga('send', 'pageview');
    $('#selectSpan').on('DOMSubtreeModified', function () {
        if ($('#selectSpan').text() != "") {
            $.each(massPrice, function (index, value) {
                if ($('#selectSpan').text() == value.Sizes) {
                    $("#prodPrice").empty();
                    $("#prodPrice").append(value.Prices);
                }
            })
        }
    })
}
$("#addToBasket").click(function () {
    if ($('#selectSpan').text() != "Виберіть розмір") {

       
        if (window.sessionStorage.getItem("MassItemToBasket") != null) {
            if (JSON.parse(window.sessionStorage.getItem("MassItemToBasket")).length == undefined) {
                massBasket.length = 0;
                massBasket.push(JSON.parse(window.sessionStorage.getItem("MassItemToBasket")));
                if (massBasket[0].idProd != idProduct || massBasket[0].SetSize != $('#selectSpan').text()) {
                    window.sessionStorage.clear("MassItemToBasket");
                    massBasket.push({ idProd: idProduct, SetSize: $('#selectSpan').text() });
                    window.sessionStorage.setItem("MassItemToBasket", JSON.stringify(massBasket));
                }
            }

            else {
                massBasket = JSON.parse(window.sessionStorage.getItem("MassItemToBasket"));
                if (massBasket.find(element => element.idProd == idProduct && element.SetSize == $('#selectSpan').text()) == undefined) {
                    window.sessionStorage.clear("MassItemToBasket");
                    massBasket.push({ idProd: idProduct, SetSize: $('#selectSpan').text() });
                    window.sessionStorage.setItem("MassItemToBasket", JSON.stringify(massBasket));
                }
            }
        }
        else {
            window.sessionStorage.setItem("MassItemToBasket", JSON.stringify({ idProd: idProduct, SetSize: $('#selectSpan').text() }));
        }

    }
    else {
        alert("Виберіть розмір");
    }

})
