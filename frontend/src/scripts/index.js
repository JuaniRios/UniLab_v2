var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var offer_slider = document.querySelector('.newest-offers');
var offer_item_rev = document.querySelectorAll('.offer-item-rev');
offer_slider.style.left = "0%";


function item_hover(n) {
    offer_item_rev[n].style.display = "flex";
}
function item_release(n) {
    offer_item_rev[n].style.display = "none";
}
function offers_action(string) {
    var lefto = parseInt(offer_slider.style.left)
    if (string == "prev" && lefto < 0) {
        var new_value = lefto + 75;
        offer_slider.style.left = new_value + "%";
    }
    else if (string == "next" && lefto > -150) {
        var new_value = lefto - 75;
        offer_slider.style.left = new_value + "%";
    }
}
function scrollto(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}
function reveal_explore() {
    document.querySelector('.starting-button').style.bottom = "5%";
}
// function hide_announcements()
// {
//     var announcements = document.querySelector('.announcements');
//     var cont_img = document.querySelectorAll('.cont-img');
//     var home_content = document.querySelector('.home-content');
//     announcements.style.display = "none";
//     for(var i = 0; i<4; i++)
//     {
//         cont_img[i].style.height = "600px";
//         cont_img[i].style.width = "600px";
//     } 
//     home_content.style.width = "100vw";
// }
// Collapsibles
// function coll_function2(n)
// {
//     var coll_title = document.querySelectorAll('.coll-title');
//     var coll_content2 = document.querySelectorAll('.coll-first-tier2');
//     var coll_symbol2 = document.querySelectorAll('.coll-symbol2');
//     // Open Collapsible
//     if(!(coll_content2[n].classList.contains("expanded")))
//     {
//         coll_content2[n].classList.add("expanded");
//         coll_title[n].style.borderRadius = "10px 10px 0 0";
//         coll_symbol2[n].innerHTML = "&minus;";
//         coll_content2[n].style.display = "block";
//     }
//     // Close Collapsible
//     else
//     {
//         coll_content2[n].classList.remove("expanded");
//         coll_title[n].style.borderRadius = "10px 10px 10px 10px";
//         coll_symbol2[n].innerHTML = "&plus;";
//         coll_content2[n].style.display = "none";
//     }
// }