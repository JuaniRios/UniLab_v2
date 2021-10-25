var height = document.documentElement.clientHeight;
var width = document.documentElement.clientWidth;

var smoke_sreen = document.querySelector('.smoke-screen');
var smoke_sreen_v2 = document.querySelector('.smoke-screen-v2');
var smoke_sreen_language = document.querySelector('.smoke-screen-language');

var top_nav = document.querySelector('.top-nav');
var nav_container = document.querySelector('.top-nav-container');
var item_filler = document.querySelectorAll('.top-nav-item-filler');
var item_text = document.querySelectorAll('.top-nav-item-text');
var item_link = document.querySelectorAll('.top-nav-item');

// Navbar Images
var logo = document.querySelector('#logo-img');
var profile = document.querySelector('#profile-img');
var search = document.querySelector('#search-img');
var lang_img = document.querySelector('#lang-img');

var linebar = document.querySelector('.menu-mobile');
var profile_menu = document.querySelector('.profile-menu');

var language_menu = document.querySelector('.language-menu');

var search_wrapper = document.querySelector('.search-wrapper');
search_wrapper.style.paddingLeft = "50%";
var search_button = document.querySelector('.top-nav-search');
var search_field = document.querySelector('.search-field');
var search_cancel = document.querySelector('.search-cancel');

if (width > 1030)
{
    function fill_items(n)
    {
        item_filler[n].style.width = "100%";
        item_filler[n].classList.add('shadow');
        item_text[n].style.color = "var(--unilab-white)";
    }
    function cancel_items(n)
    {
        item_filler[n].style.width = "0";
        item_filler[n].classList.remove('shadow');
        item_text[n].style.color = "var(--unilab-white)";
        if(item_text[n].classList.contains('active-item')) item_text[n].style.color = "var(--unilab-orange)";
        else item_text[n].style.color = "black";
        
    }
    function open_profile()
    {
        // Close Profile Menu
        if(profile_menu.classList.contains('opened-profile'))
        {
            profile_menu.classList.remove("opened-profile");
            profile_menu.style.right = "-25vw";
            smoke_sreen_v2.style.display = "none";
        }
        // Open Profile Menu
        else
        {
            smoke_sreen_v2.style.display = "block";
            profile_menu.classList.add("opened-profile");
            profile_menu.style.right = "0vw";
        }
    }
    function open_lang()
    {
        // Close Language Menu
        if(language_menu.classList.contains('opened-language'))
        {
            language_menu.classList.remove("opened-language");
            language_menu.style.right = "-25vw";
            smoke_sreen_language.style.display = "none";
        }
        // Open Language Menu
        else
        {
            smoke_sreen_language.style.display = "block";
            language_menu.classList.add("opened-language");
            language_menu.style.right = "0vw";
        }
    }
}
else
{
    function fill_items(n) {return null;}
    function cancel_items(n) {return null;}
    function open_profile()
    {
        // Close Profile Menu
        if(profile_menu.classList.contains('opened-profile'))
        {
            profile_menu.classList.remove("opened-profile");
            profile_menu.style.left = "100vw";
        }
        // Open Profile Menu
        else
        {
            profile_menu.classList.add("opened-profile");
            profile_menu.style.left = "0vw";
        }
    }
    function open_lang()
    {
        // Close Language Menu
        if(language_menu.classList.contains('opened-language'))
        {
            language_menu.classList.remove("opened-language");
            language_menu.style.left = "100vw";
        }
        // Open Language Menu
        else
        {
            language_menu.classList.add("opened-language");
            language_menu.style.left = "0vw";
        }
    }
}
// Mobile Menu
function open_linebar()
{
    // Close Mobile Menu
    if(linebar.classList.contains('opened-linebar'))
    {
        linebar.style.backgroundImage = "url(../static/img/linebar.png)";
        linebar.classList.remove("opened-linebar");
        nav_container.style.left = "100vw";
    }
    // Open Mobile Menu
    else
    {
        linebar.style.backgroundImage = "url(../static/img/cancel.png)";
        linebar.classList.add("opened-linebar");
        nav_container.style.left = "0vw";
    }
}
// Show and hide search bar
function show_search()
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'hidden';
    top_nav.style.display = "none";
    search_wrapper.style.display = "flex";
    smoke_sreen.style.display = "flex";
    search_field.style.display = "flex";
    search_cancel.style.display = "flex";
    setTimeout(() => {
        search_wrapper.style.paddingLeft = "0";
    }, 1);
}
function hide_search()
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'unset';
    search_wrapper.style.display = "none";
    smoke_sreen.style.display = "none";
    top_nav.style.display = "flex";
    search_field.style.display = "none";
    search_cancel.style.display = "none";
    search_wrapper.style.paddingLeft = "50%";
}
// Makes the TOP NAV smaller when you scroll down
function scrollFunction2()
{
    if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 1)
    {
        for(var i=0; i<=4; i++)
        {
            item_filler[i].style.height = "35px";
        }
        // LOGO IMAGE
        logo.style.height = "50px";
        logo.style.width = "100px";
        // PROFILE IMAGE
        profile.style.height = "25px";
        profile.style.width = "25px";
        // SEARCH IMAGE
        search.style.height = "25px";
        search.style.width = "25px";
        // SEARCH CANCEL IMAGE
        search_cancel.style.height = "15px";
        search_cancel.style.width = "15px";
        // LANGUAGE IMAGE
        lang_img.style.height = "25px";
        lang_img.style.width = "25px";

        top_nav.style.height = "50px";
    }
    else
    {
        for(var i=0; i<=4; i++)
        {
            item_filler[i].style.height = "50px";
        }
        // LOGO IMAGE
        logo.style.height = "75px";
        logo.style.width = "150px";
        // PROFILE IMAGE
        profile.style.height = "35px";
        profile.style.width = "35px";
        // SEARCH IMAGE
        search.style.height = "35px";
        search.style.width = "35px";
        // SEARCH CANCEL IMAGE
        search_cancel.style.height = "25px";
        search_cancel.style.width = "25px";
        // LANGUAGE IMAGE
        lang_img.style.height = "35px";
        lang_img.style.width = "35px";

        top_nav.style.height = "75px";
    }
}
