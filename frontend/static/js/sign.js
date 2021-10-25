function focus_out(strin, strin2)
{
    document.querySelector(strin).style.borderBottom = "3px solid rgba(0,0,0,0)";
    document.querySelector(strin2).style.opacity = '0';
}
function focus_in(strin)
{
    document.querySelector(strin).style.backgroundColor = "var(--unilab-white)";
    document.querySelector(strin).style.borderBottom = "3px solid var(--unilab-orange)";
}
function validate_form_1()
{
    var fail = 0;
    if(document.querySelector('.email').value.length == 0)
    {
        document.querySelector('.email-error').style.opacity = '1';
        document.querySelector('.email').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(document.querySelector('.password').value.length == 0)
    {
        document.querySelector('.password-error').style.opacity = '1';
        document.querySelector('.password').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(fail) return false;
    return true;
}
function name_check(strin, strin2)
{
    if (document.querySelector(strin).value.length > 30)
    {
        document.querySelector(strin2).innerHTML = "⚠ Cannot be longer than 30 characters.";
        document.querySelector(strin2).style.opacity = '1';
        document.querySelector(strin).style.backgroundColor = 'rgba(255,0,0,0.2)';
        return true;
    }
    if ( /\d/.test(document.querySelector(strin).value) )
    {
        document.querySelector(strin2).innerHTML = "⚠ Cannot contain numbers.";
        document.querySelector(strin2).style.opacity = '1';
        document.querySelector(strin).style.backgroundColor = 'rgba(255,0,0,0.2)';
        return true;
    }
    return false;
}
function validate_form_2()
{
    var fail = 0;
    var name1_fail = name_check('.fname', '.fname-error');
    var name2_fail = name_check('.lname', '.lname-error');
    if(document.querySelector('.fname').value.length == 0)
    {
        document.querySelector('.fname-error').innerHTML = '⚠ Missing field.';
        document.querySelector('.fname-error').style.opacity = '1';
        document.querySelector('.fname').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(document.querySelector('.lname').value.length == 0)
    {
        document.querySelector('.lname-error').innerHTML = '⚠ Missing field.';
        document.querySelector('.lname-error').style.opacity = '1';
        document.querySelector('.lname').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(document.querySelector('.email').value.length == 0)
    {
        document.querySelector('.email-error').innerHTML = '⚠ Missing field.';
        document.querySelector('.email-error').style.opacity = '1';
        document.querySelector('.email').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(document.querySelector('.password').value.length == 0)
    {
        document.querySelector('.password-error').innerHTML = '⚠ Missing field.';
        document.querySelector('.password-error').style.opacity = '1';
        document.querySelector('.password').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(document.querySelector('.password2').value.length == 0)
    {
        document.querySelector('.password2-error').innerHTML = '⚠ Missing field.';
        document.querySelector('.password2-error').style.opacity = '1';
        document.querySelector('.password2').style.backgroundColor = 'rgba(255,0,0,0.2)';
        fail = 1;
    }
    if(!(document.querySelector('.password').value == document.querySelector('.password2').value))
    {
        if(document.querySelector('.password').value.length != 0 && document.querySelector('.password2').value.length != 0)
        {
            document.querySelector('.password2-error').innerHTML = '⚠ Passwords do NOT match.';
            document.querySelector('.password2-error').style.opacity = '1';
            document.querySelector('.password').style.backgroundColor = 'rgba(255,0,0,0.2)';
            document.querySelector('.password2').style.backgroundColor = 'rgba(255,0,0,0.2)';
            fail = 1;
        }
    }
    if(fail || name1_fail || name2_fail) return false;
    return true;
}