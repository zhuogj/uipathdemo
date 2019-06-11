var originalFileType="";
var entityName="";
var entityNum ="";
var id="";
function dragstart(ele,event){
    originalFileType=$(ele).siblings("#originalFileType").val();
    entityName=$(ele).siblings("#entityName").val();
    entityNum=$(ele).siblings("#entityNum").val();
    id = $(ele).siblings("#id").val();
    if(originalFileType == undefined){
        originalFileType = "";
    }
    if(entityName == undefined){
        entityName = "";
    }
    if(entityNum == undefined){
        entityNum = "";
    }
    var filecode = $(ele).siblings("span").text();
    event.dataTransfer.setData("text",filecode);
}
function drop(ele,event){
    //追加内容前先判断是否扫过文件袋
    var filePocketNum = $(ele).siblings("div[class='table']").find("input[name='filePocketNum']").val();
    if(filePocketNum == ""||  filePocketNum == null || filePocketNum == undefined){
        layer.msg("请先扫描文件袋或业务文件编码");
        return false;
    }
    //往文本域追加内容
    var text = $(ele).find(".originalFileList").val();
    if(text == ""||  text == null || text == undefined){
        $(ele).find(".originalFileList").val(originalFileType + entityName + entityNum);
    } else {
        $(ele).find(".originalFileList").val(text + "，" + originalFileType + entityName + entityNum);
    }

    //添加隐藏域，注明图片的ID
    if($(ele).siblings("input[name='originalFileList']").val() != ""){
        var oldValue = $(ele).siblings("input[name='originalFileList']").val();
        $(ele).siblings("input[name='originalFileList']").val(oldValue + "," + id);
    } else {
        $(ele).siblings("input[name='originalFileList']").val(id);
    }

    var filecode= event.dataTransfer.getData("text");
    //找到置为灰色
    $("#photolist").find("span").each(function(){
        var text = $(this).text();
        if(text == filecode){
            $(this).siblings("img").addClass("transparent_class");
            $(this).siblings("img").attr("draggable","false");
            return;
        }
    });
}
function dropover(e){
    e.preventDefault();
}

layui.use(['layer', 'form'], function(){
        form = layui.form;
        layer = layui.layer;
        form.render();
        form.on('select', function(data){
            var optionValue = data.value;
            if(optionValue.length == 1 ){
                optionValue = "0" + optionValue;
            }
            if(!($(this).parents("div.type").siblings(".label").children(".layui-icon-delete").hasClass("transparent_class"))){
                $(this).parents("div.type").siblings(".table").find("input[name='businessFileCode']").val("Z" + optionValue + "H"+ getYear() + getMonth());
            }
        });

        form.on('submit(go)', function(data){
            var ele = $(data.elem);//被执行事件的元素DOM对象，一般为button对象
            var locationName = ele.parents(".layui-form").find("input[name='locationName']").val(); //业务所属区县
            var serviceType = ele.parents(".layui-form").find(".layui-this").text(); //业务类型值
            var companyName = ele.parents(".layui-form").find("input[name='companyName']").val(); //公司名称
            var serviceUserName = ele.parents(".layui-form").find("input[name='serviceUserName']").val(); //姓名
            var originalFilelist = ele.parents(".layui-form").find("textarea.originalFileList").val(); //主要原件材料清单

            var optionValue = ele.parents(".layui-form").find(".layui-this").attr("lay-value");//业务类型码
            var value = ele.parents(".layui-form").find("input[name='businessFileId']").val();
            var url;
            if(value == null || value == ""){ //代表是新的还未添加过的业务文件
                url="/business/addBusinessFile"; // 下一个ajax 使用
                var filecode;
                if(!ele.siblings(".layui-icon-delete").hasClass("transparent_class")){ //如果垃圾桶已经置为灰色则不修改业务文件编码
                    $.ajax({
                        async:false,
                        url:"/common/getFileCode",
                        type:"post",
                        data:{serviceTypeCode:optionValue},
                        success:function(data){
                            filecode = data;
                        },
                        error:function(e){
                            alert("异常，请重试！");
                        }
                    });
                    ele.parents(".layui-form").find("input[name='businessFileCode']").val(filecode);
                }
            } else {
                url="/business/updateBusinessFile";
            }

            var  formId = ele.parents(".layui-form").attr("id"); //id
            $.ajax({
                //几个参数需要注意一下
                type: "POST",
                dataType: "text",//预期服务器返回的数据类型
                url: url,
                data: $("#" + formId).serialize(),
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.message == "success" && (value == null || value == "")) {
                        // 获取id放到页面的隐藏域
                        ele.parents(".layui-form").find("input[name='businessFileId']").val(result.businessFileId);
                        //垃圾桶按钮变灰色并不可点击
                        ele.siblings(".layui-icon-delete").addClass("transparent_class");
                        ele.siblings(".layui-icon-delete").attr("title","已打印标签不可删除");
                        ele.siblings(".layui-icon-delete").prop("onclick",null).off("click");
                    }

                    //连接打印机 ，显示预览页
                    // 弹框显示预览页并打印
                    layer.open({
                        type: 1,
                        title:"标签",
                        skin: 'layui-layer-rim', //加上边框
                        area: ['450px', '528px'], //宽高
                        cancel: function(index, layero){
                            return false;  //禁止点击右上角的X关闭弹出页
                        },
                        content:
                        '<div>'
                        + '<div class="printLable"> '
                        + '<div id="print-area">'
                        + '<img id="bcode"/><br/>'
                        + '    <div style="text-align: left;margin-left: 15px;"><span>业务所属区县：</span><span>'+locationName+'</span>&nbsp; &nbsp<span>业务类型：</span><span>'+serviceType+'</span><br/><br/>'
                        + '    <span>公司名称：</span><span>'+companyName+'</span><br/><br/><span>业务关联员工姓名：</span><span>'+serviceUserName+'</span><br/><br/>'
                        + '    <span>主要原件材料清单：</span><span>'+originalFilelist+'</span></div>'
                        + '</div>'
                        + '</div>'
                        + '<button id="button" class="layui-btn" style="width:86px;height:40px;margin-left:100px;float:left;" onclick="myprint();">确认打印</button>'
                        + '<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:0px 45px;" onclick="layer.close(layer.index)"; >取消</button></div>'
                        + '</div>'
                    });

                    //生成条形码
                    var businessFileCode = ele.parents(".layui-form").find("input[name='businessFileCode']").val();
                    barcodeGen(businessFileCode);

                },
                error : function() {
                    alert("异常！");
                }
            });
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });

    });

function myprint(){
    $("#print-area").jqprint({
        debug: false,
        importCSS: true,
        printContainer: true,
        operaSupport: false
    });
    layer.close(layer.index);
}

function barcodeGen(value){
    if(value=="" || value == null || value == undefined){
        alert("请先生成业务文件编码！")
    }else{
        $("#bcode").JsBarcode(value);
    }
}

layui.use('table', function(){
    var table = layui.table;
});

$(function(){
    $(".companyName").autocomplete('/common/getlocaionByCompanyName' ,
        {
            minChars: 4, //表示不输入文本就可以显示所有数据，即双击就可以出现所有内容
            max: 50, //下拉列表显示的数据条数
            autoFill: true,//表示自动填充
            mustMatch: true,//输入的内容如不匹配则清空
            matchContains: true, //表示包含匹配
            scrollHeight: 150,
            dataType : "json",
            parse: function(data) {
                return $.map(data, function(row) {
                    return {
                        data: row,
                        value: row.companyName,
                        result: row.companyName
                    }
                });
            },
            formatItem: function(row, i, max) {
                return  row.companyName ;
            },
            formatMatch: function(row, i, max) {
                return row.companyName;
            },
            formatResult: function(row) {
                return row.companyName;
            }
        }).result(function(event, row, formatted) {//选中时的回调函数
        $(this).parent().next().find("input[name='locationName']").val(row.locationName);
    });

    /* //监听删除键
     $(document).keydown(function(event){
         if(event.keyCode == 8){ //删除键
             //alert("删除");
             //删除到逗号或者前面米没有为难

         }
     });*/

    // 监听textArea域值的变化
    $('.originalFileList').on('input propertychange', function(){
        removegray($(this));
    });

    $('#tablelist').on('click','.layui-icon-delete',function(){

        var length= $("#tablelist").find(".file").length;

        var ele = $(this);
        //提示是否要删除
        layer.confirm('确定要删除该文件袋？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            if(length <= 3 ){
                //div 小于3，只清空不删除
                ele.parents(".file").find(".form").get(0).reset();
                // 如果有选择图片，则需要把左侧图片恢复点击
                removegray(null);
                layer.closeAll();
            } else {
                //删除整个div
                ele.parents(".file").remove();
                // 如果有选择图片，则需要把左侧图片恢复点击
                removegray(null);
                layer.closeAll();
            }
        });


    });

});

//去除图片类表的灰色
function removegray(ele){
    var files = "";
    // var ele = $(this);
    $('.originalFileList').each(function(){
        if($(this).val() != ""){
            files +=  $(this).val() +  "，";
        }
    });
    var arrfiles = files.split("，");
    $(".imgdiv img[draggable='false']").each(function(){
        var flag = false;
        var text = "";
        $(this).siblings("input[name!='id']").each(function(){
            text += $(this).val();
        });
        for(var i=0; i<arrfiles.length; i++){
            if(text == arrfiles[i]){
                flag = true;
                break;
            }
        }
        if(!flag){ // 没有找到，就恢复颜色
            $(this).attr("draggable","true");
            $(this).removeClass("transparent_class");
            //隐藏域的值改变，放原始文件列表的id
            if(ele != null){
                var id = $(this).siblings("input[name='id']").val();
                var value = ele.parents(".filelist").siblings("input[name='originalFileList']").val();
                var arrvalue = value.split(",");
                var newValue="";
                for(var i=0; i<arrvalue.length; i++){
                    if(id != arrvalue[i]){
                        newValue += arrvalue[i] + ","
                    }
                }
                newValue = newValue.substring(0,newValue.length-1);
                console.log("newValue=======" + newValue);
                ele.parents(".filelist").siblings("input[name='originalFileList']").val(newValue);
            }
        }
    });
}


//根据输入的文件袋编号判断是否是已经添加过的文件袋
function addBusinessFile(filecode){
    $.ajax({
        url:"/business/getBusinessFile",
        type:"post",
        data:{fileCode:filecode},
        success:function(data){
            var result = JSON.parse(data);
            //alert(result.message);
            if(result.message == "illegal"){
                layer.msg('扫描的编号不合法，请重新输入！');
            } else if(result.message == "notEmpty"){
                var data = result.data;
                //提示该文件袋已关联过业务文件信息，您可以选择载入已有信息进行修改更新，也可删除关联关系将该文件袋作为新文件袋进行添加
                layer.confirm('该文件袋存在关联的业务文件信息，请依据实际情况选择：', {
                    area:['412px','230px'],
                    btn: ['文件袋已被清空','载入业务文件信息',"取消"] //按钮
                }, function(){
                    //更新文件袋的关联业务文件信息
                    var ele = getCurrDiv("empty",filecode);
                    if(ele != null && ele != "new") {
                        ele.find("input[name='filePocketNum']").val(data.filePocketNum);
                    }
                    layer.close(layer.index);

                }, function(){ //不空，且选择了载入业务文件的信息

                    //判断往哪个框里放
                    var ele = getCurrDiv(result.message,filecode,result.data);
                    if(ele != null && ele != "new"){
                        //加载图片列表
                        photoList(data.businessFileId,data.businessFileCode);
                        //显示数据 给文本框值
                        //隐藏域字段
                        ele.find("input[name='fromExpressNum']").val(data.fromExpressNum);
                        ele.find("input[name='businessFileId']").val(data.businessFileId);
                        ele.find("input[name='originalFileList']").val(data.originalFileList);
                        //显示字段
                        $("#photolist").find("input[name='expressNum']").each(function(){
                            var code = $(this).val();
                            if( code == data.businessFileCode){
                                $(this).parents(".inputDiv").nextAll(".imgdiv").each(function(){
                                    var originalFileType = $(this).find("#originalFileType").val();
                                    var entityName=$(this).find("#entityName").val();
                                    var entityNum=$(this).find("#entityNum").val();
                                    var id = $(this).find("#id").val();
                                    var text = ele.find(".originalFileList").val();
                                    if(text == ""||  text == null || text == undefined){
                                        ele.find(".originalFileList").val(originalFileType + entityName + entityNum);
                                    } else {
                                        ele.find(".originalFileList").val(text + "，" + originalFileType + entityName + entityNum);
                                    }
                                });
                            }
                        })
                        ele.find(".layui-anim dd").each(function(){
                            var optionCode = $(this).attr("lay-value");//业务类型码
                            if(optionCode == data.serviceType){
                                $(this).trigger("click"); //选中它
                                return false; // 跳出循环
                            }
                        })
                        ele.find("select[name='serviceType']").val(data.serviceType);
                        ele.find("input[name='filePocketNum']").val(data.filePocketNum);
                        ele.find("input[name='businessFileCode']").val(data.businessFileCode);
                        ele.find(" input[name='companyName']").val(data.companyName);
                        ele.find(" input[name='locationName']").val(data.locationName);
                        ele.find(" input[name='serviceUserName']").val(data.serviceUserName);
                    }
                });
            } else if(result.message == "empty"){
                var ele = getCurrDiv(result.message,filecode);
                if(ele != null && ele != "new") {
                    ele.find("input[name='filePocketNum']").val(filecode);
                }
            }
        },
        error:function(e){
            alert("异常，请重试！");
        }
    });
}

function photoList(businessFileId,businessFileCode){
    $.ajax({
        async:false,
        url:"/common/getOriginalphotolistByBusinessFileId",
        type:"post",
        data:{businessFileId:businessFileId},
        success:function(data){
            var result = JSON.parse(data);
            alert("查询原始文件的信息：" + result.message + result.data);
            if (result.message == "success"){
                var originalFileList = result.data;
                $("#photolist").append('<div class="inputDiv" style="clear:both;border-top: 1px solid #C9C9C6;width: 86%;"><span>编号为:</span><input class="inputphotoclass" type="text" name="expressNum" value="' + businessFileCode + '"/><span>的图片清单</span></div>'); //yanhuan
                for(var i=0; i<originalFileList.length; i++){
                    $("#photolist").append('<div class="imgdiv">'
                        +'    <img id="imgSingle" src="http://api.51shebao.com/api/file/download?path=51shebao-service@'+originalFileList[i].originalEfileCode+'" draggable="true" ondragstart="dragstart(this,event)"/><br/>'
                        +'    <input type="hidden" id="originalFileType" name="originalFileType" value="'+ originalFileList[i].originalFileTypeName + '"/>'
                        +'    <c:if test="${not empty '+ originalFileList[i].entityName + ' }">'
                        +'        <input type="hidden" id="entityName" name="entityName" value="-'+ originalFileList[i].entityName + '"/>'
                        +'    </c:if>'
                        +'    <c:if test="${not empty '+ originalFileList[i].entityNum + ' }">'
                        +'        <input type="hidden" id="entityNum" name="entityNum" value="-'+ originalFileList[i].entityNum + '"/>'
                        +'    </c:if>'
                        +'    <input type="hidden" id="id" name="id" value="'+ originalFileList[i].id + '"/>'
                        +'    <span style="font-size:13px;">'+ originalFileList[i].originalFileNum + '</span>'
                        +'</div>');
                }
            }
        },
        error:function(e){
            alert("异常，请重试！");
        }
    })
}

//判断当前该录入哪个div
function getCurrDiv(ifEmpty,filecode,data){
    //倒着取最后一个不为空的子元素，获取文件袋编号字段val()，如果为空则输入用户扫描的编号，不为空则判断是否和用户输入的编码相等，不相等则
    //写入他的上一个兄弟元素，相等则不做操作。
    var lastValue =  $("#tablelist").children().last().find(".form input[name='filePocketNum']").val();
    if($("#tablelist").children(".currentDiv") == null || $("#tablelist").children(".currentDiv").length <= 0){
        if(lastValue == null || lastValue==""){
            //给上一个元素添加类
            $("#tablelist").children().last().prev().addClass("currentDiv");
            //返回最后一个form
            return $("#tablelist").children().last().find(".form");

        } else { // 添加div
            //先判断是否已添加过该文件袋
            var flag = true;
            $("#tablelist").children().each(function(){
                var prevValue = $(this).find(".form input[name='filePocketNum']").val();
                if(prevValue == filecode){
                    layer.msg("已添加过该文件袋，请继续录入其它信息");
                    flag = false;
                    return null;
                }
            });
            var length = $("#tablelist").children().length;
            if(flag && ifEmpty == "empty"){

                $("#tablelist").prepend( '<div class="file">'
                    + '    <form class="layui-form form" action="" id="form"'+ length +'>'
                    + '        <input type="hidden" name="fromExpressNum" value="${expressNum}"/>'
                    + '        <input type="hidden" name="businessFileId" value=""/>'
                    + '        <input type="hidden" name="originalFileList" value=""/>'
                    + '        <div class="filelist" ondrop="drop(this,event)" ondragover="dropover(event)">'
                    + '            <label class="layui-form-label typelabel"><span class="remark">*</span>原始文件清单</label>'
                    + '            <div class="layui-form-item layui-form-text">'
                    + '                <textarea  placeholder="请拖选原始文件" class="layui-textarea originalFileList" lay-verify="required" required></textarea>'
                    + '            </div>'
                    + '        </div>'
                    + '        <div class="type">'
                    + '            <label class="layui-form-label typelabel"><span class="remark">*</span>业务类型</label>'
                    + '            <div class="layui-input-inline">'
                    + '                <select name="serviceType" lay-verify="required">'
                    + '                    <option value></option>'
                    + '                    <c:forEach var="serviceType" items="${serviceTypeList}">'
                    + '                        <option value="${serviceType.typeCode}">${serviceType.typeName}</option>'
                    + '                    </c:forEach>'
                    + '                </select>'
                    + '            </div>'
                    + '        </div>'
                    + '        <div class="label">'
                    + '            <i class="layui-icon layui-icon-print" lay-submit lay-filter="go" style="font-size: 45px; color:#6CAFF2;" title="打印标签"></i>'
                    + '            <i class="layui-icon layui-icon-delete" style="font-size: 55px; color:#655455;" title="删除文件袋"></i>'
                    + '        </div>'
                    + '        <div class="table">'
                    + '            <table class="mytable">'
                    + '                <thead>'
                    + '                    <tr style="background-color: #F2F2F2;">'
                    + '                        <td width="19%">文件袋编号</td>'
                    + '                        <td width="19%">业务文件编号</td>'
                    + '                        <td width="32%">所属商户</td>'
                    + '                        <td width="17%">业务地区</td>'
                    + '                        <td width="13%">业务关联员工</td>'
                    + '                    </tr>'
                    + '                </thead>'
                    + '                <tr>'
                    + '                    <td><input class="layui-input tableInput" name="filePocketNum" readonly lay-verify="required" required value="'+filecode+'" value=""/></td>'
                    + '                    <td><input class="layui-input tableInput" name="businessFileCode" readonly lay-verify="required" required value=""/></td>'
                    + '                    <td><input class="layui-input tableInput companyName" name="companyName" lay-verify="required" required/></td>'
                    + '                    <td><input class="layui-input tableInput" name="locationName"/></td>'
                    + '                    <td><input class="layui-input tableInput" name="serviceUserName"/></td>'
                    + '                </tr>'
                    + '            </table>'
                    + '        </div>'
                    + '    </form>'
                    + '</div> ');
                form.render('select');
                return "new";

            } else if(flag && ifEmpty == "notEmpty") {
                $("#tablelist").prepend( '<div class="file">'
                    + '    <form class="layui-form form" action="" id="form"'+ length +'>'
                    + '        <input type="hidden" name="fromExpressNum" value="'+ data.fromExpressNum + '"/>'
                    + '        <input type="hidden" name="businessFileId" value="'+ data.businessFileId +'"/>'
                    + '        <input type="hidden" name="originalFileList" value="'+ data.originalFileList +'"/>'
                    + '        <div class="filelist" ondrop="drop(this,event)" ondragover="dropover(event)">'
                    + '            <label class="layui-form-label typelabel"><span class="remark">*</span>原始文件清单</label>'
                    + '            <div class="layui-form-item layui-form-text">'
                    + '                <textarea  placeholder="请拖选原始文件" class="layui-textarea originalFileList" lay-verify="required" required></textarea>'
                    + '            </div>'
                    + '        </div>'
                    + '        <div class="type">'
                    + '            <label class="layui-form-label typelabel"><span class="remark">*</span>业务类型</label>'
                    + '            <div class="layui-input-inline">'
                    + '                <select name="serviceType" lay-verify="required">'
                    + '                    <option value='+data.serviceType+'></option>'
                    + '                    <c:forEach var="serviceType" items="${serviceTypeList}">'
                    + '                        <option value="${serviceType.typeCode}">${serviceType.typeName}</option>'
                    + '                    </c:forEach>'
                    + '                </select>'
                    + '            </div>'
                    + '        </div>'
                    + '        <div class="label">'
                    + '            <i class="layui-icon layui-icon-print" lay-submit lay-filter="go" style="font-size: 45px; color:#6CAFF2;" title="打印标签"></i>'
                    + '            <i class="layui-icon layui-icon-delete" style="font-size: 55px; color:#655455;" title="删除文件袋"></i>'
                    + '        </div>'
                    + '        <div class="table">'
                    + '            <table class="mytable">'
                    + '                <thead>'
                    + '                    <tr style="background-color: #F2F2F2;">'
                    + '                        <td width="19%">文件袋编号</td>'
                    + '                        <td width="19%">业务文件编号</td>'
                    + '                        <td width="32%">所属商户</td>'
                    + '                        <td width="17%">业务地区</td>'
                    + '                        <td width="13%">业务关联员工</td>'
                    + '                    </tr>'
                    + '                </thead>'
                    + '                <tr>'
                    + '                    <td><input class="layui-input tableInput" name="filePocketNum" readonly lay-verify="required" required value="'+data.filePocketNum+'" value=""/></td>'
                    + '                    <td><input class="layui-input tableInput" name="businessFileCode" readonly lay-verify="required" required value="'+data.businessFileCode+'" value=""/></td>'
                    + '                    <td><input class="layui-input tableInput companyName" name="companyName" lay-verify="required" required value="'+data.companyName+'"/></td>'
                    + '                    <td><input class="layui-input tableInput" name="locationName" value="'+data.locationName+'"/></td>'
                    + '                    <td><input class="layui-input tableInput" name="serviceUserName" value="'+data.serviceUserName+'"/></td>'
                    + '                </tr>'
                    + '            </table>'
                    + '        </div>'
                    + '    </form>'
                    + '</div> ');
                form.render('select');
                return "new";
            }
        }

    } else {
        var ele = $("#tablelist").children(".currentDiv");
        //先判断是否为重复扫描的文件袋,获取上一个的值
        var flag = true;
        $(ele).nextAll().each(function(){
            var prevValue = $(this).find(".form input[name='filePocketNum']").val();
            if(prevValue == filecode){
                layer.msg("已添加过该文件袋，请继续录入其它信息");
                flag = false;
                return null;
            }
        });
        if(flag){
            $(ele).prev().addClass("currentDiv");
            $(ele).removeClass("currentDiv");
            return $(ele).find(".form");
        }
    }
}

//完成添加 判断是否全部打印过标签了且原始文件即图片已被分完
function finish(){

    var flag ;
    // 首先看原始文件分完没有，若没有分完，则提示请继续拆分
    $("#photolist").children(".imgdiv").each(function(){
        var draggable = $(this).find("img").attr("draggable");
        if(draggable == "true"){ //还没有分完
            layer.msg("原始文件还没有被全部拆分完，请继续拆分！");
            flag = true;
            return false;
        }
    });
    if(flag){
        return false;
    }
    //若没有跳出，代表图片全部分完了。然后检测原始文件列表字段有值的div中删除（垃圾桶）的状态，
    // 若有不为灰色的则说明还有未添加的完成的业务文件，提示继续补充信息。
    $('.originalFileList').each(function(){
        if($(this).val() != ""){
            var deleteflag = $(this).parents(".filelist").siblings(".label").children(".layui-icon-delete").hasClass("transparent_class");
            if(!deleteflag){
                layer.msg("还有未补全信息的业务文件，请补全信息打印标签后完成添加！");
                flag = true;
                return false;
            }
        }
    });
    if(flag){
        return false;
    }

    var checkflag = true;
    var businessFileCodes= "";
    //判断打印标签后，页面如果再次修改，则需重新打印标签后才可以完成添加功能，所以要再次判断页面内容是否和数据库存储的一致，不一致就提示用户重新打印标签在完成添加
    $("#tablelist input[name='businessFileCode']").each(function(){
        var ele = $(this);
        var listVal = ele.parents(".table").siblings(".filelist").find(".originalFileList").val();
        if(listVal != null && listVal != "" && listVal != "undefined"){
            //把当前有数据的表单提交到后台根据业务文件编码再次校验一遍
            var formId = ele.parents(".form").attr("id");
            $.ajax({
                //几个参数需要注意一下
                type: "POST",
                dataType: "text",//预期服务器返回的数据类型
                url:"/business/checkBusinessFile",
                data: $("#" + formId).serialize(),
                async:false,
                success: function (data) {
                    var result = JSON.parse(data);
                    if(result.message == "success"){
                        businessFileCodes += ele.val() + ",";
                    } else {
                        checkflag = false;
                        layer.msg("您还有修改信息后未重新打印过标签的业务文件，请重新打印标签后在完成添加");
                        return false;
                    }
                },
                error : function() {
                    alert("异常！");
                }
            });

        }
    });

    if(!checkflag){
        return false;
    }

    businessFileCodes = businessFileCodes.substring(0,businessFileCodes.length-1);
    var expressNum = $("#photolist input[name='expressNum']").val();
    $.ajax({
        url:"/express/updateExpressStatus",
        type:"post",
        data:{processStatus:3,businessFileCodes:businessFileCodes,expressNum:expressNum},
        success:function(data){
            //提示拆分完成
            layer.alert("单号为：" + expressNum+"的快递文件已全部拆分完成！");
        },
        error:function(e){
            alert("异常，请重试！");
        }
    });
}

