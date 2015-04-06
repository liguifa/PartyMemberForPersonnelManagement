function setCookie(c_name, c_value, c_time)
{
    var date = new Date();
    date.setHours(date.getHours() + c_time);
    document.cookie = c_name + "=" + c_value + ";expires=" + date.toGMTString();
}

function getCookie(c_name)
{

    if (document.cookie.length > 0)
    {
        var cookie = document.cookie.replace(" ", "");
        var cookies = cookie.split(";");
        for (var x in cookies)
        {
            var ce = cookies[x].split(",")[0].split("=");
            if (ce[0].replace(" ", "") == c_name)
            {
                return ce[1];
            }
        }
    }
    return null;
}