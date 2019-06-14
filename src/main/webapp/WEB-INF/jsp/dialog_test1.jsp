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
        layui.use(['layer', 'table', 'form','element'], function () {
            var layer = layui.layer,
                $ = layui.jquery
                , form = layui.form
                , element = layui.element;
            var table = layui.table;
            //监听工具条
            table.on('tool(demo)', function (obj) {
                var data = obj.data;
                if (obj.event === 'delete') {
                    layer.confirm('真的删除行么', function (index) {
                        obj.del();
                        layer.close(index);
                        $.ajax({
                            type: "GET",
                            dataType: "json",
                            contentType: "application/json",
                            url: "/dialog/delete",
                            data: {"id": data.id},
                            success: function (res) {
                                if (res.code==1){
                                    layer.close(index);
                                } else {
                                    layer.alert("删除异常，请重试！");
                                }

                            }
                        })
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
                                content: '<form class="layui-form" action="/dialog/save" id="editForm" >' +
                                    '            <div class="layui-form-item">' +
                                    '                <label class="layui-form-label">对话框名称</label>' +
                                    '                <div class="layui-input-block">' +
                                    '                    <input type="text" name="dialogName" id="dialogName" lay-verify="title" autocomplete="off" placeholder="请输入名称" class="layui-input" value="' + mdata.dialogName + '">' +
                                    '<input type="hidden" value="' + data.id + '" name="id">' +
                                    '                </div>' +
                                    '            </div>' +
                                    '            <div class="layui-form-item">' +
                                    '                <label class="layui-form-label">对话框内容</label>' +
                                    '                <div class="layui-input-block">' +
                                    '                    <input type="text" name="dialogContent" id="dialogContent" readonly autocomplete="off" class="layui-input" value="' + mdata.dialogContent + '">\n' +
                                    '                </div>' +
                                    '            </div>' +
                                    '            <div class="layui-form-item">' +
                                    '                <label class="layui-form-label">图片地址</label>' +
                                    '                <div class="layui-input-block">' +
                                    '                    <input type="text" name="dialogPath" id="dialogPath" readonly autocomplete="off" class="layui-input" value="' + mdata.dialogPath + '">\n' +
                                    '                </div>' +
                                    '            </div>' +
                                    '' +
                                    '            <div class="layui-form-item">' +
                                    '                <label class="layui-form-label">选择操作</label>' +
                                    '                <div class="layui-input-block">' +
                                    '                    <input type="radio" name="selectedOperation" value="确定" title="确定" checked="" >' +
                                    '                    <input type="radio" name="selectedOperation" value="取消" title="取消">' +
                                    '                    <input type="radio" name="selectedOperation" value="其它" title="其它" >' +
                                    '                </div>' +
                                    '            </div>' +
                                    '            <div class="layui-form-item">' +
                                    '                <label class="layui-form-label">当前图片</label>' +
                                    '                <img src="https://www.51shebao.com/201906061201/statics/output/images/index/13.png">' +
                                    '            </div>' +
                                    '<div class="layui-form-item">' +
                                    '<div class="layui-input-block">' +
                                    '<button class="layui-btn" lay-submit lay-filter="quicklySumbit" >立即提交</button>' +
                                    // '<button type="reset" class="layui-btn layui-btn-primary">重置</button>  ' +
                                    '</div> ' +
                                    '</div>  ' +
                                    '        </form>'
                                    +'<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button></div>'

                            });
                            //表单初始赋值
                            form.val('editForm', {
                                "selectedOperation": mdata.selectedOperation,
                            });
                            form.render();
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
    <script>
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer,
                $ = layui.jquery,
                form = layui.form;
            //提交监听事件
            form.on('submit(quicklySumbit)', function (data) {
                console.log(data);
                params = data.field;
                console.log(params.dialogName);
                //alert(JSON.stringify(params))
                var formdata = new FormData($("#editForm")[0]);
                var index = layer.load(1, {
                    shade: [0.5, '#000'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: "/dialog/save",
                    method: 'post',
                    data: formdata,
                    dataType: 'JSON',
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        // console.log(333);
                        layer.close(index);
                        layer.alert('上传成功', {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0
                        }, function () {
                            location.reload();
                        });
                        // location.reload(); // 页面刷新
                        return false
                    },
                    error: function (res) {
                        console.log(res.code);
                        // location.reload(); // 页面刷新
                        // return false
                    }
                })

                // submit($,params);
                return false;
            });

        });
        var obj = $("#cancelButton");
        // var obj = document.getElementById('cancelButton');
        obj.addEventListener('click', function cancel() {
            CloseWin();
        });
        //关闭页面
        function CloseWin() {
            parent.location.reload(); // 父页面刷新
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        }
    </script>
    <%--提交对话框编辑配置起点--%>


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
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="delete">删除</a>
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
