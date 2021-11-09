// Creating a string of the selected HTML entities
function create_emoji_string(list, start, end, tid, id)
{
    for (var i=start; i<end; i++)
    {
        var emoji_code = "&#" + i + ';';
        
        list = list + 
        `<span onclick="paste_emoji('${tid}', '${emoji_code}')" class="emoji-block emoji-block${id} noselect">${emoji_code}</span>`;
    }
    return list;
}
// Injecting the emoji string into the container
function inject_emojis(emojis_id, textfield_id, triangle_id, id)
{
    var list = '';
    var tid = textfield_id;

    document.querySelector(emojis_id).innerHTML = create_emoji_string(list,127744,128912,tid, id);

    if ( !document.querySelector(emojis_id).classList.contains('toggled-emoji') )
    {
        document.querySelector(emojis_id).classList.add('toggled-emoji');
        document.querySelector(emojis_id).style.display = 'block';
        document.querySelector(triangle_id).style.display = 'block';
    }
    else
    {
        document.querySelector(emojis_id).classList.remove('toggled-emoji');
        document.querySelector(emojis_id).style.display = 'none';
        document.querySelector(triangle_id).style.display = 'none';
    }
}
// Putting the selected emoji into the input field
function paste_emoji(tid, emoji_code)
{
    document.querySelector(tid).value = document.querySelector(tid).value + emoji_code;
}
// Closing the container
function close_emoji_container(emoji_class, triangle_id, target)
{
    if ( target != '[object HTMLSpanElement]' )
    {
        var array1 = document.querySelector(emoji_class);
        var array2 = document.querySelector(triangle_id);
        array1.style.display = 'none';
        array2.style.display = 'none';
        if(array1.classList.contains('toggled-emoji'))
        {
            array1.classList.remove('toggled-emoji');
        }
    }
}
