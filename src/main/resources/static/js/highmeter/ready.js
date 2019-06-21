var isIEWeb = false;

//页面关闭时,关闭设备
window.onbeforeunload = function(event){
    if(isIEWeb){
        EtOcx_Deinit();
    }
    else{
        EtPlug_Deinit();
    }
}

function JS_OCX_EVENT_IMAGE(uploadcnt, barcode, httpinfo, imagefile1, imagefile2)
{
    var txtlog = document.getElementById("TextArea1");
    //将图片名称显示到列表中
    if(imagefile1){
        //显示图片imagefile1
        txtlog.value = "图片: " + imagefile1 + "\r\n" + txtlog.value;
        OCX_Base64(imagefile1);
    }

    if(imagefile2){
        //显示图片imagefile2
        txtlog.value = "图片: " + imagefile2 + "\r\n" + txtlog.value;
        OCX_Base64(imagefile2);
    }

    if(barcode){
        txtlog.value = "条码内容: " + barcode + "\r\n" + txtlog.value;
    }
}

function JS_OCX_EVENT_UPLOAD(uploadcnt, localfile, errcode, errmsg)
{
    var txtlog = document.getElementById("TextArea1");
    if(0 == uploadcnt)
    {
        txtlog.value = "本地文件: " + localfile + " 上传失败" + "\r\n" + txtlog.value;
        txtlog.value = "错误代码: " + errcode + " " + "错误信息: " + errmsg + "\r\n" + txtlog.value;
    }
    else
    {
        txtlog.value = "本地文件: " + localfile + " 上传成功\r\n" + txtlog.value;
    }
}

function JS_OCX_EVENT_PDF(pdfstatus)
{
    var txtlog = document.getElementById("TextArea1");
    if(0 == pdfstatus)
    {
        txtlog.value = "合成PDF文档成功\r\n" + txtlog.value;
    }
    else
    {
        txtlog.value = "合成PDF文档失败\r\n" + txtlog.value;
    }
}

function JS_OCX_EVENT_CAPTURE(reserved)
{
    var txtlog = document.getElementById("TextArea1");
    txtlog.value = "图片保存成功，正在进行处理\r\n" + txtlog.value;
}


function loadActiveX(){
    if (!!window.ActiveXObject || "ActiveXObject" in window){
        isIEWeb = true;
        //IE浏览器加载控件
        document.getElementById("CZURActiveX").innerHTML = "<OBJECT id=\"EtOcxEx\" classid=\"clsid:6BA87457-4473-41A1-9A48-6AC45389B971\" width=\"320px\" height=\"240px\"></OBJECT>";
        EtOcx_Init();
    }
    else {
        isIEWeb = false;
        if (!window.WebSocket){
            alert("WebSocket not supported by this browser!");
        }

        var firefox_flag = false;
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        //判断是否Firefox浏览器
        if (userAgent.indexOf("Firefox") > -1){
            firefox_flag = true;
        }

        //其他浏览器加载控件
        var canvasWidth = $(".photo").width();
        document.getElementById("CZURActiveX").innerHTML = "<canvas style=\"background:black\" id=\"videoframe\" width='"+ canvasWidth +"' height=\"700px\">";
        EtPlug_Init(10889, 7890, firefox_flag);

    }
}

function OnTypeProcessChanged(obj){
    if(obj.checked)
    {
        switch(obj.value)
        {
            case "clip":{
                if(isIEWeb){
                    OCX_SelectClip();
                }
                else{
                    PLUG_Origin();
                    PLUG_SelectClip();
                }
            }
                break;
            case "src":
                CANCEL_CLIP_SELECT();
                H5_Origin();
                break;
            case "curve":
                CANCEL_CLIP_SELECT();
                H5_Flatten();
                break;
            case "single":
                CANCEL_CLIP_SELECT();
                H5_CutEdge();
                break;
        }
    }
}

function OnBCRCheckBtn(obj){
    if(obj.checked){
        if(isIEWeb){
            OCX_SelectBCR();
        }
        else{
            PLUG_SelectBCR();
        }
    }
    else{
        CANCEL_BCR_SELECT();
    }
}

function OnChangeImageFormat(obj){
    if(obj.checked){
        switch(obj.value)
        {
            case "bmp":
                H5_BMP();
                break;
            case "jpg":
                H5_JPG();
                break;
        }
    }
}

function CANCEL_BCR_SELECT(){
    if(isIEWeb){
        OCX_ClearBCR();
    }
    else{
        PLUG_ClearBCR();
    }
}

function CANCEL_CLIP_SELECT(){
    if(isIEWeb){
        OCX_ClearClip();
    }
    else{
        PLUG_ClearClip();
    }
}

function H5_OpenDevice(){
    if(isIEWeb){
        OCX_OpenDevice();
    }
    else{
        PLUG_OpenDevice();
    }
}

function H5_Capture(){
    if(isIEWeb){
        OCX_Capture();
    }
    else{
        PLUG_Capture();
    }
}

function H5_CloseDevice(){
    if(isIEWeb){
        OCX_CloseDevice();
    }
    else{
        PLUG_CloseDevice();
    }
}

function H5_Custom(){
    if(isIEWeb){
        OCX_Custom();
    }
    else{
        PLUG_Custom();
    }
}

function H5_SavePath(){
    if(isIEWeb){
        OCX_SavePath();
    }
    else{
        PLUG_SavePath();
    }
}

function H5_Size(){
    if(isIEWeb){
        OCX_Size();
    }
    else{
        PLUG_Size();
    }
}

function H5_dpi(){
    if(isIEWeb){
        OCX_dpi();
    }
    else{
        PLUG_dpi();
    }
}

function H5_Color(){
    if(isIEWeb){
        OCX_Color();
    }
    else{
        PLUG_Color();
    }
}

function H5_Rotate(){
    if(isIEWeb){
        OCX_Rotate();
    }
    else{
        PLUG_Rotate();
    }
}

function H5_Origin(){
    if(isIEWeb){
        OCX_Origin();
    }
    else{
        PLUG_Origin();
    }
}

function H5_CutEdge(){
    if(isIEWeb){
        OCX_CutEdge();
    }
    else{
        PLUG_CutEdge();
    }
}

function H5_Flatten(){
    if(isIEWeb){
        OCX_Flatten();
    }
    else{
        PLUG_Flatten();
    }
}

function H5_BlankDetect(){
    if(isIEWeb){
        OCX_BlankDetect();
    }
    else{
        PLUG_BlankDetect();
    }
}

function H5_AutoScan(){
    if(isIEWeb){
        OCX_AutoScan();
    }
    else{
        PLUG_AutoScan();
    }
}

function H5_BMP(){
    if(isIEWeb){
        OCX_BMP();
    }
    else{
        PLUG_BMP();
    }
}

function H5_JPG(){
    if(isIEWeb){
        OCX_JPG();
    }
    else{
        PLUG_JPG();
    }
}

function H5_HTTP_UPLOAD(){
    if(isIEWeb){
        OCX_HTTP_UPLOAD();
    }
    else{
        PLUG_HTTP_UPLOAD();
    }
}

function H5_AddImage(){
    if(isIEWeb){
        OCX_AddImage();
    }
    else{
        PLUG_AddImage();
    }
}

function H5_MergePDF(){
    if(isIEWeb){
        OCX_MergePDF();
    }
    else{
        PLUG_MergePDF();
    }
}

function H5_Rename(){
    if(isIEWeb){
        OCX_Rename();
    }
    else{
        PLUG_Rename();
    }
}

function H5_EdgeDetect(){
    if(isIEWeb){
        OCX_EdgeDetect();
    }
    else{
        PLUG_EdgeDetect();
    }
}

function H5_Delete(file){
    if(isIEWeb){
        OCX_Delete(file);
    }
    else{
        PLUG_Delete(file);
    }
}

function H5_SaveCfg(){
    if(false == isIEWeb){
        PLUG_SaveCfg();
    }
}

function H5_ReadCfg(){
    if(false == isIEWeb){
        PLUG_ReadCfg();
    }
}

function H5_A4(){
    if(isIEWeb){
        OCX_A4();
    }
    else{
        PLUG_A4();
    }
}