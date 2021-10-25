var upvote = document.querySelectorAll('.upvote');
var downvote = document.querySelectorAll('.downvote');
var total_points = document.querySelectorAll('.total-points');
var sorting_item = document.querySelectorAll('.sorting-item');
var triangles = document.querySelectorAll('.triangle');
var chat_menu = document.querySelectorAll('.chat-options-menu');
var chat_options = document.querySelectorAll('.chat-options');
var post_field = document.querySelector('.post-field');
var smoke_screen_v3 = document.querySelector('.smoke-screen-v3');

function toggle_sort(self, string1)
{
    for(var i=0; i<4; i++)
    {
        sorting_item[i].classList.remove('toggled');
    }
    self.classList.add('toggled');
}
function focus_out(self)
{
    self.style.borderBottom = "3px solid rgba(0,0,0,0)";
}
function focus_in(self)
{
    self.style.borderBottom = "3px solid var(--unilab-orange)";
}
// Showing the post form
function open_postfield()
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'hidden';
    post_field.style.display = "flex";
    smoke_screen_v3.style.display = "flex";
}
function close_postfield()
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'unset';
    post_field.style.display = "none";
    smoke_screen_v3.style.display = "none";
}
// Displaying post picture in a bigger frame
function open_image(self)
{
    document.body.style.overflow = "hidden";
    document.querySelector('.smoke-screen-picture-frame').style.display = "flex";
    document.querySelector('.picture-frame').style.display = "flex";
    document.querySelector('.picture-frame').src = self.src;
}
function close_image()
{
    document.body.style.overflow = "unset";
    document.querySelector('.smoke-screen-picture-frame').style.display = "none";
    document.querySelector('.picture-frame').style.display = "none";
    document.querySelector('.picture-frame').src = "";
}
// Hiding post
var postHTML = [];
function hide_post(url)
{
    var id = '#post' + url.slice(32);
    id2 = id.slice(0, -1);
    html1 = document.querySelector(id2).innerHTML;
    postHTML.push(html1);
    l1 = postHTML.length;
    document.querySelector(id2).innerHTML = `<h2 class='special-h1'>Post Hidden. <button class='special-button' onclick='undo_hidden_post( "${id2}", "${l1}" )'>Undo</button></h2>`;
}
// Undo hidden post
function undo_hidden_post(id, leng)
{
    var l1 = parseInt(leng) - 1;
    document.querySelector(id).innerHTML = postHTML[l1];
}
// Show comment section
function show_comments(url)
{
    var id = '#commentsection' + url.slice(32);
    id2 = id.slice(0, -1);
    if(document.querySelector(id2).classList.contains("hidden"))
    {
        document.querySelector(id2).classList.remove("hidden");
    }
    else
    {
        document.querySelector(id2).classList.add("hidden");
    }
}

window.addEventListener('click',
function(e)
{
    var button2 = document.querySelector(`.post-emoji-button`);
    var container2 = document.querySelector(`.post-emoji-container`);

    if ( !button2.contains(e.target) && !container2.contains(e.target) )
    {
        // Click outside element
        close_emoji_container( `.post-emoji-container` , `.post-emoji-triangle` , e.target );
    }
});