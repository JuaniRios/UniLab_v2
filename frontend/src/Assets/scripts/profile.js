var section = document.querySelectorAll('.section');
var item_rect = document.querySelectorAll('.item-rect');

var name1 = '#info-form';
var screen1 = '.smoke-screen-info';
var form1 = document.querySelector(name1);
var button1 = document.querySelector('#info-opener');

var name2 = '#edu-form';
var screen2 = '.smoke-screen-edu';
var form2 = document.querySelector(name2);
var button2 = document.querySelector('#edu-opener');

var name3 = '#xp-form';
var screen3 = '.smoke-screen-xp';
var form3 = document.querySelector(name3);
var button3 = document.querySelector('#xp-opener');

var name4 = '#skill-form';
var screen4 = '.smoke-screen-skill';
var form4 = document.querySelector(name4);
var button4 = document.querySelector('#skill-opener');

function change_section(n)
{
    if (item_rect[n].classList.contains('active-rect'))
    {
        return 0;
    }
    else
    {
        for(var i=0; i<6; i++)
        {
            if(item_rect[i].classList.contains('active-rect'))
            {
                item_rect[i].classList.remove('active-rect');
            }
            if(section[i].classList.contains('active-section'))
            {
                section[i].classList.remove('active-section');
            }
            item_rect[n].classList.add('active-rect');
            section[n].classList.add('active-section');
        }
    }
}
function edit_info(form_name, screen_name)
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'hidden';
    document.querySelector(screen_name).style.display = "flex";
    document.querySelector(form_name).classList.remove('hidden');
}
function close_info(form_name, screen_name)
{
    document.getElementsByTagName("BODY")[0].style.overflow = 'unset';
    document.querySelector(form_name).classList.add('hidden');
    document.querySelector(screen_name).style.display = "none";  
}
function focus_out(self)
{
    self.style.borderBottom = "3px solid rgba(0,0,0,0)";
}
function focus_in(self)
{
    self.style.borderBottom = "3px solid var(--unilab-orange)";
}
document.querySelector(screen1).addEventListener('click', function(e) {if ( !form1.contains(e.target) ) {close_info(name1, screen1);}});
document.querySelector(screen2).addEventListener('click', function(e) {if ( !form2.contains(e.target) ) {close_info(name2, screen2);}});
document.querySelector(screen3).addEventListener('click', function(e) {if ( !form3.contains(e.target) ) {close_info(name3, screen3);}});
document.querySelector(screen4).addEventListener('click', function(e) {if ( !form4.contains(e.target) ) {close_info(name4, screen4);}});