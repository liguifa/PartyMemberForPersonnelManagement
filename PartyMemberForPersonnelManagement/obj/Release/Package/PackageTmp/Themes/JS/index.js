var time;
$(document).ready(function ()
{
    $('#dg').datagrid({
        url: '/Home/GetUserList',
        fit: true,
        fitColumns: true,
        striped: true,
        rownumbers: true,
        pagination: true,
        singleSelect: true,
        columns: [[
            { field: 'ID', title: 'id', hidden: true, width: 100 },
            { field: 'school', title: '学院', width: 100 },
            { field: 'image', title: '相片', width: 100, formatter: getButton },
            { field: 'Name', title: '姓名', width: 100 },
            { field: 'class', title: '班级', width: 100 },
            { field: 'StudentId', title: '学号', width: 100 },
            { field: 'Sex', title: '性别', width: 100, formatter: GetSex },
            { field: 'BirthDate', title: '出生日期', width: 100, formatter: getDate },
            { field: 'Address', title: '家庭地址', width: 100, formatter: getDate },
            { field: 'SubmitDate', title: '提交入党申请书日期', width: 100, formatter: getDate },
            { field: 'SuccessDate', title: '成为积极分子日期', width: 100, formatter: getDate },
            { field: 'GraduationDate', title: '党校结业日期', width: 100, formatter: getDate },
            { field: 'Absorption', title: '吸收为预备党员日期', width: 100, formatter: getDate },
            { field: 'Positive', title: '转为中共党员日期', width: 100, formatter: getDate },
            { field: 'append', title: '备注', width: 100 }
        ]],
        toolbar: [{
            id: "edit",
            iconCls: 'icon-edit',
            text: "编辑",
            disabled: true,
            handler: function ()
            {
                var row = $("#dg").datagrid("getSelected");
                $("body").append(" <div id='dd'></div>");
                $('#dd').dialog({
                    title: '编辑人员',
                    width: 400,
                    height: 420,
                    closed: false,
                    cache: false,
                    modal: true,
                    method: "post",
                    href: "/Home/UpdateData",
                    queryParams: {
                        id: row.ID
                    },
                    buttons: [{
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function ()
                        {
                            var row = $("#dg").datagrid("getSelected");
                            $.messager.progress({ title: "请稍后...", msg: "玩命修改中...", text: "请稍后..." });
                            $.ajax({
                                type: "post",
                                url: "/Home/UpdateDataIn",
                                data: {
                                    id: row.ID,
                                    name: $("#name").val(),
                                    stuId: $("#stuId").val(),
                                    sex: $("#sex").val(),
                                    arddress: $("#arddress").val(),
                                    cs: $("#cs").datebox("getText"),
                                    tj: $("#tj").datebox("getText"),
                                    cw: $("#cw").datebox("getText"),
                                    jy: $("#jy").datebox("getText"),
                                    ss: $("#ss").datebox("getText"),
                                    zz: $("#zz").datebox("getText")
                                },
                                success: function (data)
                                {
                                    $.messager.progress('close');
                                    if (data.status)
                                    {
                                        $.messager.alert("提示", data.message, "ok");
                                    }
                                    else
                                    {
                                        $.messager.alert("提示", data.message, "error");
                                    }
                                    $(".window").remove();
                                    $(".window-shadow").remove();
                                    $(".window-mask").remove();
                                    $("#dg").datagrid("reload", null);
                                }
                            });
                        }
                    }, {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function ()
                        {
                            $(".window").remove();
                            $(".window-shadow").remove();
                            $(".window-mask").remove();
                        }
                    }]
                });
            }
        }, '-', {
            id: "add",
            iconCls: 'icon-add',
            text: "添加",
            handler: function ()
            {
                $("body").append(" <div id='dd'></div>");
                $('#dd').dialog({
                    title: '添加人员',
                    width: 400,
                    height: 420,
                    closed: false,
                    cache: false,
                    modal: true,
                    method: "post",
                    href: "/Home/AddData",
                    buttons: [{
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function ()
                        {
                            $.messager.progress({ title: "请稍后...", msg: "玩命添加中...", text: "请稍后..." });
                            $.ajax({
                                type: "post",
                                url: "/Home/AddDataIn",
                                data: {
                                    name: $("#name").val(),
                                    stuId: $("#stuId").val(),
                                    sex: $("#sex").val(),
                                    arddress: $("#arddress").val(),
                                    school: $("#school").val(),
                                    classRome: $("#classRome").val(),
                                    append: $("#append").val(),
                                    cs: $("#cs").datebox("getText"),
                                    tj: $("#tj").datebox("getText"),
                                    cw: $("#cw").datebox("getText"),
                                    jy: $("#jy").datebox("getText"),
                                    ss: $("#ss").datebox("getText"),
                                    zz: $("#zz").datebox("getText")
                                },
                                success: function (data)
                                {
                                    $.messager.progress('close');
                                    if (data.status)
                                    {
                                        $.messager.alert("提示", data.message, "ok");
                                    }
                                    else
                                    {
                                        $.messager.alert("提示", data.message, "error");
                                    }
                                    $(".window").remove();
                                    $(".window-shadow").remove();
                                    $(".window-mask").remove();
                                    $("#dg").datagrid("reload", null);
                                }
                            });
                        }
                    }, {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function ()
                        {
                            $(".window").remove();
                            $(".window-shadow").remove();
                            $(".window-mask").remove();
                        }
                    }]
                });
            }
        }, '-', {
            id: "remove",
            iconCls: 'icon-remove',
            text: "删除",
            disabled: true,
            handler: function ()
            {
                $.messager.confirm('确认对话框', '你确定要删除这条数据吗？', function (r)
                {
                    if (r)
                    {
                        $.messager.progress({ title: "请稍后...", msg: "玩命删除中...", text: "请稍后..." });
                        var row = $("#dg").datagrid("getSelected");
                        if (row != null)
                        {
                            $.ajax({
                                type: "post",
                                url: "/Home/DelUser",
                                data: {
                                    id: row.ID
                                },
                                success: function (data)
                                {
                                    $.messager.progress('close');
                                    if (data.status)
                                    {
                                        $.messager.alert('消息', data.message, 'ok');
                                    }
                                    else
                                    {
                                        $.messager.alert('消息', data.message, 'error');
                                    }
                                    $("#dg").datagrid("reload", null);
                                }
                            });
                        }
                        else
                        {
                            $.messager.progress('close');
                            $.messager.alert('错误', '请先选择数据行之后执行删除！', 'error');
                        }
                    }
                });


            }
        }
        //, '-', {
        //    id: "import",
        //    iconCls: 'icon-add',
        //    text: "导入",
        //    handler: function () { alert('帮助按钮') }
        //}
        ],
        onSelect: function (rowIndex, rowData)
        {
            $('#edit').linkbutton('enable');
            $('#remove').linkbutton('enable');
        }
    });

    $(".panel-title:last").html("<a href='http://www.liguifa.wang' target='_blank'>关于作者</a>");
    // $(".panel-body").Css("background", "/Themes/Images/bg.jpg");
    $(".panel-header:first").append("<a href='javascript:updatePassword()' style='float:right;margin-top:-18px;margin-right:15px;cursor:pointer'>修改密码</a>");
});
var msg;
function UpdateCall()
{
    var data = $(window.frames["iframe"].document).find("body").text();
    if (data != "")
    {
        clearInterval(time);
        layer.close(msg);
        data = JSON.parse(data);
        if (data.status)
        {
            setCookie('image', data.append, 1);
        }
        alert(data.message);
    }
}

function GetSex(value)
{
    switch (value)
    {
        case "0": return "男";
        case "1": return "女";
    }
}

function getDate(date)
{
    return date.split(' ')[0];
}

function getButton(value)
{
    return "<img style='width:50px;height:50px' src='" + value + "' onclick='searchImage(\"" + value + "\")' />";
}

function searchImage(value)
{
    $.layer({
        type: 1,
        title: false, //不显示默认标题栏
        shade: [0], //不显示遮罩
        area: ['600px', '360px'],
        page: { html: '<img src="' + value + '">' }
    });
}

function UpdateImage()
{
    msg = layer.load('上传中...', 300000000000000000);
    $("#update").trigger("click");
    time = setInterval("UpdateCall()", 1000);
}

function updatePassword()
{
    var pwd = "";
    $.messager.prompt('提示', '请输入当前密码?', function (r)
    {
        if (r)
        {
            pwd = r;
            $.messager.prompt('提示', '请输入新密码?', function (r1)
            {
                if (r1)
                {
                    msg = layer.load('玩命修改中...', 300000000000);
                    $.ajax({
                        type: "post",
                        url: "/Home/UpdatePassword",
                        data: {
                            pwd: pwd,
                            new_pwd: r1
                        },
                        success: function (data)
                        {
                            layer.close(msg);
                            if (data.status)
                            {
                                $.messager.alert('消息', data.message, 'ok');
                            }
                            else
                            {
                                $.messager.alert('消息', data.message, 'error');
                            }
                        }
                    });
                }
            });
        }
    });


}