$(document).ready(function ()
{
    $("#IbtnEnter").click(function ()
    {
        $.ajax({
            type: "get",
            url: "/Home/LoginIn",
            data: {
                username: $("#TxtUserName").val(),
                password: $("#TxtPassword").val()
            },
            success: function (data)
            {
                if (data.status)
                {
                    window.location.href = "/Home/Index";
                }
                else
                {
                    alert(data.message);
                }
            }
        });
    });
})