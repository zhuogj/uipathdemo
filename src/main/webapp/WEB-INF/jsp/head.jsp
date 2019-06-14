<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>头部</title>
    <style>
        #head{
            width:100%;
            height:110px;
            border-bottom:#E6E6E6 solid 1.2px;
        }

        #logo{
            height:110px;
            float:left;
        }
        #logo img{
            height:110px;
            margin-left:35px;
        }
        #user{
            float:right;
            width:318px;
            margin-top:75px;
            margin-right:40px;
        }

    </style>
</head>
<body>
<div id="head" >
    <div id="logo">
        <img src="images/logo.png">
    </div>
    <div id="user">
        用户：XXX，你好，欢迎使用Uipath配置系统  &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="/index">返回首页</a>
    </div>

</div>
</body>