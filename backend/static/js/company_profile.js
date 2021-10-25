frame_screen = document.querySelectorAll('.smoke-screen-skill')[0];
frame_container = document.querySelectorAll('.frame-container')[0];
frame_img = document.querySelectorAll('.frame-img')[0];

function display_in_frame(self)
{
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    frame_img.src = self.src;
    frame_img.classList.remove('hidden');
    frame_screen.style.display = "flex";
}
function close_frame()
{
    document.getElementsByTagName('body')[0].style.overflow = "unset";
    frame_img.src = "";
    frame_img.classList.add('hidden');
    frame_screen.style.display = "none";
}

frame_screen.addEventListener('click',
function(e)
{
    if ( !frame_container.contains(e.target) )
    {
        // Click outside element
        close_frame();
    }
})

function close_applicants()
{
    document.querySelector('.applications-sm-screen').style.display = "none";
}

document.querySelector('.applications-sm-screen').addEventListener('click',
function(e)
{
    if ( !document.querySelector('.company-wrapper').contains(e.target) )
    {
        // Click outside element
        close_applicants();
    }
})

function open_job_options()
{
    document.querySelector('.triple-dot-btn').style.backgroundColor = "var(--gray-hover)";
    document.querySelector('.dot-menu-down').style.display = "flex";
}
function close_job_options()
{
    document.querySelector('.dot-menu-down').style.display = "none";
    document.querySelector('.triple-dot-btn').style.backgroundColor = "var(--unilab-white)";
}

window.addEventListener('click',
function(e)
{
    if ( !document.querySelector('.triple-dot-btn').contains(e.target) )
    {
        // Click outside element
        close_job_options();
    }
})