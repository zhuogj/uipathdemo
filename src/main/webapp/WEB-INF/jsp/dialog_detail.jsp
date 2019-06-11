<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>对话框配置界面</title>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
    <script type="text/javascript" src="layui/layui.js"></script>
    <script src="js/jquery-3.2.1.js"></script>
    <script src="js/jquery-migrate-1.1.0.js"></script>
    <style>
        <!--body{margin: 10px;}
        .demo-carousel{height: 200px; line-height: 200px; text-align: center;}-->

        /*.photo{*/
            /*height:400px;*/
            /*width:97%;*/
            /*border:#C1C1C1 solid 1px;*/
            /*float:left;*/
            /*margin:20px 20px;*/
        /*}*/
        .table{
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
        .layui-field-title{
            margin:5px;
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

        layui.use('table', function(){
            var table = layui.table;
            //监听工具条
            table.on('tool(demo)', function(obj){
                var data = obj.data;
                if(obj.event === 'del'){
                    layer.confirm('真的删除行么', function(index){
                        obj.del();
                        layer.close(index);
                    });
                }else if (obj.event==='edit'){
                    $.ajax({
                        type: "POST",
                        dataType: "text",
                        url: "/dialog/edit",
                        data: {"id":data.id},
                        success: function () {
                            layer.open({
                                type: 1,
                                title: "配置图片信息",
                                skin: 'layui-layer-rim',
                                area: ['900px','600px'],
                                zIndex: 1000,
                                cancel: function (index,layro) {
                                    return false;
                                },
                                content:
                                    '<div id="configure">'
                                    +'   <div class="layui-carousel" id="test3" lay-filter="test3">'
                                    +'      <div carousel-item class="carousel-item">'
                                    +'      </div>'
                                    +'   </div>'
                                    +'</div>'
                                    +'<button id="button" class="layui-btn" style="width:143px;height:40px;margin-top:22px;margin-left:240px;float:left;" onclick="finishConfig();">完成配置</button>'
                                    +'<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:22px 50px;" onclick="layer.close(layer.index)" >取消</button></div>'
                            });
                        }
                    })
                }
            });

            $('.demoTable .layui-btn').on('click', function(){
                var type = $(this).data('type');
                active[type] ? active[type].call(this) : '';
            });



        });
    </script>
</head>
<body>
<%@ include file="head.jsp" %>
<div id="content">
    <div>
        <div class="layui-row layui-col-space15">
            <div >
                <div class="table">
                    <table class="layui-table" lay-data="{height: '410',cellMinWidth: 80,limit:50}" lay-filter="demo">
                        <thead>
                        <tr>
                            <th lay-data="{field:'id', width:75, sort: true, fixed: true}">序号</th>
                            <th lay-data="{field:'dialogContent', width:415}">对话框内容</th>
                            <th lay-data="{field:'selectedOperation', width:176, sort: true}">已选操作</th>
                            <th lay-data="{field:'dialogPath', width:176, sort: true}">文件地址</th>
                            <th lay-data="{fixed: 'right', width:160, align:'center', toolbar: '#barDemo'}">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${list}" var="p" varStatus="index">
                            <tr>
                                <td>${p.id}</td>
                                <td>${p.dialogContent}</td>
                                <td>${p.selectedOperation}</td>
                                <td>${p.dialogPath}</td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>

                <script type="text/html" id="barDemo">
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" >删除</a>
                    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="edit" >编辑</a>
                </script>
                <div class="input">
                    <div class="layui-form-item">
                        <button class="layui-btn layui-btn-primary layui-btn-radius print" onClick="javaScript:history.go(-1)">返回</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
