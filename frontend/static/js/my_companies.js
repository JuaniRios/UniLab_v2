var form = document.querySelectorAll('.add-company')[0];
var screen = document.querySelectorAll('.add-company-screen')[0];

function open_add_company()
{
    if(form.classList.contains('hidden'))
    {
        form.classList.remove('hidden');
        screen.style.display = "flex";
    }
    else
    {
        form.classList.add('hidden');
        screen.style.display = "none";
    }
}

screen.addEventListener('click',
function(e)
{
    if ( !form.contains(e.target) )
    {
        // Click outside element
        open_add_company();
    }
})