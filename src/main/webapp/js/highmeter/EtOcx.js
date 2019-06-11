
var cav_jpg = null;
var ctx_jpg = null;
var img_jpg = null;
var txtlog = null;
var open_device = false;

function EtOcx_Init(){
	cav_jpg = document.getElementById("image");
	ctx_jpg = cav_jpg.getContext("2d");
	img_jpg = new Image();
	txtlog = document.getElementById("TextArea1");

	EtOcxEx.CZUR_Initialize("JSOCX.log");
}

function EtOcx_Deinit(){
	if(open_device){
		EtOcxEx.CZUR_CloseDevice();
	}
	EtOcxEx.CZUR_Deinitialize();
}

function OCX_OpenDevice(){
	switch(EtOcxEx.CZUR_OpenDevice())
	{
		case 0:{
			txtlog.value = "打开设备失败\r\n" + txtlog.value;
		}
		break;
		
		case 1:{
			open_device = true;
			txtlog.value = "打开设备成功\r\n" + txtlog.value;
		}
		break;
		
		default:{
			txtlog.value = "请检查设备是否连接或型号是否支持\r\n" + txtlog.value;
		}
		break;
	}
}

function OCX_Capture(){
	//设备拍照
	
	var ret = EtOcxEx.CZUR_GrabSingleImage();
    if (0 == ret){
        txtlog.value = "触发设备拍照失败\r\n" + txtlog.value;
    }
}

function OCX_CloseDevice(){
	//关闭设备
	open_device = false;
	EtOcxEx.CZUR_CloseDevice();
}

function OCX_Custom(){
	//自定义名称格式化
	
	var prefix = document.getElementById("prefix");
	var number = document.getElementById("number");
	
	EtOcxEx.CZUR_Custom(prefix.value, number.value);
}

function OCX_SavePath(){
	//保存路径
	
	var path = document.getElementById("path");
	
	EtOcxEx.CZUR_Path(path.value);
}

function OCX_Size(){
	//设置宽高
	
	var width = document.getElementById("width");
	var height = document.getElementById("height");
	
	 EtOcxEx.CZUR_Zoom(width.value, height.value);
}

function OCX_dpi(){
	//设置图片dpi
	
	var dpi = document.getElementById("dpi");
	
	EtOcxEx.CZUR_DPI(dpi.value);
}

function OCX_Color(){
	//色彩模式
	
	var clr = document.getElementById("clr");
	
	EtOcxEx.CZUR_ClrMode(clr.value);
}

function OCX_Rotate(){
	//旋转角度
	
	var angle = document.getElementById("angle");
	
	EtOcxEx.CZUR_Rotate(angle.value);
}

function OCX_Origin(){
	//原图不裁边和展平
	
	EtOcxEx.CZUR_Original();
}

function OCX_CutEdge(){
	//单页裁边
	
	 EtOcxEx.CZUR_EdgeCutting();
}

function OCX_Flatten(){
	//书籍展平
	
	var split = document.getElementById("split");
	if(split.value != 0){
		 EtOcxEx.CZUR_CurveFlatten(1);
	}
	else{
		 EtOcxEx.CZUR_CurveFlatten(0);
	}
}

function OCX_BlankDetect(){
	//空白页检测
	
	var detect = document.getElementById("detect");

	if(detect.value != 0){
		EtOcxEx.CZUR_BlankPageDetect(1);
	}
	else{
		EtOcxEx.CZUR_BlankPageDetect(0);
	}
}

function OCX_AutoScan(){
	//翻页检测
	
	var detectPage = document.getElementById("detectPage");
	
	if(detectPage.value != 0){
		EtOcxEx.CZUR_AutoPageDetect(1);
	}
	else{
		EtOcxEx.CZUR_AutoPageDetect(0);
	}
}

function OCX_SelectClip(){
	//设置手动框选区域选择
	
	EtOcxEx.CZUR_SelectType(1);
}

function OCX_ClearClip(){
	//清除手动框选区域
	
	EtOcxEx.CZUR_ClearSelect(1);
}

function OCX_SelectBCR(){
	//设置条码识别区域
	
	EtOcxEx.CZUR_SelectType(2);
}

function OCX_ClearBCR(){
	//清除条码识别区域
	
	EtOcxEx.CZUR_ClearSelect(2);
}

function OCX_BMP(){
	//BMP类型
	
	EtOcxEx.CZUR_Format_Bmp();
}

function OCX_JPG(){
	//JPG类型
	
	var quality = document.getElementById("quality");
	
	EtOcxEx.CZUR_Format_Jpg(quality.value);
}

function OCX_HTTP_UPLOAD(){
	//http上传
	
	var url = document.getElementById("url");
	var name = document.getElementById("formname");
	var file = document.getElementById("file");
	
	EtOcxEx.CZUR_Http_Upload(file.value, url.value, name.value, "", "");
}

function OCX_AddImage(){
	//添加合成PDF文档的图片文件
	
	var image = document.getElementById("localimage");
	EtOcxEx.CZUR_Pdf_Image(image.value);
}

function OCX_MergePDF(){
	//合成PDF文档
	
	var pdf = document.getElementById("pdf");
	EtOcxEx.CZUR_Pdf_Submit(pdf.value)
}

function OCX_Rename(){
	//重命名文件
	
	var file = document.getElementById("refile");
	var name = document.getElementById("newname");	
	EtOcxEx.CZUR_RenameFile(file.value, name.value);
}

function OCX_EdgeDetect(){
	//边缘检测
	
	var detect = document.getElementById("detectedge");
	if(detect.value != 0){
		EtOcxEx.CZUR_EdgeDetect(1);
	}
	else{
		EtOcxEx.CZUR_EdgeDetect(0);
	}
}

function OCX_Delete(file){
	//删除文件
	
	EtOcxEx.CZUR_DeleteFile(file);
}

function OCX_A4(){
	//设置A4扫描幅面

	var a4 = document.getElementById("a4");
	if(a4.value != 0){
		 EtOcxEx.CZUR_ScanBreadth(1);
	}
	else{
		EtOcxEx.CZUR_ScanBreadth(0);
	}
}

function OCX_Base64(jpgfile){

	var base64 = EtOcxEx.CZUR_Base64(jpgfile);
	
	img_jpg.crossOrigin = 'anonymous';
	img_jpg.src = 'data:image/jpeg;base64,' + base64;

	img_jpg.onload = function(e){
		ctx_jpg.drawImage(img_jpg, 0, 0, cav_jpg.width, cav_jpg.height);
	}
}