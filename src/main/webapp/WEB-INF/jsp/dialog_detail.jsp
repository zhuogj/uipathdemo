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

        -->

        /*.photo{*/
        /*height:400px;*/
        /*width:97%;*/
        /*border:#C1C1C1 solid 1px;*/
        /*float:left;*/
        /*margin:20px 20px;*/
        /*}*/
        .table {
            width: auto;
            height: auto;
        }

        /*.input{*/
        /*margin-top:10px;*/
        /*clear:both;*/
        /*height:85px;*/
        /*width:100%;*/
        /*}*/
        /*.layui-form-label{*/
        /*width:112px;*/
        /*}*/
        /*.print{*/
        /*width: 110px;*/
        /*height: 47px;*/
        /*font-size: 16px;*/
        /*margin-left:50px;*/
        /*}*/
        .layui-field-title {
            margin: 5px;
        }
    </style>
    <script>

        // function expressDelivery(){
        //     layui.use('layer', function(){ //独立版的layer无需执行这一句
        //         var layer = layui.layer; //独立版的layer无需执行这一句
        //
        //         layer.confirm('是否确认所有文件都拍摄完毕，确认后将提交电子文件。<br>注意：提交后不可修改！', {
        //             btn: ['确定','取消'] //按钮
        //         }, function(){
        //             layer.msg('正在处理图片...', {
        //                 icon: 16
        //                 ,shade: 0.01
        //             },function(){
        //                 layer.msg('图片已转换pdf并上传成功！即将为您跳转到打印快递单页面。', {icon: 1},
        //                     function(){
        //                         window.location.href='/expressDelivery';
        //                     }
        //                 );
        //             });
        //         });
        //     });
        // }

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
                                    '<div id="configure">'
                                    + '   <div class="layui-carousel" id="test3" lay-filter="test3">' +
                                    '<div style="padding-left:70px"><img id="element_id0" style="width: 860px;height: 588px;margin-left: 70px;margin-bottom: 15px;"  src="' + dialogPath + '"/>' +
                                    '<div>' +
                                    '<div class="layui-form-item">' +
                                    '<label class="layui-form-label carouselLabel">对话框名称</label> ' +
                                    '<div class="layui-input-inline">' +
                                    '<input name="dialogName" id="dialogName" lay-verify=required" autocomplete="off" placeholder="对话框名称" class="layui-input configInput" value="' + mdata.dialogName + '" required> ' +
                                    '<input id = "dialogId" name = "id"  value = "'+ mdata.id + '" type = "hidden">' +
                                '</div>' +
                                    '<label class="layui-form-label carouselLabel">对话框内容</label> ' +
                                    '<div class="layui-input-inline">' +
                                    '<input name="dialogContent" id="dialogContent" lay-verify=required"  placeholder="对话框名称" class="layui-input configInput" value="' + mdata.dialogContent + '" required> ' +
                                    '</div>' +
                                    '<label class="layui-form-label carouselLabel">可选操作</label> ' +
                                    '<div class="layui-input-inline">' +
                                    '<input name="optionalOperation" id="optionalOperation"  readonly lay-verify=required" autocomplete="off" placeholder="对话框名称" class="layui-input configInput" value="' + mdata.optionalOperation + '" required> ' +
                                    '</div>' +
                                    '<label class="layui-form-label carouselLabel">已选操作</label> ' +
                                    '<div class="layui-input-inline">' +
                                    '<input name="selectedOperation" id="selectedOperation" lay-verify=required" autocomplete="off" placeholder="对话框名称" class="layui-input configInput" value="' + mdata.selectedOperation + '" required> ' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                                    + '</div>'
                                    + '<button id="button" class="layui-btn" style="width:143px;height:40px;margin-top:22px;margin-left:240px;float:left;" onclick="submitConfiguration()">完成配置</button>'
                                    + '<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button></div>'
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
    <script>
        layui.use('form', function(){  //此段代码必不可少
            var form = layui.form;
            form.render();
        });
        function submitConfiguration() {
            // alert("aa");
            var dialogName = $("#dialogName").val();
            var id = $("#dialogId").val();
            var dialogContent = $("#dialogContent").val();
            var optionalOperation = $("#optionalOperation").val();
            var selectedOperation = $("#selectedOperation").val();
            alert(dialogName+dialogContent+optionalOperation+selectedOperation);
            if (dialogName==null||dialogName==''||dialogId==null ||dialogId==''||dialogContent==null||dialogContent==''||optionalOperation==null||optionalOperation==''||selectedOperation==''|selectedOperation==null){
                alert("配置信息不完整！");
                return false;
            }else {
                $.ajax({
                    url: '/dialog/save',
                    async: false,
                    data:{id:id,dialogName:dialogName,dialogContent:dialogContent,optionalOperation:optionalOperation,selectedOperation:selectedOperation},
                    success: function (data) {
                        if (data!="success"){
                            layer.msg('更新数据失败!');
                        } else {
                            layer.msg('更新数据成功，即将跳转至列表页',{icon: 1});
                            window.location.href = "/dialog/show";
                        }
                    },
                    error: function (e) {
                        alert("异常，请重试！");
                    }
                })
            }
        };

        function addConfiguration() {
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
                    '<form class="layui-form" action="" enctype="multipart/form-data">' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">对话框名称</label>' +
                    '<div class="layui-input-block">' +
                    '<input type="text" name="dialogName" required lay-verify="required" placeholder="请输入对话框名称" autocomplete="off" class="layui-input"> ' +
                    '</div> ' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label"> 对话框内容</label>' +
                    '<div class="layui-input-inline">' +
                    '<input type="text" name="dialogContent" required lay-verify="required" placeholder="请输入对话框内容" autocomplete="off" class="layui-input" > ' +
                    '</div> ' +
                    '</div> ' +
                    '<div class="layui-form-item">' +
                    '<label class="layui-form-label">可选操作</label> ' +
                    '<div class="layui-input-block">' +
                    '<select name="optionalOperation" lay-verify="required">' +
                    // '<option value="">""</option> ' +
                    '<option value="0">确定</option> ' +
                    '<option value="1">取消</option> ' +
                    '<option value="2">是</option> ' +
                    '<option value="3">否</option> ' +
                    '<option value="4">确认</option> ' +
                    '</select> ' +
                    '</div> ' +
                    '</div>' +
                    '<div class="layui-form-item">' +
                    '<div class="layui-upload">' +
                    '<button type="button" class="layui-btn" id="dialogImage">上传图片</button> ' +
                    '<div class="layui-upload-list">' +
                    '<img class="layui-upload-img" > ' +
                    '</div> ' +
                    '</div> ' +
                    // '<div class="layui-upload feedback-padding">' +
                    // '<button type="button" class="layui-btn" id="selectImage">选择图片</button>' +
                    // '<input type="text" class="layui-hide" name=""> ' +
                    // '<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">预览图：' +
                    // '<div id= "previewImage" class="layui-clear feedback-overflow">' +
                    // '</div>' +
                    // '</blockquote>  ' +
                    // '</div> ' +
                    // '<label class="layui-form-label">上传图片</label> ' +
                    // '<div class="layui-input-inline-uploadHeadImage">' +
                    // '<div class="layui-upload-drag" id="dialogImag">' +
                    // '<i class="layui-icon"></i> ' +
                    // '<p>点击上传图片</p>' +
                    // '</div> ' +
                    // '</div>' +
                    // '<div class="layui-input-inline">' +
                    // '<div class="layui-upload-list">' +
                    // '<img class="layui-upload-img dialogImage" src="" id= "demo1">' +
                    // '<p id="demotext"></p> ' +
                    // '</div> ' +
                    // '</div>  ' +
                    '</div> ' +
                    '<div class="layui-form-item">' +
                    '<div class="layui-input-block">' +
                    '<button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>' +
                    '<button type="reset" class="layui-btn layui-btn-primary">重置</button>  ' +
                    '<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button>' +
                    '</div> ' +
                    '</div>  ' +
                    '</form>'
            });
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
