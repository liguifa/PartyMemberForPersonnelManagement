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
            { field: 'Name', title: '姓名', width: 100 },
            { field: 'StudentId', title: '学号', width: 100 },
            { field: 'Sex', title: '性别', width: 100, formatter: GetSex },
            { field: 'BirthDate', title: '出生日期', width: 100 },
            { field: 'Address', title: '家庭地址', width: 100 },
            { field: 'SubmitDate', title: '提交入党申请书日期', width: 100 },
            { field: 'SuccessDate', title: '成为预备党员日期', width: 100 },
            { field: 'GraduationDate', title: '党校结业日期', width: 100 },
            { field: 'Absorption', title: '吸收为预备党员日期', width: 100 },
            { field: 'Positive', title: '转为中共党员日期', width: 100 }
        ]],
        toolbar: [{
            id: "edit",
            iconCls: 'icon-edit',
            text: "编辑",
            disabled: true,
            handler: function ()
            {

            }
        }, '-', {
            id: "add",
            iconCls: 'icon-add',
            text: "添加",
            handler: function ()
            {
                $('#dd').dialog({
                    title: '添加人员',
                    width: 400,
                    height: 200,
                    closed: false,
                    cache: false,
                    modal: true,
                    method: "post",
                    href: "/Home/AddData"
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
        }, '-', {
            id: "import",
            iconCls: 'icon-add',
            text: "导入",
            handler: function () { alert('帮助按钮') }
        }],
        onSelect: function (rowIndex, rowData)
        {
            $('#edit').linkbutton('enable');
            $('#remove').linkbutton('enable');
        }
    });
});

function GetSex(value)
{
    switch (value)
    {
        case "0": return "男";
        case "1": return "女";
    }
}