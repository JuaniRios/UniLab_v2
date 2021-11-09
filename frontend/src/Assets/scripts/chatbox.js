var chats = document.querySelector('.chats-wrapper');
function open_chat_menu(self, n)
{
    if(triangles[n].style.display == "block")
    {
        triangles[n].style.display = "none";
        chat_menu[n].style.display = "none";
        self.style.display = "none";
    }
    else
    {
        triangles[n].style.display = "block";
        chat_menu[n].style.display = "block";
        self.style.display = "flex";
    }
}
function open_chats(self)
{
    if(!(chats.classList.contains('.opened-chats')))
    {
        chats.classList.add('.opened-chats');
        chats.style.height = "60vh";
    }
    else
    {
        chats.classList.remove('.opened-chats');
        chats.style.height = "7vh";
    }
}
function reveal_chats()
{
    chats.style.height = "7vh";
}
var lastScrollTop = 0;
document.addEventListener("scroll", function()
{
    if(!(chats.classList.contains('.opened-chats')))
    {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop)
        {
            // Downscroll code - hide chats
            chats.style.height = "0vh";
        } 
        else 
        {
            // Upscroll code - show chats
            chats.style.height = "7vh";
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
} , false);