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
    <title>欢迎使用Uipath配置系统</title>
    <link rel="stylesheet" href="layui/css/layui.css" media="all">
    <script type="text/javascript" src="layui/layui.js"></script>
    <script type="text/javascript" src="js/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="js/jquery-migrate-1.1.0.js"></script>
    <script src="js/highmeter/EtOcx.js"></script>
    <script src="js/highmeter/EtPlug.js"></script>
    <script src="js/highmeter/ready.js"></script>
    <style>
        .layui-circle{
            width: 130px;
            height: 130px;
            border: red solid 2px;
            text-align: center;
            line-height: 130px;
            margin-left: 225px;
            margin-top: 200px;
            float:left;
            font-size: 24px;
        }

        .tip{
            padding-top:130px;
            padding-right:70px;
            clear:both;
            text-align:right;
        }
        .tip1{
            padding-top:20px;
        }
        embed{
            width:100%;
        }
    </style>
    <!--border:red solid 2px;-->
    <script>
        function removeExpress(){
            window.location.href='/index/hello'
        }
        function dialogDeploy(){
            window.location.href='/dialog/show'
        }
    </script>
</head>
<body>
<%@ include file="head.jsp" %>
<div id="content">
    <div style="padding: 10px;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md4">
                <div id="business1" class="layui-circle" onclick="removeExpress()">
                    文件管理
                </div>
            </div>
            <div class="layui-col-md4">
                <div id="business2" class="layui-circle" onclick="dialogDeploy()">
                    对话框配置
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
