function validate_form()
{
    var fail = 0;
    for(var i=0; i< arguments.length; i++)
    {
        if (document.querySelector(arguments[i]).value.length == 0) 
        {
            document.querySelector(arguments[i]).style.backgroundColor = 'rgba(255,0,0,0.2)';
            fail = 1;
        }
    }
    if (fail) return false;
    return true;
}

function focusout(self)
{
    self.style.borderBottom = "3px solid rgba(0,0,0,0)";
}
function focusin(self)
{
    self.style.backgroundColor = "var(--unilab-white)";
    self.style.borderBottom = "3px solid var(--unilab-orange)";
}
function focusin_gray(self)
{
    self.style.backgroundColor = "var(--unilab-gray)";
    self.style.borderBottom = "3px solid var(--unilab-orange)";
}
function focusin_image(self)
{
    self.style.backgroundColor = "var(--unilab-gray)";
}
function focus_comment(self)
{
    self.style.backgroundColor = "var(--unilab-white)";
}
// FOR FUTURE USE - KEY EVENTS
// document.body.addEventListener('keypress', function(e) 
// {
//     if (e.key == "Escape") 
//     {
        
//     }
// });