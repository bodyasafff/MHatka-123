var massBtns = [];
var numThisPage = 1;
var numLastPage = 1;
var GroupId = "";
var group = "";
var size = "";
var brend = "";
var material = "";
var typeCloth = "";
var country = "";
var filler = "";
var special = "";


$(document).ready(function () {
    
    if (location.search != "") {

        findGetParameter();
    }
    CreateMenu();
    GetProducts();
})
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
    if (result != null) {
        GroupId = parseInt(result);
        ShowSelect();
    }
}

function GetProducts() {
    $.ajax({
        url: "/Product/GetProducts?numPage=" + numThisPage + "&idgroup=" + GroupId + "&country=" + country + "&material=" + material + "&brend=" + brend + "&typeCloth=" + typeCloth + "&filler=" + filler + "&special=" + special,
        method: "GET",
        success: function (data) {
            $("#pagination").empty();
            massBtns = [];
            var countItemOnPPage = 20;
            let countProducts = data.countProducts;
            var countPage = Math.ceil(countProducts / countItemOnPPage);
            for (var i = 0; i < countPage; i++) {
                var button = document.createElement("button");
                button.value = i + 1;
                button.innerHTML = i + 1;
                massBtns.push(button);
            }

            if (massBtns.length > 7) {
                let f = [];
                for (var j = numThisPage - 1; j > numThisPage - 4; j--) {
                    if (j < 0) {
                        break;
                    }
                    f.push(j);
                }

                f.reverse();
                if (f[f.length - 1] > 3) {
                    $("#pagination").append(massBtns[0]);
                    $("#pagination").append("...");
                }
                for (var j = 0; j < f.length; j++) {

                    $("#pagination").append(massBtns[f[j]]);
                }



                for (var j = numThisPage - 1; j < numThisPage + 2; j++) {
                    if (j == massBtns.length - 1) {
                        $("#pagination").append(massBtns[massBtns.length - 1]);
                        break;
                    }
                    $("#pagination").append(massBtns[j]);
                }

                if (numThisPage - 1 < massBtns.length - 4) {
                    $("#pagination").append("...");
                    $("#pagination").append(massBtns[massBtns.length - 1]);
                }
                chekEnd = 0;
            }
            else {
                if (massBtns.length > 1) {
                    for (var j = 0; j < massBtns.length; j++) {
                        $("#pagination").append(massBtns[j]);
                    }
                }
            }
            if (massBtns.length > 0) {

                massBtns[numLastPage - 1].classList.remove('active');
                massBtns[numThisPage - 1].classList.add('active');
            }
            $("#tableContent tr").remove();
            let listTemp = [];
            for (var i = 0; i < data.products.length; i = i + 4) {

                if (data.products[i + 3] != null) {
                    //        $("#tableContent").append("<tr>" + "<td background =\"http://localhost:63430/Image/" + data.products[i].Image + "\">" + data.products[i].Id + "</td>" + "<td background =\"http://localhost:63430/Image/" + data.products[i + 1].Image + "\">" + data.products[i + 1].Id + "</td>" + "<<td background =\"http://localhost:63430/Image/" + data.products[i + 2].Image + "\">" + data.products[i + 2].Id + "</td>" + "<td background =\"http://localhost:63430/Image/" + data.products[i + 3].Image + "\">" + data.products[i + 3].Id + "</td>" + "</tr>");
                    $("#tableContent").append($('<tr>')
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i].id)
                            .append($('<td>')
                                .attr('id', data.products[i].id)
                                .append($('<img>')
                                    .attr('id', 'Ph' + data.products[i].id)
                                    .attr('src', '/Image/' + data.products[i].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i].price).append(" грн")
                                )
                            ))
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 1].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 1].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 1].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 1].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 1].price).append(" грн")
                                )
                            ))

                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 2].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 2].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 2].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 2].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 2].price).append(" грн")
                                )
                            ))
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 3].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 3].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 3].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 3].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 3].price).append(" грн")
                                )
                            ))
                    )
                }
                else if (data.products[i + 2] != null) {
                    //$("#tableContent").append("<tr>" + "<td background =\"http://localhost:63430/Image/" + data.products[i].Image + "\">" + data.products[i].Id + "</td>" + "<td background =\"http://localhost:63430/Image/" + data.products[i + 1].Image + "\">" + data.products[i + 1].Id + "</td>" + "<<td background =\"http://localhost:63430/Image/" + data.products[i + 2].Image + "\">" + data.products[i + 2].Id + "</td>" + "</tr>");
                    $("#tableContent").append($('<tr>')
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i].id)
                            .append($('<td>')
                                .attr('id', data.products[i].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i].price).append(" грн")
                                )
                            ))
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 1].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 1].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 1].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 1].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 1].price).append(" грн")
                                )
                            ))
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 2].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 2].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 2].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 2].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 2].price).append(" грн")
                                )
                            ))
                    )
                }
                else if (data.products[i + 1] != null) {
                    //$("#tableContent").append("<tr>" + "<td background =\"http://localhost:63430/Image/" + data.products[i].Image + "\">" + data.products[i].Id + "</td>" + "<td background =\"http://localhost:63430/Image/" + data.products[i + 1].Image + "\">" + data.products[i + 1].Id + "</td>" + "</tr>");

                    $("#tableContent").append($('<tr>')
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i].id)
                            .append($('<td>')
                                .attr('id', data.products[i].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i].price).append(" грн")
                                )
                            ))
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i + 1].id)
                            .append($('<td>')
                                .attr('id', data.products[i + 1].id)

                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i + 1].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i + 1].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i + 1].price).append(" грн")
                                )
                            ))
                    )
                }
                else if (data.products[i] != null) {
                    //$("#tableContent").append("<tr>" + "<td background =\"http://localhost:63430/Image/" + data.products[i].Image + "\">" + data.products[i].Id + "</td>" + "</tr>");
                    $("#tableContent").append($('<tr>')
                        .append($('<a>')
                            .attr('href', '/Home/ProdInfo?productId=' + data.products[i].id)
                            .append($('<td>')
                                .attr('id', data.products[i].id)
                                .append($('<img>')
                                    .attr('src', '/Image/' + data.products[i].image[0])
                                )
                                .append($('<label>')
                                    .append(data.products[i].name)
                                ).append($('<br>'))
                                .append($('<label>')
                                    .append(data.products[i].price).append(" грн")
                                )
                            ))
                    )
                }

            }
        },
        error: function (error) {
            console.log()
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
            ;
            window.location="#"+$('[value = ' + GroupId + ']').attr('Id');
        },
        error: function (error) {
            console.log(error);
        }
    })
};


function ShowSelect() {
    $.ajax({
        url: "/Product/GetSelected?idgroup=" + GroupId,
        method: "GET",
        success: function (data) {

            if (data.Brends.length >= 1) {
                $('#selBrend').empty();
                $('#selBrend').addClass('activeBox')
                $('#selBrend').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append("Виробник"))
                for (var i = 0; i < data.Brends.length; i++) {
                    $('#selBrend').append($('<option>')
                        .append(data.Brends[i]))
                }
            }
            if (data.Countryes.length >= 1) {
                $('#selCountry').empty();
                $('#selCountry').addClass('activeBox')
                $('#selCountry').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append("Країна"))
                for (var i = 0; i < data.Countryes.length; i++) {
                    $('#selCountry').append($('<option>')
                        .append(data.Countryes[i]))
                }
            }
            if (data.Fillers.length >= 1) {
                $('#selFiller').empty();
                $('#selFiller').addClass('activeBox')
                $('#selFiller').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append("Наповнювач"))
                for (var i = 0; i < data.Fillers.length; i++) {
                    $('#selFiller').append($('<option>')
                        .append(data.Fillers[i]))
                }
            }
            if (data.Materials.length >= 1) {
                $('#selMaterial').empty();
                $('#selMaterial').addClass('activeBox')
                $('#selMaterial').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append("Матеріал"))
                for (var i = 0; i < data.Materials.length; i++) {
                    $('#selMaterial').append($('<option>')
                        .append(data.Materials[i]))
                }
            }
            if (data.TypeClothes.length >= 1) {
                $('#selTypeCloth').empty();
                $('#selTypeCloth').addClass('activeBox')
                $('#selTypeCloth').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append("Тип тканин"))
                for (var i = 0; i < data.TypeClothes.length; i++) {
                    $('#selTypeCloth').append($('<option>')
                        .append(data.TypeClothes[i]))
                }
            }
            if (data.Specials.length >= 1) {
                $('#selSpecial').empty();
                $('#selSpecial').addClass('activeBox')
                $('#selSpecial').append($('<option>')
                    .attr('value', '')
                    .attr('selected','selected')
                    .append(""))
                for (var i = 0; i < data.Specials.length; i++) {
                    $('#selSpecial').append($('<option>')
                        .append(data.Specials[i]))
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
};

$("#pagination").on('click', 'button', function () {
    numLastPage = numThisPage;
    numThisPage = parseInt(this.value);
    $("#pagination").empty();
    GetProducts();
})

$("#menu").on('click', 'button', function () {
    numThisPage = 1;
    numLastPage = 1;
    $("#tableContent tr").remove();
    GroupId = $(this).attr('value');
    $(".activeBox").removeClass('activeBox');
    ShowSelect();
    GetProducts();

});

$(".vuborka").on('change', 'select', function () {
    numThisPage = 1;
    numLastPage = 1;
    if (this.id == "selBrend")
        brend = this.value;
    else if (this.id == "selCountry")
        country = this.value;
    else if (this.id == "selFiller")
        filler = this.value;
    else if (this.id == "selMaterial")
        material = this.value;
    else if (this.id == "selSpecial")
        special = this.value;
    else if (this.id == "selTypeCloth")
        typeCloth = this.value;
    GetProducts();
})

//$("#tableContent").on('click', 'td', function (data) {

//    window.location = "FullInfoProduct/InfoProduct.html?returnurl=" + this.id;
//}) 