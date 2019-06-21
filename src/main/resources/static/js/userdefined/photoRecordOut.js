/*$(function(){
    $("#hidebutton").hide();
    //监听快递单号的文本框的值的改变，改变后直接点确定
    $("#hidebutton").one('click',function(){
        //弹出html页面层
        layui.use('layer', function(){ //独立版的layer无需执行这一句
            var layer = layui.layer;
            layer.open({
                type: 1,
                title:"操作",
                skin: 'layui-layer-rim', //加上边框
                area: ['550px', '360px'], //宽高
                cancel: function(index, layero){
                    return false;  //禁止点击右上角的X关闭弹出页
                },
                content: '<div style="width:99%;padding-top:80px;"><label class="layui-form-label" style="width:80px;font-size:18px;">快递单号</label><div class="layui-input-block"><input id="num" type="num" name="num" lay-verify="title" autocomplete="off" placeholder="请扫描快递袋录入快递单号" class="layui-input" style="width:85%;font-size:18px;" autofocus="autofocus" onblur="comfirmNum();"></div>'
                +'<button id="button" class="layui-btn" style="width:86px;height:40px;margin-top:77px;margin-left:270px;float:left;" onclick="comfirmNum();">确认</button>'
                +'<button id="button" class="layui-btn layui-btn-primary " style="width:86px;height:40px;clear:both;margin:77px 20px;" onclick="backindex();" >取消</button></div>'
            });
        });
    });
    $("#hidebutton").click();

});*/

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e.keyCode == 67 && e.altKey) {
        //监听快捷键空格加ALT ，触发拍照
        H5_Capture();
    }
};
function backindex(){
    window.location.href='index.html'
}

layui.use('carousel', function(){
    carousel = layui.carousel;
    //图片轮播
    ins = carousel.render();
    //监听轮播切换事件
    carousel.on('change(test3)', function(obj){ //test1来源于对应HTML容器的 lay-filter="test1" 属性值

        //保存图片配置信息根据业务文件的编码更新 文件类型，实体名称，实体编号
        var originalFileNum = $(".carousel-item").find(".layui-this").find("input[name='originalFileNum']").val();
        var originalFileType = $(".carousel-item").find(".layui-this").find("input[name='originalFileType']").val();
        var entityName = $(".carousel-item").find(".layui-this").find("input[name='entityName']").val();
        var entityNum = $(".carousel-item").find(".layui-this").find("input[name='entityNum']").val();
        var expressNum = $("input[name='expressNum']").val();
        $.ajax({
            url:"/image/updateOriginalFileInfo",
            type:"post",
            async:false,
            data:{expressNum:expressNum,originalFileNum:originalFileNum,originalFileType:originalFileType,entityName:entityName,entityNum:entityNum,finishAll:false},
            success:function(data){
                if (data != "success"){
                    layer.msg('更新原始文件的配置信息异常！');
                }
            },
            error:function(e){
                alert("异常，请重试！");
            }
        });
    });
});

//点击完成配置
function finishConfig(){
    // 检查除当前显示页面以外，还有原始文件类型字段没有填写的
    var flag = true;
    $(".carousel-item").children("div[class='layui-this']").siblings().each( function() {
        var value = $(this).find(".layui-input-inline").children("input[name='originalFileTypeName']").val();
        if(value == ""|| value == null){//表示还有 没有配置完成的图片
            flag = false;
            return false;
        }
    });

    if(!flag) {
        layer.msg("您还没有全部配置完成，请继续配置图片信息！");
    }else { //代表除了当前以外全部填写完成
        var originalFileTypeName = $(".carousel-item").find(".layui-this").find("input[name='originalFileTypeName']").val();
        if(originalFileTypeName == "" || originalFileTypeName == null){
            $(".carousel-item").find(".layui-this").find("input[name='originalFileTypeName']").addClass("borderRed");
            layer.msg('原始文件类型不能为空', {icon: 5});
            return false;
        }else {
            var originalFileNum = $(".carousel-item").find(".layui-this").find("input[name='originalFileNum']").val();
            var originalFileType = $(".carousel-item").find(".layui-this").find("input[name='originalFileType']").val();
            var entityName = $(".carousel-item").find(".layui-this").find("input[name='entityName']").val();
            var entityNum = $(".carousel-item").find(".layui-this").find("input[name='entityNum']").val();
            var expressNum = $("input[name='expressNum']").val();
            $.ajax({
                url:"/image/updateOriginalFileInfo",
                type:"post",
                async:false,
                data:{expressNum:expressNum,originalFileNum:originalFileNum,originalFileType:originalFileType,entityName:entityName,entityNum:entityNum,finishAll:true},
                success:function(data){
                    if (data != "success"){
                        layer.msg('更新原始文件的配置信息异常！');
                    }else{
                        layer.msg('配置图片原始信息完成，即将为您跳转拆分业务文件页面。', {icon: 1});
                        window.location.href = "/addBusinessFile?expressNum=" + expressNum;  // 跳转拆分业务页面
                    }
                },
                error:function(e){
                    alert("异常，请重试！");
                }
            });
        }

    }

}

//拍照完成,先上传原始文件，在配置信息
function confirmSubmit(){
    var expressNum = $("input[name='expressNum']").val();
    var photoCount = $("input[name='count']").val();
    if(photoCount == 0 ){
        layer.alert("请先完成拍照在进入下一步。");
        return false;
    }
    layer.confirm('是否确认所有文件都拍摄完毕，确认后将提交电子文件。<br>注意：提交后不可修改！', {
        btn: ['确定','取消'] //按钮
    }, function(){
        layer.msg('正在处理图片...', {
            icon: 16
            ,shade: 0.01
            ,time:5000
        });
        $.ajax({
            url:"/image/mergeAndUpload",
            type:"post",
            data:{path:imagefile + expressNum,expressNum:expressNum,photoCount:photoCount},
            success:function(data){
                var result = JSON.parse(data);
                if (result.message == "success"){
                    layer.msg('图片已转换pdf并上传成功！请继续配置原始文件信息。', {icon: 1},function(){
                            //点击完成拍照，弹出配置页面
                            layer.open({
                                type: 1,
                                title:"配置图片信息",
                                skin: 'layui-layer-rim', //加上边框
                                area: ['900px', '790px'], //宽高
                                zIndex:1000,
                                cancel: function(index, layero){
                                    return false;  //禁止点击右上角的X关闭弹出页
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

                            //获取全部的图片信息配置原始文件的类型及实体姓名
                            var imgs;
                            var originalType;
                            var expressNum = $(".input").find("input[name='expressNum']").val();
                            $.ajax({
                                url:"/common/getOriginalFileInfo",
                                type:"post",
                                async:false,
                                data:{expressNum:expressNum},
                                success:function(data){
                                    var result = JSON.parse(data);
                                    originalType = result.OriginalFileMappers;
                                    imgs = result.returnList;
                                    //填充页面
                                    for(var i=0 ;i<imgs.length;i++){
                                        $(".carousel-item").append('<div><img class="carouselImg" src="http://api.51shebao.com/api/file/download?path=51shebao-service@' + imgs[i].originalEfileCode + '"/>'
                                            +'  <div>'
                                            +'     <div class="layui-form-item">'
                                            +'       <label class="layui-form-label carouselLabel">原始文件编码</label>'
                                            +'       <div class="layui-input-inline">'
                                            +'         <input name="originalFileNum" lay-verify="title" autocomplete="off" placeholder="原始文件编码" class="layui-input configInput" value="' + imgs[i].originalFileNum + '">'
                                            +'       </div>'
                                            +'       <label class="layui-form-label carouselLabel">原始文件类型</label>'
                                            +'       <div class="layui-input-inline">'
                                            +'         <input name="originalFileTypeName" lay-verify="required" placeholder="原始文件类型" class="layui-input configInput originalFileTypeName layui-form-danger" value="' + imgs[i].originalFileTypeName + '" required>'
                                            +'         <input type="hidden" name="originalFileType" value="'+ imgs[i].originalFileType+'">'
                                            +'       </div>'
                                            +'      </div>'
                                            +'     <div class="layui-form-item">'
                                            +'      <label class="layui-form-label carouselLabel">实体名称</label>'
                                            +'        <div class="layui-input-inline">'
                                            +'          <input name="entityName" lay-verify="required" placeholder="实体名称" autocomplete="off" class="layui-input configInput" value="' + imgs[i].entityName + '">'
                                            +'        </div>'
                                            +'        <label class="layui-form-label carouselLabel">实体编号</label>'
                                            +'        <div class="layui-input-inline">'
                                            +'          <input  name="entityNum" lay-verify="required" placeholder="实体编号" autocomplete="off" class="layui-input configInput" value="' + imgs[i].entityNum + '">'
                                            +'        </div>'
                                            +'      </div>'
                                            +'  </div>'
                                            +'</div>');

                                        //重置轮播
                                        ins.reload({
                                            elem: '#test3'
                                            ,width: '900px'
                                            ,height: '650px'
                                            ,interval: 5000
                                            ,autoplay:false
                                            ,arrow:'always'
                                            ,indicator:'none'
                                        });

                                        //原始文件类型自动提示
                                        $(".originalFileTypeName").autocomplete(originalType ,
                                            {
                                                minChars: 0, //表示不输入文本就可以显示所有数据，即双击就可以出现所有内容
                                                minLength: 0, //表示不输入文本就可以显示所有数据，即双击就可以出现所有内容
                                                max: 20, //下拉列表显示的数据条数
                                                autoFill: true,//表示自动填充
                                                mustMatch: true,//输入的内容如不匹配则清空
                                                matchContains: true, // 包含匹配
                                                scrollHeight: 200,
                                                formatItem: function(row, i, max) {
                                                    return  row.originalFileName ;
                                                },
                                                formatMatch: function(row, i, max) {
                                                    return row.originalFileName;
                                                },
                                                formatResult: function(row) {
                                                    return row.originalFileName;
                                                }
                                            }).result(function(event, row, formatted) {//选中时的回调函数
                                            $(this).siblings("input[name='originalFileType']").val(row.originalFileId);
                                        });
                                    }
                                },
                                error:function(e){
                                    alert("异常，请重试！");
                                }
                            });
                        }
                    );
                } else {
                    layer.msg("请先拍照在配置图片信息");
                }
            },
            error:function(e){
                alert("异常，请重试！");
            }
        });
    });
}

function confirmCancel(){
    layer.confirm('是否取消拍摄文件，返回首页', {
        btn: ['是','否'] //按钮
    }, function(){
        window.location.href='index.html'
    });
}

//弹框输入名称后 确定信息
function comfirmNum(){
    var num = $('#num').val();
    if(num=="" || num==null || num==undefined){
        layer.msg("请先扫描快递袋录入快递单号");
        $('#num').focus()
    } else {
        //将录入的快递单编号写入父页面
        var expressNum = $('#num').val();
        $("input[name='expressNum']").val(expressNum);
        //记录开始时间
        var startTime = getFormatDate1();
        $("input[name='operationStartTime']").val(startTime);
        //在后台添加一条初始状态的数据
        $.ajax({
            anysc:false,
            url:"/express/addExpressRecord",
            type:"post",
            data:{type:1,startTime:startTime,expressNum:expressNum},
            success:function(data){
                var result = JSON.parse(data);
                if(result.message == "noSelf"){ //已有且不是本人
                    //告知不是本人
                    layer.alert('该快递已被拆分，拆分人：' + result.createName + "\n拆分时间：" + result.createTime
                        + ",您不可以操作其它账号的快递!");
                } else if (result.message == "self"){ //已有是本人
                    //询问是否继续拆分
                    layer.confirm('该快递已被拆分，是否继续', {
                        btn: ['是','否'] //按钮
                    }, function(){
                        //先关闭设备，在打开设备
                        H5_CloseDevice();
                        //直接打开设备
                        H5_OpenDevice();
                        //修改文件保存地址
                        PLUG_SavePath(imagefile + expressNum);
                        //修改图片的dpi， 默认是96 修改为30
                        H5_dpi();
                        //关闭
                        layer.closeAll();
                        layui.use('table', function(){
                            var table = layui.table;
                            table.init('imagetable', {
                                height: 315 //设置高度
                                ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
                                ,url : '/express/getOriginalFilelistByExpressNum'
                                ,method : 'POST'
                                ,id : "imagetable"
                                ,where:{expressNum:expressNum}
                                ,done: function(res, curr, count){
                                    //如果是异步请求数据方式，res即为你接口返回的信息,count为数据总长。
                                    console.log(count);
                                    //查询table有几行更新文件数量字段
                                    $("input[name='count']").val(count);
                                }
                            });
                        });
                    }, function(){
                        //光标回到录入快递单号的地方
                        $("#num").val("");
                        $("#num").focus();
                    });
                } else if (result.message == "illegal"){//不合法的快递号
                    //提示不合法，请重新输入
                    layer.msg('输入的快递单号不合法，请重新输入！');
                    $("#num").val("");
                    $("#num").focus();
                } else { //成功正常加入
                    //先关闭设备，在打开设备
                    H5_CloseDevice();
                    //直接打开设备
                    H5_OpenDevice();
                    //修改文件保存地址
                    PLUG_SavePath(imagefile + expressNum);
                    //关闭
                    layer.closeAll();
                }
            },
            error:function(e){
                alert("异常，请重试！");
            }
        });
    }
}

layui.use('table', function(){
    var table = layui.table;
    //监听工具条
    table.on('tool(imagetable)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('确定删除该原始文件照片吗', function(index){
                obj.del();
                //后台逻辑删除数据库记录
                $.ajax({
                    async:false,
                    url:"/image/deleteOriginalFile",
                    type:"post",
                    data:{fileCode:data.originalFileNum.split(".")[0]},
                    success:function(result){
                        if(result == "success"){
                            layer.msg("照片删除成功");
                            //js删除本地文件
                            var expressNum = $("input[name='expressNum']").val();
                            var delimage = imagefile + expressNum + "/" + data.originalFileNum;
                            H5_Delete(delimage);
                            //刷新页面
                            var oldData =  table.cache["imagetable"];
                            oldData.splice(obj.tr.data('index'),1);
                            table.reload('imagetable',{
                                 data : oldData
                                ,done: function(res, curr, count){
                                    //如果是异步请求数据方式，res即为你接口返回的信息,count为数据总长。
                                    console.log(count);
                                    //查询table有几行更新文件数量字段
                                    $("input[name='count']").val(count);
                                    //var count = $(".layui-table-body table tbody").children("tr").length;
                                }
                            });
                        }
                    },
                    error:function(e){
                        alert("异常，请重试！");
                    }
                });
                layer.close(index);
            });
        }
    });

});