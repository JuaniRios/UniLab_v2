function ajax_call_1(method, path, token)
{
    var xhttp = new XMLHttpRequest();

    xhttp.open(method, path, true);

    header = "Bearer " + token;
    xhttp.setRequestHeader('Authorization', header);

    xhttp.onload = function()
    {
        if (this.status == 200) 
        {
            var data = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = 
            data['first_name'] + " " + data['last_name'];
        }
        else
        {
            var data = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = 
            data['detail'];
        }
    };

    xhttp.send();
}