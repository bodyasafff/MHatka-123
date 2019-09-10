var cropper;
var email;
var password;
var $canvas;
var numThisPage = 1;
var numLastPage = 1;
var groupId = "";
var idproduct = "";
var idPhoto;
var imgMass = ["", "", "", "", ""];
var groupId = "";
var photoId = 0;
var idsizeer = "";
var ifChange = false;
var imgMain = "";


$(document).ready(function () {
    CreateMenu();
    CreateGroupsToAdd();
    $canvas = $('#canvas'),
        context = $canvas.get(0).getContext('2d');

})
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function Clearing() {
    document.getElementById("txt_Name").value = "";
    document.getElementById("txt_Groups").value = "";
    document.getElementById("txt_Article").value = "";
    document.getElementById("txt_Description").value = "";
    document.getElementById("txt_Brend").value = "";
    document.getElementById("txt_Country").value = "";
    document.getElementById("txt_Filler").value = "";
    document.getElementById("txt_Material").value = "";
    document.getElementById("txt_Special").value = "";
    document.getElementById("txt_TypeCloth").value = "";
    document.getElementById("txt_Size").value = "";
    document.getElementById("txt_Price").value = "";
    $("#divPhoto div").removeAttr('style');
}

function DeleteProduct() {
    $.ajax({
        url: "/Admin/DeleteProduct",
        method: "POST",
        dataType: "json",
        data: {
            id: idproduct,
            token: window.sessionStorage.getItem("token")
        },
        success: function (res) {
            GetProducts();
        },
        error: function (err) {
            console.log(err);
            GetProducts();
        }
    })
}

function DeleteSizeer() {
    $.ajax({
        url: "/Admin/DeleteSizeer",
        method: "POST",
        dataType: "json",
        data: {
            id: idsizeer,
            token: window.sessionStorage.getItem("token")
        },
        success: function (res) {
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function AddSizeAndPrice() {
    $.ajax({
        url: "/Admin/AddSizeAndPrice",
        method: "POST",
        dataType: "json",
        data: {
            id: idproduct,
            token: window.sessionStorage.getItem("token"),
            size: document.getElementById("txt_minSize").value,
            price: document.getElementById("txt_minPrice").value
        },
        success: function (res) {
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function GetMinProduct(idProduct) {
    $.ajax({
        url: "/Admin/GetMinProduct?id=" + idProduct + "&token=" + window.sessionStorage.getItem("token"),
        method: "GET",
        success: function (data) {
            idproduct = data.id;
            $("#txt_minName").attr('value', data.name);
            $("#txt_minDescription").attr('value', data.description);
            $("#prodInfoPhotoo").attr('style', 'background: url(/Image/' + data.img + ');background-size:cover;')
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function AddProduct() {
    $.ajax({
        url: "/Admin/AddProduct",
        method: "POST",
        dataType: "json",
        data: {
            token: window.sessionStorage.getItem("token"),
            name: document.getElementById("txt_Name").value,
            group: $("#txt_Groups").children(":selected").attr("id"),
            article: document.getElementById("txt_Article").value,
            description: document.getElementById("txt_Description").value,
            brend: document.getElementById("txt_Brend").value,
            country: document.getElementById("txt_Country").value,
            filler: document.getElementById("txt_Filler").value,
            material: document.getElementById("txt_Material").value,
            special: document.getElementById("txt_Special").value,
            typeCloth: document.getElementById("txt_TypeCloth").value,
            size: document.getElementById("txt_Size").value,
            price: document.getElementById("txt_Price").value,
            img: imgMass
        },
        success: function (res) {

            GetProducts();
            imgMass = ["", "", "", "", ""];
        },
        error: function (err) {
            alert("Товар додано");
            console.log(err);
            GetProducts();
            imgMass = ["", "", "", "", ""];
        }
    })
}

function EditProduct() {
    $.ajax({
        url: "/Admin/EditProduct",
        method: "POST",
        dataType: "json",
        data: {
            token: window.sessionStorage.getItem("token"),
            idProduct: idproduct,
            name: document.getElementById("txt_Name").value,
            group: $("#txt_Groups").children(":selected").attr("id"),
            article: document.getElementById("txt_Article").value,
            description: document.getElementById("txt_Description").value,
            brend: document.getElementById("txt_Brend").value,
            country: document.getElementById("txt_Country").value,
            filler: document.getElementById("txt_Filler").value,
            material: document.getElementById("txt_Material").value,
            special: document.getElementById("txt_Special").value,
            typeCloth: document.getElementById("txt_TypeCloth").value,
            size: document.getElementById("txt_Size").value,
            price: document.getElementById("txt_Price").value,
            img: imgMass,
            ifChang: ifChange
        },
        success: function (res) {
            GetProducts();
            ifChange = false;
            imgMass = ["", "", "", "", ""];
        },
        error: function (err) {
            ifChange = false;
            console.log(err);
            GetProducts();
            imgMass = ["", "", "", "", ""];
        }
    })
}

function AddProductToSlider() {
    $.ajax({
        url: "/Admin/AddProductToSlider",
        method: "POST",
        dataType: "json",
        data: {
            name: document.getElementById("prodName").value,
            thisprodid: document.getElementById("thisproductId").value,
            description: document.getElementById("prodDesc").value,
            prodid: document.getElementById("selSliderProduct").value,
            image: imgMain
        },
        success: function (res) {
            document.getElementById("prodName").value = "";
            document.getElementById("thisproductId").value = "";
            document.getElementById("prodDesc").value = "";
            $('#200Photo').removeAttr('style');
            imgMain = "";
            console.log(res);
        },
        error: function (err) {
            document.getElementById("prodName").value = "";
            document.getElementById("thisproductId").value = "";
            document.getElementById("prodDesc").value = "";
            $('#200Photo').removeAttr('style');
            imgMain = "";
            console.log(err);

        }
    })
}

function GetProducts() {
    $.ajax({
        url: "/Admin/GetProducts?numPage=" + numThisPage + "&groupId=" + groupId + "&token=" + window.sessionStorage.getItem("token"),
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
                for (var j = 0; j < massBtns.length; j++) {
                    $("#pagination").append(massBtns[j]);
                }
            }
            if (massBtns.length > 0) {

                massBtns[numLastPage - 1].classList.remove('active');
                massBtns[numThisPage - 1].classList.add('active');
            }
            $("#productsInfo tr").remove();
            let listTemp = [];
            $("#productsInfo").append($('<tr>')
                .attr('class', 'heightAuto').append($('<td>')
                    .append("image")
                    .attr('class', 'thImageTd'))
                .append($('<td>')
                    .append("Назва").attr('class', 'thNameTd'))
                .append($('<td>')
                    .append("Опис").attr('class', 'thDexcTd'))

            )
            for (var i = 0; i < data.products.length; i++) {

                $("#productsInfo").append($('<tr>')
                    .attr('value', data.products[i].id).append($('<td>')
                        .attr('class', 'imageTd')
                        .append($('<img>')
                            .attr('src', '/Image/' + data.products[i].image)
                        )
                    )
                    .append($('<td>')
                        .append(data.products[i].name).attr('class', 'nameTd'))
                    .append($('<td>')
                        .append(data.products[i].description).attr('class', 'descTd'))
                )
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function CreateGroupsToAdd() {
    $.ajax({
        url: "/Admin/GetMenu?token=" + window.sessionStorage.getItem("token"),
        method: "GET",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#txt_Groups").append($('<optgroup>')
                    .attr('label', data[i].Name));
                $.each(data[i].Groups, function (index, value) {
                    $("#txt_Groups").append($('<option>')
                        .attr('id', value.Id)
                        .append(value.Name))
                })

            }
        },
        error: function (err) {
            console.log(err);
        }
    })
};

function CreateMenu() {
    $.ajax({
        url: "/Admin/GetMenu?token=" + window.sessionStorage.getItem("token"),
        method: "GET",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#categories").append($('<button>')
                    .attr('Id', data[i].Id)
                    .append(data[i].Name));
                $("#SelGroupBtns").append($('<div>')
                    .attr('class', 'subcategories')
                    .attr('Id', 'data' + data[i].Id)
                );

                $.each(data[i].Groups, function (index, value) {
                    $('#data' + data[i].Id).append($('<button>')
                        .attr('id', value.Id)
                        .append(value.Name))

                })
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
};

function GetProduct() {
    $.ajax({
        url: "/Admin/GetProduct?id=" + idproduct + "&token=" + window.sessionStorage.getItem("token"),
        method: "GET",
        success: function (data) {
            for (var i = 0; i < data.MapSizeers.length; i++) {
                $("#sel_Sizeer").append($('<option>').attr('id', data.MapSizeers[i].Id).append("Розмір:" + data.MapSizeers[i].Sizes + " Ціна:" + data.MapSizeers[i].Prices));
            }
            document.getElementById("txt_Name").value = data.Name;
            let count = 0;
            for (var i = 0; i < document.getElementById("txt_Groups").children.length; i++) {
                //console.log(document.getElementById("txt_Groups").children[i].id + " ");
                if (document.getElementById("txt_Groups").children[i].id == "") {
                    count++;
                }
                if (groupId == document.getElementById("txt_Groups").children[i].id) {
                    document.getElementById("txt_Groups").getElementsByTagName('option')[i - count].selected = 'selected';
                    break;
                }
            }
            document.getElementById("txt_Article").value = data.Article;
            document.getElementById("txt_Description").value = data.Description;
            document.getElementById("txt_Brend").value = data.Brend;
            document.getElementById("txt_Country").value = data.Country;
            document.getElementById("txt_Filler").value = data.Filler;
            document.getElementById("txt_Material").value = data.Material;
            document.getElementById("txt_Special").value = data.Special;
            document.getElementById("txt_TypeCloth").value = data.TypeCloth;
            if (data.MapSizeers[0].Sizes != null) {
                document.getElementById("txt_Size").value = data.MapSizeers[0].Sizes;
                document.getElementById("txt_Price").value = data.MapSizeers[0].Prices;
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
};

$("#addSizePrice").click(function () {
    if (idproduct == "") {
        alert("Продукт не вибраний");
    }
    else {
        AddSizeAndPrice();
        document.getElementById("txt_minSize").value = "";
        document.getElementById("txt_minPrice").value = "";
    }
})

$("#addPtod").click(function () {
    AddProduct();
    Clearing();
})

$("#clickAddProdToSlider").click(function () {
    if (document.getElementById("selSliderProduct").value != "Виберіть номер картинки") {
        AddProductToSlider();
    }
    else {
        swal("Виберіть номер kартинки");
    }
})


$("#editPtod").click(function () {
    ifChange = false;
    EditProduct();
    Clearing();
})

$("#categories").on('click', 'button', function () {
    $('.activeBox').removeClass('activeBox');
    $("#data" + this.id + " button").addClass('activeBox');
});

$("#pagination").on('click', 'button', function () {
    numLastPage = numThisPage;
    numThisPage = parseInt(this.value);
    $("#pagination").empty();
    GetProducts();
})

$("#SelGroupBtns").on('click', 'button', function () {
    numLastPage = 1;
    numThisPage = 1;
    groupId = this.id;
    $("#productsInfo tr").remove();
    GetProducts();
});

$("#productsInfo").on('click', 'tr', function () {
    GetMinProduct($(this).attr('value'));
});
$("#aboutProduct").click(function () {
    Clearing();

    $(".activeAEButtons").removeClass('activeAEButtons');
    $("#addPtod").addClass('activeAEButtons');
    $("#activeSize").addClass('activeAEButtons');
    $("#activePrice").addClass('activeAEButtons');
    $("#divPhoto div").removeAttr('style');
    for (var i = 0; i < 5; i++) {
        imgMass[i] = "";
    }
})
$("#editProduct").click(function () {
    if (idproduct == "") {
        alert("Не вибраний продукт");
    }
    else {
        Clearing();
        $("#sel_Sizeer option").remove();
        openCity(event, 'AboutItem');
        GetProduct();
        $(".activeAEButtons").removeClass('activeAEButtons');
        $("#editPtod").addClass('activeAEButtons');
        $("#sel_Sizeer").addClass('activeAEButtons');
        $("#btnDeleteSize").addClass('activeAEButtons');
        $("#divPhoto div").removeAttr('style');
    }
})

$("#BtnDeleteProduct").click(function () {
    if (idproduct == "") {
        alert("Не вибраний продукт");
    }
    else {
        DeleteProduct();
    }
})
//$("#sel_Sizeer").change(function () {
//    idsizeer = $(this).children(":selected").attr("id");
//})

$("#btnDeleteSize").click(function () {
    if ($("#sel_Sizeer").children(":selected").attr("id") != undefined) {
        idsizeer = $("#sel_Sizeer").children(":selected").attr("id");
        $("#sel_Sizeer").children(":selected").remove();
        DeleteSizeer();
    }

})
$('#PhotoForMain').on('click', function () {
    $("#image").click();
    idPhoto = 200;
})
$("#photos").on('click', 'button', function () {
    $("#image").click();
    idPhoto = this.value;

});
$("#image").change(function () {
    if (this.value != "") {
        {
            if (this.files && this.files[0]) {
                if (this.files[0].type.match(/^image\//)) {
                    modal.style.display = "block";
                    var reader = new FileReader();
                    // $('#file_name').attr('value',this.files[0]);
                    reader.onload = function (e) {
                        var img = new Image();
                        img.onload = function () {
                            context.canvas.width = img.width;
                            context.canvas.height = img.height;
                            context.drawImage(img, 0, 0);
                            if (cropper != undefined) {

                                $canvas.cropper('destroy');
                            }
                            if (idPhoto == 200) {
                                cropper = $canvas.cropper({
                                    viewMode: 2,
                                    minCropBoxWidth: 100,
                                    minCropBoxHeight: 100,
                                    aspectRatio: 16 / 9
                                });
                            }
                            else {
                            cropper = $canvas.cropper({
                                viewMode: 2,
                                minCropBoxWidth: 100,
                                minCropBoxHeight: 100,
                                aspectRatio: 3 / 4
                            });
                            }
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(this.files[0]);
                }
                else {
                    swal("Invalid file type", "", "error");
                }
            }
            else {
                swal("Please select a file.", "", "info");
            }
        }
        this.value = "";
    }

});


$('#crop').click(function () {
    if ($canvas.cropper != null) {
        var croppedImage = $canvas.cropper('getCroppedCanvas').toDataURL('image/jpg');
        $('#' + idPhoto + 'Photo').attr('style', 'background: url(' + croppedImage + ');background-size:cover;');
        if (idPhoto != 200) {

            imgMass[idPhoto] = croppedImage;
            ifChange = true;
        }
        else {
            imgMain = croppedImage;
        }
        modal.style.display = "none";
    }
    // $.ajax({
    //     url: "http://localhost:50742/Home/UploadImage",
    //     method: "POST",
    //     dataType: "json",
    //     data: {
    //         croppedImage: croppedImage
    //     },
    //     success: function (res) {
    //         console.log(res);

    //     },
    //     error: function (err) {
    //         console.log(err);
    //     }
    // })

})
$('#cropClear').click(function () {
    $('#' + idPhoto + 'Photo').removeAttr('style');
    imgMass[idPhoto] = "";
    modal.style.display = "none";
    ifChange = true;
})
