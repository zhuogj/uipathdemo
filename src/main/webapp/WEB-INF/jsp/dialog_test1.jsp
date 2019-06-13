<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>对话框配置界面</title>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
    <script type="text/javascript" src="layui/layui.js"></script>
    <script src="js/jquery-3.2.1.js"></script>
    <script src="js/jquery-migrate-1.1.0.js"></script>
    <style>
        <!--
        body {
            margin: 10px;
        }

        .demo-carousel {
            height: 200px;
            line-height: 200px;
            text-align: center;
        }

        .table {
            width: auto;
            height: auto;
        }

        .layui-field-title {
            margin: 5px;
        }
    </style>
    <script id="edit-form" type="text/html">

    </script>
    <%--编辑对话框配置起点--%>
    <script>
        layui.use('table', function () {
            var table = layui.table;
            //监听工具条
            table.on('tool(demo)', function (obj) {
                var data = obj.data;
                if (obj.event === 'del') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                    });
                } else if (obj.event === 'edit') {
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        contentType: "application/json",
                        url: "/dialog/edit",
                        data: {"id": data.id},
                        success: function (res) {
                            var mdata = res.data;
                            var dialogPath = mdata.dialogPath;
                            layer.open({
                                type: 1,
                                title: "配置图片信息",
                                skin: 'layui-layer-rim',
                                area: ['800px', '800px'],
                                zIndex: 1000,
                                cancel: function (index, layro) {
                                    return false;
                                },
                                content:

                            });
                        }
                    })
                }
            });

            $('.demoTable .layui-btn').on('click', function () {
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });
        });
    </script>
    <%--编辑对话框配置终点--%>

    <%--提交对话框编辑配置起点--%>
    <script>

        function submitConfiguration() {
            // alert("aa");
            var dialogName = $("#dialogName").val();
            var id = $("#dialogId").val();
            var dialogContent = $("#dialogContent").val();
            var optionalOperation = $("#optionalOperation").val();
            var selectedOperation = $("#selectedOperation").val();
            alert(dialogName + dialogContent + optionalOperation + selectedOperation);
            if (dialogName == null || dialogName == '' || dialogId == null || dialogId == '' || dialogContent == null || dialogContent == '' || selectedOperation == '' || selectedOperation == null) {
                alert("配置信息不完整！");
                return false;
            } else {
                $.ajax({
                    url: '/dialog/save',
                    async: false,
                    data: {
                        id: id,
                        dialogName: dialogName,
                        dialogContent: dialogContent,
                        selectedOperation: selectedOperation
                    },
                    success: function (data) {
                        if (data != "success") {
                            layer.msg('更新数据失败!');
                        } else {
                            layer.msg('更新数据成功，即将跳转至列表页', {icon: 1});
                            window.location.href = "/dialog/getList";
                        }
                    },
                    error: function (e) {
                        alert("异常，请重试！");
                    }
                })
            }
        };
    </script>



</head>
<body>
<%@ include file="head.jsp" %>
<div id="content">
    <div>
        <div class="layui-row layui-col-space15">
            <div>
                <div class="table">
                    <table class="layui-table" lay-data="{height: '410',cellMinWidth: 80,limit:50}" lay-filter="demo">
                        <thead>
                        <tr>
                            <th lay-data="{field:'xuhao', width:75, sort: true, fixed: true}">序号</th>
                            <th lay-data="{field:'id', width:75, sort: true, fixed: true}">id</th>
                            <th lay-data="{field:'dialogName', width:176, sort: true}">对话框名称</th>
                            <th lay-data="{field:'dialogContent', width:415}">对话框内容</th>
                            <th lay-data="{field:'selectedOperation', width:176, sort: true}">已选操作</th>
                            <th lay-data="{field:'updateTime', width:176, sort: true}">最近修改</th>
                            <th lay-data="{field:'updateBy', width:176, sort: true}">修改人</th>
                            <th lay-data="{field:'dialogPath', width:176, sort: true}">文件地址</th>
                            <th lay-data="{fixed: 'right', width:160, align:'center', toolbar: '#barDemo'}">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${list}" var="p" varStatus="index">
                            <tr>
                                <td>${index.count}</td>
                                <td>${p.id}</td>
                                <td>${p.dialogName}</td>
                                <td>${p.dialogContent}</td>
                                <td>${p.selectedOperation}</td>
                                <td>${p.updateTime}</td>
                                <td>${p.updateBy}</td>
                                <td>${p.dialogPath}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>

                <script type="text/html" id="barDemo">
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="edit">编辑</a>
                </script>
                <div class="input">
                    <div class="layui-form-item">
                        <button class="layui-btn layui-btn-primary layui-btn-radius print"
                                onClick="javaScript:history.go(-1)">返回
                        </button>
                        <button class="layui-btn layui-btn-primary layui-btn-radius print"
                                onClick="addConfiguration()">添加
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
