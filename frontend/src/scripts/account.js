// Remove bottom border to a selected element
function focus_out(strin) 
{
    document.querySelector(strin).style.borderBottom = "3px solid rgba(0,0,0,0)";
}
// Add bottom border to a selected element
function focus_in(strin) 
{
    document.querySelector(strin).style.backgroundColor = "var(--unilab-white)";
    document.querySelector(strin).style.borderBottom = "3px solid var(--unilab-orange)";
}
// Displays the selected section of account settings page
function display_form(n) 
{
    var forms = document.querySelectorAll('.settings-form');
    var menus = document.querySelectorAll('.settings-menu-item');
    for (var i = 0; i < 2; i++) 
    {
        forms[i].style.display = "none";
        if (menus[i].classList.contains('active-settings')) 
        {
            menus[i].classList.remove('active-settings');
        }
    }
    menus[n].classList.add('active-settings');
    forms[n].style.display = "flex";
}
// Reads URL of the file input and displays the image
function readURL(input) 
{
    if (input.files && input.files[0]) 
    {
        var reader = new FileReader();
        reader.onload = function (e) 
        {
            $('#avatar')
            .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
}