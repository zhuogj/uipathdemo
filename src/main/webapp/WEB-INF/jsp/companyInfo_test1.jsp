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
    <%--编辑对话框配置起点--%>
    <script>
        layui.use(['layer', 'table', 'form', 'element'], function () {
            var layer = layui.layer,
                $ = layui.jquery
                , form = layui.form
                , element = layui.element;
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
                        url: "/companyInfo/edit",
                        data: {"id": data.id},
                        success: function (res) {
                            var mdata = res.data;
                            var dialogPath = mdata.dialogPath;
                            layer.open({
                                type: 1,
                                title: "配置税务软件信息",
                                skin: 'layui-layer-rim',
                                area: ['90%', '90%'],
                                zIndex: 1000,
                                cancel: function (index, layro) {
                                    return false;
                                },
                                content:
                                    '<form class="layui-form" action="/companyInfo/save" id="editForm" >' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">企业名称</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="companyName" id="dialogName" lay-verify="title" autocomplete="off" placeholder="请输入名称" class="layui-input" value="' + mdata.companyName + '">' +
                                    '<input type="hidden" value="' + data.id + '" name="id">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">企业编号</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="licenceNum" id="licenceNum"  autocomplete="off" class="layui-input" value="' + mdata.licenceNum + '">\n' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">登录账号</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="accountId" id="accountId"  autocomplete="off" class="layui-input" value="' + mdata.accountId + '">\n' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">登录密码</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="taxPassword" id="taxPassword"  autocomplete="off" class="layui-input" value="' + mdata.taxPassword + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">软件位置</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="clientPath" id="clientPath"  autocomplete="off" class="layui-input" value="' + mdata.clientPath + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label">备注</label>' +
                                    '<div class="layui-input-block">' +
                                    '<input type="text" name="remarks" id="remarks"  autocomplete="off" class="layui-input" value="' + mdata.remarks + '">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="layui-form-item">' +
                                    '<div class="layui-input-block">' +
                                    '<button class="layui-btn" lay-submit lay-filter="quicklySumbit" >立即提交</button>' +
                                    // '<button type="reset" class="layui-btn layui-btn-primary">重置</button>  ' +
                                    '</div> ' +
                                    '</div>  ' +
                                    '</form>' +
                                    '<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button>'
                            });
                            //表单初始赋值
                            form.val('editForm', {
                                "selectedOperation": mdata.selectedOperation,
                            });
                            //渲染表单
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


    <script id="upload_file_dialog" type="text/html">
        <div class="layui-form-item">
            <div class="layui-form-item">
                <label class="layui-form-label">照片</label>
                <div class="layui-input-block">
                    <input type="file" name="uploadFile" required value="" style="width: 240px" lay-verify="required"
                           autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
    </script>
    <%--文件上传表单终点--%>

    <%--新增对话框配置起点--%>
    <script>

        function addConfiguration() {
            layui.use(['layer', 'form', 'element'], function () {
                var layer = layui.layer
                    , form = layui.form
                    , element = layui.element;
                layer.open({
                    type: 1,
                    title: "配置税务软件信息",
                    skin: 'layui-layer-rim',
                    area: ['90%', '90%'],
                    zIndex: 1000,
                    cancel: function (index, layro) {
                        return false;
                    },
                    content:
                        '<form class="layui-form" action="/companyInfo/save"  id="filetb">' +
                        '<div class="layui-form-item">' +
                        '<label class="layui-form-label" >企业名称</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="companyName" id="companyName"  required lay-verify="required" autocomplete="off" placeholder="请输入名称" class="layui-input" >' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item">' +
                        '<label class="layui-form-label">企业编号</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="licenceNum" id="licenceNum" placeholder="请输入企业编号" autocomplete="off" class="layui-input" >' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item" >' +
                        '<label class="layui-form-label" >登录账号</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="accountId" id="accountId" placeholder="请输入登录账号"  autocomplete="off" class="layui-input" >' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item">' +
                        '<label class="layui-form-label">登录密码</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="taxPassword" id="taxPassword"  placeholder="请输入密码"  autocomplete="off" class="layui-input" >' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item">' +
                        '<label class="layui-form-label">软件位置</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="clientPath" id="clientPath" placeholder="请输入软件本地位置" required autocomplete="off" class="layui-input">' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item">' +
                        '<label class="layui-form-label">备注</label>' +
                        '<div class="layui-input-block">' +
                        '<input type="text" name="remarks" id="remarks"  autocomplete="off" class="layui-input" >' +
                        '</div>' +
                        '</div>' +
                        '<div class="layui-form-item">' +
                        '<div class="layui-input-block">' +
                        '<button class="layui-btn" lay-submit lay-filter="save" >立即提交</button>' +
                        '<button type="reset" class="layui-btn layui-btn-primary">重置</button>  ' +
                        '</div> ' +
                        '</div>  ' +
                        '</form>'
                        +'<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button></div>'

                });
                //重新渲染表单，否则下拉框，单选框等无法加载出来
                form.render();

            });

        };

    </script>
    <%--提交对话框新增起点--%>
    <script>
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer,
                $ = layui.jquery,
                form = layui.form;
            //提交监听事件
            form.on('submit(quicklySumbit)', function (data) {
                console.log(data);
                params = data.field;
                //alert(JSON.stringify(params))
                var formdata = new FormData($("#editForm")[0]);
                var index = layer.load(1, {
                    shade: [0.5, '#000'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: "/companyInfo/save",
                    method: 'post',
                    data: formdata,
                    dataType: 'JSON',
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        // console.log(333);
                        layer.close(index);
                        var resdata = eval(res);
                        layer.alert(resdata.code);
                        if (resdata.msg =='success'){
                            layer.alert('保存成功', {
                                skin: 'layui-layer-molv' //样式类名
                                , closeBtn: 0
                            }, function () {
                                location.reload();
                            });
                        }else {
                            layer.alert(resdata.code+resdata.msg, {
                                skin: 'layui-layer-molv' //样式类名
                                , closeBtn: 0
                            }, function () {
                                location.reload();
                            });
                        }
                        return false;
                    },
                    error: function (res) {
                        location.reload(); // 页面刷新
                        return false;
                    }
                });

                // submit($,params);
                return false;
            });
            var obj = document.getElementById('closeBtn');
            obj.addEventListener('click', function cancel() {
                CloseWin();
            });
        });

        //关闭页面
        function CloseWin() {
            parent.location.reload(); // 父页面刷新
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        }
    </script>
    <%--提交对话框配置编辑终点--%>


    <%--提交对话框新增起点--%>
    <script>
        layui.use(['layer', 'form'], function () {
            var layer = layui.layer,
                $ = layui.jquery,
                form = layui.form;
            //提交监听事件
            form.on('submit(save)', function (data) {
                console.log(data);
                params = data.field;
                //alert(JSON.stringify(params))
                var formdata = new FormData($("#filetb")[0]);
                var index = layer.load(1, {
                    shade: [0.5, '#000'] //0.1透明度的白色背景
                });
                $.ajax({
                    url: "/companyInfo/save",
                    method: 'post',
                    data: formdata,
                    dataType: 'JSON',
                    processData: false,
                    contentType: false,
                    success: function (res) {
                        layer.close(index);
                        var resdata = eval(res);
                        if (resdata.msg =='success'){
                            layer.alert('保存成功', {
                                skin: 'layui-layer-molv' //样式类名
                                , closeBtn: 0
                            }, function () {
                                location.reload();
                            });
                        }else {
                            layer.alert(resdata.code+resdata.msg, {
                                skin: 'layui-layer-molv' //样式类名
                                , closeBtn: 0
                            }, function () {
                                location.reload();
                            });
                        }
                        return false;
                    },
                    error: function (res) {
                        console.log(res.code);
                        // location.reload(); // 页面刷新
                        // return false
                    }
                });

                // submit($,params);
                return false;
            })
            var obj = document.getElementById('closeBtn');
            obj.addEventListener('click', function cancel() {
                CloseWin();
            });
        })

        //关闭页面
        function CloseWin() {
            parent.location.reload(); // 父页面刷新
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        }
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
                            <th lay-data="{field:'companyName', width:176, sort: true}">企业名称</th>
                            <th lay-data="{field:'licenceNum', width:176}">企业编号</th>
                            <th lay-data="{field:'accountId', width:176, sort: true}">软件登录账号</th>
                            <th lay-data="{field:'taxPassword', width:176, sort: true}">软件登录密码</th>
                            <th lay-data="{field:'clientPath', width:176, sort: true}">软件本地位置</th>
                            <th lay-data="{field:'createTime', width:176, sort: true}">创建时间</th>
                            <th lay-data="{field:'remarks', width:176, sort: true}">备注</th>
                            <th lay-data="{fixed: 'right', width:160, align:'center', toolbar: '#barDemo'}">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${list}" var="p" varStatus="index">
                            <tr>
                                <td>${index.count}</td>
                                <td>${p.id}</td>
                                <td>${p.companyName}</td>
                                <td>${p.licenceNum}</td>
                                <td>${p.accountId}</td>
                                <td>${p.taxPassword}</td>
                                <td>${p.clientPath}</td>
                                <td>${p.createTime}</td>
                                <td>${p.remarks}</td>
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
