$(document).ready(function ()
{
    $("#IbtnEnter").click(function ()
    {
        $.ajax({
            type: "post",
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