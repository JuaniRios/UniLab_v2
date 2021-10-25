var company_search = document.querySelectorAll('.company-search')[0];
var company_search_header = document.querySelectorAll('.company-search-header')[0];
var company_search_wrapper = document.querySelectorAll('.company-search-wrapper')[0];
var company_search_image = document.querySelectorAll('.company-search-image')[0];
var company_search_input = document.querySelectorAll('.company-search-input')[0];
var company_search_results = document.querySelectorAll('.company-search-results')[0];

var company_filter = document.querySelectorAll('.company-filter')[0];
var company_filter_screen = document.querySelectorAll('.company-filter-screen')[0];

var bodx = document.getElementsByTagName("BODY")[0]; 


function toggle_company_search(self)
{
    bodx.style.overflow = "hidden";
    company_search.style.zIndex = "9001";
    self.classList.add('hidden');
    company_search_wrapper.classList.remove('hidden');
    company_search.style.position = "fixed";
    company_search.style.top = "0";
    company_search.style.width = "100%";
    company_search.style.borderRadius = "0";
    company_search.style.margin = "0";
    company_search.style.height = "100vh";
    company_search.style.overflowY = "scroll";
    setTimeout(
        function()
        {
            company_search_wrapper.style.top = "0";
        },1
    )
}
function close_company_search()
{
    bodx.style.overflow = "unset";
    company_search_wrapper.style.top = "-20%";
    company_search.style.zIndex = "7";
    company_search.style.overflowY = "unset";
    company_search_header.classList.remove('hidden');
    company_search_results.classList.add('hidden');
    company_search_wrapper.classList.add('hidden');
    document.querySelector('.results-header').classList.add('hidden');
    company_search.style.position = "relative";
    company_search.style.top = "unset";
    company_search.style.width = "60%";
    company_search.style.borderRadius = "50px";
    company_search.style.margin = "10rem 0";
    company_search.style.height = "unset";
}

company_search_header.addEventListener('click', function(){toggle_company_search(company_search_header);})

var company_slider = document.querySelector('.newest-offers');
var company_item = document.querySelectorAll('.offer-item');
var company_item_rev = document.querySelectorAll('.offer-item-rev');
company_slider.style.left = "0%";

for (var i=0; i<company_item.length; i++)
{
    company_item[i].setAttribute("id", `company-${i}`);
}

function item_hover(n)
{
    company_item_rev[n].style.display = "flex";
}

function item_release(n)
{
    company_item_rev[n].style.display = "none";
}

var times_for_slide = 2;
var max_left_value = 100*times_for_slide;

function offers_action(string)
{
    var lefto = parseInt(company_slider.style.left)
    if (string == "prev" && lefto < 0)
    {
        var new_value = lefto + 100;
        company_slider.style.left = new_value + "%";
    }
    else if (string == "next" && lefto > -max_left_value)
    {
        var new_value = lefto - 100;
        company_slider.style.left = new_value + "%";
    }
}

function open_company_filter()
{
    if(company_filter.classList.contains('hidden'))
    {
        company_filter.classList.remove('hidden');
        company_filter_screen.style.display = "flex";
    }
    else
    {
        company_filter.classList.add('hidden');
        company_filter_screen.style.display = "none";
    }
}

company_filter_screen.addEventListener('click',
function(e)
{
    if ( !company_filter.contains(e.target) )
    {
        // Click outside element
        open_company_filter();
    }
})