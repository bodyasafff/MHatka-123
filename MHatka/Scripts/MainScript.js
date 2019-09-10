
$(document).ready(function () {

    GetMainInfo();
})
function GetMainInfo() {
    $.ajax({
        url: "/Product/GetMainInfo",
        method: "GET",
        success: function (res) {
            //<div class="vanilla-slide">
            //    <img src="~/Content/img/mainpage/1carusel_1/1.jpg" alt="slide1">
            //        <div class="text">
            //            <div style="font-size: 4vh;float: left">Постільна білизна SoundSleep Lyons</div>
            //            <br>
            //                <div style="font-size: 2vh; float: left; padding-top: 2%;">Відкркрий надзвичайний сон</div>
            //                <button class="buttons"><a href="#">Придбати</a></button>
            //        </div>
            //        </div>
            console.log(res);
            for (var i = 0; i < 3; i++) {
                $("#vanilla-slideshow").append($('<div>')
                    .attr('class', 'vanilla-slide')
                    .append($('<img>')
                        .attr('src', '/Image/' + res[i].Image)
                        .attr('alt', 'slide1'))
                    .append($('<div>')
                        .attr('class', 'text')
                        .append($('<div>')
                            .attr('style', 'font-size: 4vh;float: left;')
                            .append(res[i].Name))
                        .append($('<br>'))
                        .append($('<div>')
                            .attr('style', 'font-size: 2vh;float: left; padding-top: 2%;')
                            .append(res[i].Description)
                    )
                        .append($('<button>')
                            .attr('class', 'buttons')
                            .attr('id',res[i].ProductId)
                            .append("Придбати")
                        )
                    )
                )
            }

            //<div class="column">
            //    <img class="two" src="~/Content/img/mainpage/1carusel_1/4.jpg" alt="50/50">
            //        <p class="text_main">Італійські рушники SoftTouch</p>
            //        <p>For our guests that seek a sophisticated replacement to down, we handpicked this down alternative pillow for its plush loft and progressive craftsmanship.</p>

            //        <a class="button">Більше &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img class="arrow" src="~/Content/img/mainpage/2newandpopular/arrow-right.png" alt="arrow"></a>
                
            //</div>


                for (var i = 3; i < 5; i++) {
                    $("#rows").append($('<div>')
                        .attr('class','column')
                        .append($('<img>')
                            .attr('class', 'two')
                            .attr('src', '/Image/' + res[i].Image)
                            .attr('alt', '50/50'))
                        .append($('<p>')
                            .attr('class', 'text_main')
                            .append(res[i].Name))
                        .append($('<p>')
                            .append(res[i].Description))
                        .append($('<a>')
                            .attr('class', 'button')
                            .attr('href', '/Home/ProdInfo?productId=' + res[i].ProductId)
                            .append("Більше &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                            .append($('<img>')
                                .attr('class', 'arrow')
                                .attr('src','/Content/img/mainpage/2newandpopular/arrow-right.png')
                                .attr('alt', 'arrow'))
                    )
                    )

            }
            $('#vanilla-slideshow').on('click', 'button', function () {
                console.log($(".vanilla-active")[0].children[1].children[3].id);
                window.location = "/Home/ProdInfo?productId="+$(".vanilla-active")[0].children[1].children[3].id;
            })

            vanillaSlideshow.init({
                slideshow: true,
                delay: 5000,
                arrows: true,
                indicators: true,
                random: false,
                animationSpeed: '1s'
            });
        },
        error: function (err) {
            console.log(err);
        }
    })
}
