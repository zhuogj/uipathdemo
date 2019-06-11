
//指令服务四个端口：10889, 11487, 32548, 48570
//数据服务四个端口：7890, 9945, 25410, 36584

var originalFileNum = null;
var ORIGINAL_FILE = 23; // 文件类型命名使用，代表图片
var imagefile = "d:/tianyanfile/";

var cav_frame = null;
var ctx_frame = null;
var img_frame = null;
var txtlog = null;

var cav_jpg = null;
var ctx_jpg = null;
var img_jpg = null;

var ws_data = null;
//服务的端口号
var data_svc_port = 7890;
var data_svc_connect = false;
//数据通道是否经过身份验证
var data_svc_prove = false;

var ws_cmd = null;
var cmd_svc_port = 10889;
var cmd_svc_connect = false;

//火狐浏览器标记
var firefox_flag = false;

var open_device = false;

//是否A4扫描幅面
var a4_flag = false;

var clip_x = 0;
var clip_y = 0;
var clip_width = 0;
var clip_height = 0;
var clip_select = false;

var bcr_x = 0;
var bcr_y = 0;
var bcr_width = 0;
var bcr_height = 0;
var bcr_select = false;

var edge_detect = false;
//边缘检测四个点的比例系数
var x1 = 0, y1 = 0;
var x2 = 0, y2 = 0;
var x3 = 0, y3 = 0;
var x4 = 0, y4 = 0;

//火狐视频预览分辨率，默认320:240
var x_width = 320, y_height = 240;
var rgba_data = null;

//框选的类型，0(裁剪区域框)、1(条码识别框)
var select_type = -1;

//是否按下鼠标左键标记
var down_flag = false;

//是否绘制视频画面
var is_draw_frame = false;

function EtPlug_Init(cmd_port, data_port, firefox)
{
    cmd_svc_port = cmd_port;
    data_svc_port = data_port;
    firefox_flag = firefox;

    cav_frame = document.getElementById("videoframe");
    ctx_frame = cav_frame.getContext("2d");
    img_frame = new Image();

    rgba_data = ctx_frame.createImageData(320,240);

    /*cav_jpg = document.getElementById("image");
    ctx_jpg = cav_jpg.getContext("2d");
    img_jpg = new Image();*/

    //txtlog = document.getElementById("TextArea1");

    connect_cmd_svc();
    connect_data_svc();

    cav_frame.onmousedown = function(e)
    {
        if(is_draw_frame == true)
        {
            switch(select_type)
            {
                case 0:{
                    if(clip_select){
                        break;
                    }

                    down_flag = true;
                    clip_x = e.offsetX;
                    clip_y = e.offsetY;
                }
                    break;

                case 1:{
                    if(bcr_select){
                        break;
                    }

                    down_flag = true;
                    bcr_x = e.offsetX;
                    bcr_y = e.offsetY;
                }
            }
        }
    }

    cav_frame.onmouseup = function(e)
    {
        if(is_draw_frame == true)
        {
            if(down_flag == false){
                return;
            }

            down_flag = false;

            var data;

            var view_cx = 0, view_cy = 0;
            var exit = false;

            for(var i = 0; i < cav_frame.width; i++)
            {
                for(var j = 0; j < cav_frame.height; j++)
                {
                    if((cav_frame.width - i) * y_height == (cav_frame.height - j) * x_width)
                    {
                        view_cx = cav_frame.width - i, view_cy = cav_frame.height - j;
                        exit = true;
                        break;
                    }
                }

                if(exit){
                    break;
                }
            }

            switch(select_type)
            {
                case 0:{

                    clip_select = true;

                    var X = e.offsetX;
                    var Y = e.offsetY;
                    var x = clip_x;
                    var y = clip_y;

                    if(X < x){
                        var temp = x;
                        x = X;
                        X = temp;
                    }

                    if(Y < y){
                        var temp = y;
                        y = Y;
                        Y = temp;
                    }

                    x -= (cav_frame.width - view_cx) / 2;
                    y -= (cav_frame.height - view_cy) / 2;
                    if(firefox_flag && a4_flag){
                        x -= cav_frame.width / 4;
                    }

                    if(x < 0){
                        x = 0;
                    }
                    if(y < 0){
                        y = 0;
                    }

                    X -= (cav_frame.width - view_cx) / 2;
                    Y -= (cav_frame.height - view_cy) / 2;
                    if(firefox_flag && a4_flag){
                        X -= cav_frame.width / 4;
                    }

                    if(firefox_flag && a4_flag){
                        view_cx /= 2;
                    }

                    if(X < 0){
                        X = 0;
                    }
                    if(X > view_cx){
                        X = view_cx;
                    }

                    if(Y < 0){
                        Y = 0;
                    }
                    if(Y > view_cy){
                        Y = view_cy;
                    }

                    var cx = X - x;
                    var cy = Y - y;

                    data = '{\"id\": 20, \"on\": 1, \"width\": ' + view_cx + ',\"height\":' + view_cy + ',\"x\": ' + x + ',\"y\":' + y + ',\"cx\":' + cx + ',\"cy\":' + cy + '}';
                    ws_cmd.send(data);
                }
                    break;

                case 1:{

                    bcr_select = true;

                    var X = e.offsetX;
                    var Y = e.offsetY;
                    var x = bcr_x;
                    var y = bcr_y;

                    if(X < x){
                        var temp = x;
                        x = X;
                        X = temp;
                    }

                    if(Y < y){
                        var temp = y;
                        y = Y;
                        Y = temp;
                    }

                    x -= (cav_frame.width - view_cx) / 2;
                    y -= (cav_frame.height - view_cy) / 2;
                    if(firefox_flag && a4_flag){
                        x -= cav_frame.width / 4;
                    }

                    if(x < 0){
                        x = 0;
                    }
                    if(y < 0){
                        y = 0;
                    }

                    X -= (cav_frame.width - view_cx) / 2;
                    Y -= (cav_frame.height - view_cy) / 2;
                    if(firefox_flag && a4_flag){
                        X -= cav_frame.width / 4;
                    }

                    if(firefox_flag && a4_flag){
                        view_cx /= 2;
                    }
                    if(X < 0){
                        X = 0;
                    }
                    if(X > view_cx){
                        X = view_cx;
                    }

                    if(Y < 0){
                        Y = 0;
                    }
                    if(Y > view_cy){
                        Y = view_cy;
                    }

                    var cx = X - x;
                    var cy = Y - y;

                    data = '{\"id\": 21, \"on\": 1, \"width\": ' + view_cx + ',\"height\":' + view_cy + ',\"x\": ' + x + ',\"y\":' + y + ',\"cx\":' + cx + ',\"cy\":' + cy + '}';
                    ws_cmd.send(data);
                }
            }
        }

    }

    cav_frame.onmousemove = function(e)
    {
        if(is_draw_frame == true)
        {
            if(down_flag == false){
                return;
            }

            var view_cx = 0, view_cy = 0;
            var exit = false;

            for(var i = 0; i < cav_frame.width; i++)
            {
                for(var j = 0; j < cav_frame.height; j++)
                {
                    if((cav_frame.width - i) * y_height == (cav_frame.height - j) * x_width)
                    {
                        view_cx = cav_frame.width - i, view_cy = cav_frame.height - j;
                        exit = true;
                        break;
                    }
                }

                if(exit){
                    break;
                }
            }

            if(firefox_flag == true)
            {
                ctx_frame.putImageData(rgba_data, 0, 0);
            }
            else{
                ctx_frame.fillStyle="#000000";
                ctx_frame.fillRect(0, 0, cav_frame.width, cav_frame.height);
                ctx_frame.drawImage(img_frame,
                    (cav_frame.width - view_cx) / 2,
                    (cav_frame.height - view_cy) / 2,
                    view_cx,
                    view_cy
                );
            }

            switch(select_type)
            {
                case 0:{
                    clip_width = e.offsetX - clip_x;
                    clip_height = e.offsetY - clip_y;
                    ctx_frame.shadowBlur = 5;
                    ctx_frame.shadowColor = "rgba(0,0,0,0.5)";
                    ctx_frame.strokeStyle="#FF0000";
                    ctx_frame.lineWidth=1;
                    ctx_frame.beginPath();
                    ctx_frame.rect(clip_x, clip_y, clip_width, clip_height);
                    ctx_frame.stroke();
                }
                    break;

                case 1:{
                    bcr_width = e.offsetX - bcr_x;
                    bcr_height = e.offsetY - bcr_y;

                    ctx_frame.shadowBlur = 5;
                    ctx_frame.shadowColor = "rgba(0,0,0,0.5)";
                    ctx_frame.strokeStyle="#FFFF00";
                    ctx_frame.lineWidth=1;
                    ctx_frame.beginPath();
                    ctx_frame.rect(bcr_x, bcr_y, bcr_width, bcr_height);
                    ctx_frame.stroke();
                }
                    break;
            }
            drawRect();
        }
    }
}

function EtPlug_Deinit(){
    if(open_device){
        open_device = false;
        PLUG_CloseDevice();
    }
}

function connect_data_svc(){
    var url = "ws://localhost:" + data_svc_port + "/";

    if ('WebSocket' in window){
        ws_data = new WebSocket(url);
    }
    else if ('MozWebSocket' in window){
        ws_data = new MozWebSocket(url);
    }
    else{
        alert("浏览器不支持WebSocket");
    }
    dataWebSocketEvent();
}

function connect_cmd_svc(){
    var url = "ws://localhost:" + cmd_svc_port + "/";
    if ('WebSocket' in window)
    {
        ws_cmd = new WebSocket(url);
    }
    else if ('MozWebSocket' in window)
    {
        ws_cmd = new MozWebSocket(url);
    }
    else
    {
        alert("浏览器不支持WebSocket");
    }
    cmdWebSocketEvent();
}

function dataWebSocketEvent(){
    ws_data.onopen = function()
    {
        data_svc_connect = true;
        //alert("成功连接数据服务器");

        //成功连接服务器后，需要发送身份验证消息
        //身份验证格式: {"id": 1000}
        //成功收到验证反馈消息: {"id": 1001, "status": "success"}，说明为CZUR提供
        ws_data.send('{\"id\": 1000}');
    }

    ws_data.onmessage = function(e)
    {
        if(data_svc_prove == false)
        {
            var jsonObj = window.JSON.parse(e.data);
            if(jsonObj.id == 1001){

                //身份验证成功
                data_svc_prove = true;

                //txtlog.value = "数据服务器身份验证成功: " + jsonObj.status + "\r\n" + txtlog.value;
                if(firefox_flag == true){
                    //如果是火狐浏览器，设置数据通道的格式为二进制
                    ws_data.binaryType = "arraybuffer";
                }
            }
            else{
                //发送的身份验证数据包有问题
                //txtlog.value = "数据服务器身份验证失败: " + jsonObj.error + "\r\n" + txtlog.value;
            }
            return;
        }

        if(e.data[0] == '{'){
            var jsonObj = window.JSON.parse(e.data);
            if(jsonObj.id == 112){
                x_width  = jsonObj.width;
                y_height = jsonObj.height;
                return;
            }
        }

        is_draw_frame = true;

        if(firefox_flag == true)
        {
            var aDataArray = new Uint8Array(e.data);

            //发送的视频帧格式为ARGB，赋值的时候注意顺序
            for(var i =0; i < rgba_data.data.length; i+=4){
                rgba_data.data[i+0] = aDataArray[i+1];
                rgba_data.data[i+1] = aDataArray[i+2];
                rgba_data.data[i+2] = aDataArray[i+3];
                rgba_data.data[i+3] = aDataArray[i+0];
            }
            ctx_frame.putImageData(rgba_data, 0, 0);
            drawRect();
        }
        else
        {
            var view_cx = 0, view_cy = 0;
            var exit = false;

            //根据比例，计算图像显示的区域
            for(var i = 0; i < cav_frame.width; i++)
            {
                for(var j = 0; j < cav_frame.height; j++)
                {
                    if((cav_frame.width - i) * y_height == (cav_frame.height - j) * x_width)
                    {
                        view_cx = cav_frame.width - i, view_cy = cav_frame.height - j;
                        exit = true;
                        break;
                    }
                }

                if(exit){
                    break;
                }
            }

            img_frame.crossOrigin = 'anonymous';
            img_frame.src = 'data:image/jpeg;base64,' + e.data;
            img_frame.onload = function(e){
                ctx_frame.fillStyle="#000000";
                ctx_frame.fillRect(0, 0, cav_frame.width, cav_frame.height);
                ctx_frame.drawImage(
                    img_frame,
                    0, 0, x_width, y_height,
                    (cav_frame.width - view_cx) / 2,
                    (cav_frame.height - view_cy) / 2,
                    view_cx,
                    view_cy
                );
                drawRect();
            }
        }


    }

    ws_data.onclose = function()
    {
        data_svc_prove = false;
        data_svc_connect = false;
        alert("未连接数据服务器");
    }

}

function drawRect(){

    if(edge_detect == true)
    {
        var view_cx = 0, view_cy = 0;
        var exit = false;

        for(var i = 0; i < cav_frame.width; i++)
        {
            for(var j = 0; j < cav_frame.height; j++)
            {
                if((cav_frame.width - i) * y_height == (cav_frame.height - j) * x_width)
                {
                    view_cx = cav_frame.width - i, view_cy = cav_frame.height - j;
                    exit = true;
                    break;
                }
            }

            if(exit){
                break;
            }
        }

        var x = (cav_frame.width - view_cx) / 2;
        var y = (cav_frame.height - view_cy) / 2;

        ctx_frame.shadowBlur = 5; // 设置模糊度
        ctx_frame.shadowColor = "rgba(0,1,0,0)"; // 设置阴影颜色
        ctx_frame.strokeStyle="#0000FF";
        ctx_frame.lineWidth=2;
        ctx_frame.beginPath();

        if(firefox_flag && a4_flag){
            view_cx /= 2;
            ctx_frame.moveTo(x + x1 * view_cx + view_cx / 2, y + y1 * view_cy);
            ctx_frame.lineTo(x + x2 * view_cx + view_cx / 2, y + y2 * view_cy);

            ctx_frame.moveTo(x + x2 * view_cx + view_cx / 2, y + y2 * view_cy);
            ctx_frame.lineTo(x + x3 * view_cx + view_cx / 2, y + y3 * view_cy);

            ctx_frame.moveTo(x + x3 * view_cx + view_cx / 2, y + y3 * view_cy);
            ctx_frame.lineTo(x + x4 * view_cx + view_cx / 2, y + y4 * view_cy);

            ctx_frame.moveTo(x + x4 * view_cx + view_cx / 2, y + y4 * view_cy);
            ctx_frame.lineTo(x + x1 * view_cx + view_cx / 2, y + y1 * view_cy);
            ctx_frame.stroke();
        }
        else{
            ctx_frame.moveTo(x + x1 * view_cx, y + y1 * view_cy);
            ctx_frame.lineTo(x + x2 * view_cx, y + y2 * view_cy);

            ctx_frame.moveTo(x + x2 * view_cx, y + y2 * view_cy);
            ctx_frame.lineTo(x + x3 * view_cx, y + y3 * view_cy);

            ctx_frame.moveTo(x + x3 * view_cx, y + y3 * view_cy);
            ctx_frame.lineTo(x + x4 * view_cx, y + y4 * view_cy);

            ctx_frame.moveTo(x + x4 * view_cx, y + y4 * view_cy);
            ctx_frame.lineTo(x + x1 * view_cx, y + y1 * view_cy);
            ctx_frame.stroke();
        }
    }

    if(clip_select == true)
    {
        ctx_frame.shadowBlur = 5; // 设置模糊度
        ctx_frame.shadowColor = "rgba(0,1,0,0)"; // 设置阴影颜色
        ctx_frame.strokeStyle="#FF0000";
        ctx_frame.lineWidth=1;
        ctx_frame.beginPath();
        ctx_frame.rect(clip_x, clip_y, clip_width, clip_height);
        ctx_frame.stroke();
    }

    if(bcr_select == true)
    {
        ctx_frame.shadowBlur = 5; // 设置模糊度
        ctx_frame.shadowColor = "rgba(0,1,0,0)"; // 设置阴影颜色
        ctx_frame.strokeStyle="#FFFF00";
        ctx_frame.lineWidth=1;
        ctx_frame.beginPath();
        ctx_frame.rect(bcr_x, bcr_y, bcr_width, bcr_height);
        ctx_frame.stroke();
    }
}

function cmdWebSocketEvent()
{
    ws_cmd.onopen = function()
    {
        cmd_svc_connect = true;
        //alert("成功连接指令服务器");

        //成功连接服务器后，需要发送身份验证消息
        //身份验证格式: {"id": 1000}
        //成功收到验证反馈消息: {"id": 1001, "status": "success"}，说明为CZUR提供
        ws_cmd.send('{\"id\": 1000}');
    }

    ws_cmd.onmessage = function(e)
    {
        var jsonObj = window.JSON.parse(e.data);
        switch(jsonObj.id){
            //身份验证反馈消息
            case 1001:{
                //txtlog.value = "指令服务器身份验证成功: " + jsonObj.status + "\r\n" + txtlog.value;
            }
                break;

            //打开设备反馈消息
            case 200:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "打开设备失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                    alert("打开设备失败，请检查设备是否已连接本机！");
                }
                else{
                    open_device = true;
                    //成功
                    //txtlog.value = "打开设备成功\r\n" + txtlog.value;
                }
            }
                break;

            //拍照反馈消息
            case 201:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "拍照失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //反馈成功，不代表设备已拍照，可能唤醒处于休眠状态的设备，应处理109的消息
                    //txtlog.value = "拍照成功\r\n" + txtlog.value;
                }
            }
                break;

            case 109:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "拍照失败: 请检查路径是否有效，名称前缀是否包含特殊字符(\\、/、:、*、?、<、>、|)\r\n" + txtlog.value;
                    console.log("拍照失败: 请检查路径是否有效，名称前缀是否包含特殊字符(\\、/、:、*、?、<、>、|)\r\n");
                }
                else{
                    //txtlog.value = "图片保存成功，正在进行处理\r\n" + txtlog.value;
                }
            }
                break;

            //关闭设备反馈
            case 203:{

                open_device = false;
                edge_detect = false;
                clip_select = false;
                bcr_select = false;
                a4_flag = false;
                is_draw_frame = false;

                //预览画面清除
                ctx_frame.fillStyle="#000000";
                ctx_frame.beginPath();
                ctx_frame.fillRect(0,0,cav_frame.width, cav_frame.height);
                ctx_frame.closePath();

                if(jsonObj.hasOwnProperty("error")){
                    var text = "关闭设备失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //关闭设备成功
                    //txtlog.value = "关闭设备成功\r\n" + txtlog.value;
                }
            }
                break;

            //自定义名称格式
            case 204:{
                //成功
                //txtlog.value = "自定义格式成功\r\n" + txtlog.value;
            }
                break;

            //保存路径反馈消息
            case 205:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "设置路径失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "设置路径成功\r\n" + txtlog.value;
                }
            }
                break;

            //图片尺寸反馈消息
            case 206:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "设置尺寸失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "设置尺寸成功\r\n" + txtlog.value;
                }
            }
                break;

            //图片dpi反馈消息
            case 207:{
                //成功
                //txtlog.value = "设置DPI成功\r\n" + txtlog.value;
            }
                break;

            //色彩模式反馈消息
            case 208:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "设置色彩模式失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "设置色彩模式成功\r\n" + txtlog.value;
                }
            }
                break;

            //旋转角度反馈消息
            case 209:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "设置旋转角度失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "设置旋转角度成功\r\n" + txtlog.value;
                }
            }
                break;

            //原图模式反馈消息
            case 210:{
                //成功
                //txtlog.value = "设置原图模式成功\r\n" + txtlog.value;
            }
                break;

            //单页裁边反馈消息
            case 211:{
                //成功
                //txtlog.value = "设置单页裁边成功\r\n" + txtlog.value;
            }
                break;

            //曲线展平反馈消息
            case 212:{
                //成功
                //txtlog.value = "设置曲面展平成功\r\n" + txtlog.value;
            }
                break;

            //空白页检测反馈消息
            case 213:{
                //成功
                //txtlog.value = "设置空白页检测成功\r\n" + txtlog.value;
            }
                break;

            //翻页检测反馈消息
            case 214:{
                //成功
                //txtlog.value = "设置翻页检测成功\r\n" + txtlog.value;
            }
                break;

            //BMP格式反馈消息
            case 215:{
                //成功
                //txtlog.value = "设置BMP格式成功\r\n" + txtlog.value;
            }
                break;

            //JPG格式反馈消息
            case 216:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "设置JPG格式失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "设置JPG格式成功\r\n" + txtlog.value;
                }
            }
                break;

            //HTTP上传反馈消息
            case 217:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "设置HTTP上传失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "正在进行HTTP上传，请稍后\r\n" + txtlog.value;
                }
            }
                break;

            //添加合成PDF图片反馈消息
            case 218:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "添加图片失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "添加图片成功\r\n" + txtlog.value;
                }
            }
                break;

            //合成PDF反馈消息
            case 219:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "合成PDF失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "正在合成PDF，请稍后\r\n" + txtlog.value;
                }
            }
                break;

            //手动裁剪反馈消息
            case 220:{
                if(jsonObj.on != 0){
                    //txtlog.value = "已开启区域裁剪区域\r\n" + txtlog.value;
                }
                else{
                    clip_select = false;
                    //txtlog.value = "已关闭区域裁剪区域\r\n" + txtlog.value;
                }
            }
                break;

            //条码识别反馈消息
            case 221:{
                if(jsonObj.on != 0){
                    //txtlog.value = "已开启条码识别区域\r\n" + txtlog.value;
                }
                else{
                    bcr_select = false;
                    //txtlog.value = "已关闭条码识别区域\r\n" + txtlog.value;
                }
            }
                break;

            //base64数据反馈消息
            case 222:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "获取base64数据失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //将接收到的base64数据直接显示
                    /*img_jpg.crossOrigin = 'anonymous';
                    img_jpg.src = 'data:image/jpeg;base64,' + jsonObj.success;
                    img_jpg.onload = function(e){
                        ctx_jpg.drawImage(img_jpg, 0, 0, cav_jpg.width, cav_jpg.height);
                    }*/
                }
            }
                break;

            //重命名文件名称
            case 223:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "重命名文件失败\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "重命名文件成功\r\n" + txtlog.value;
                }
            }
                break;

            //设置火狐浏览器反馈
            case 224:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "设置浏览器类型失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "设置浏览器类型成功\r\n" + txtlog.value;
                }
            }
                break;

            //边缘检测设置反馈
            case 225:{
                if(jsonObj.on != 0){
                    x1 = 0; y1 = 0;
                    x2 = 0; y2 = 0;
                    x3 = 0; y3 = 0;
                    x4 = 0; y4 = 0;
                    edge_detect = true;
                    //txtlog.value = "开启边缘检测\r\n" + txtlog.value;
                }
                else{
                    edge_detect = false;
                    //txtlog.value = "关闭边缘检测\r\n" + txtlog.value;
                }
            }
                break;

            //删除文件反馈
            case 226:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "删除文件失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "删除文件成功\r\n" + txtlog.value;
                }
            }
                break;



            //设置配置信息反馈
            case 227:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "保存配置信息失败\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "保存配置信息成功\r\n" + txtlog.value;
                }
            }
                break;

            //读取配置信息反馈
            case 228:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "读取配置信息失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "读取配置信息成功\r\n" + txtlog.value;
                    /*
                    返回的扫描信息对界面进行更新
                    返回的json格式为：
                    "{"id": 228, "status": "success", "path": "保存路径", "prefix": "命名前缀", "number": 起始序号, 
                    "width": 宽度, "height": 高度, "dpi": 图片dpi, "clr": 色彩模式(0~5), "angle": 旋转角度(0、90、180、270), 
                    "blankdetect": 0(关闭空白页检测)、1(开启空白页检测), "format": 0(BMP)、1(JPG), "quality": JPG质量, 
                    "process": 1(原图)、2(单页裁边)、3(书籍展平), "split": 0(不拆分)、1(拆分), "a4": 0(开启A4幅面)、1(关闭A4幅面)}"
                    */

                }
            }
                break;

            //设置A4扫描反馈
            case 229:{
                if(jsonObj.on != 0){
                    a4_flag = true;
                    //txtlog.value = "开启A4扫描幅面\r\n" + txtlog.value;
                }
                else{
                    a4_flag = false;
                    //txtlog.value = "关闭A4扫描幅面\r\n" + txtlog.value;
                }
            }
                break;

            //发送数据包反馈消息
            case 100:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "发送数据包失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    //txtlog.value = "发送数据包成功\r\n" + txtlog.value;
                }
            }
                break;

            //合成PDF结果反馈消息
            case 101:{
                if(jsonObj.hasOwnProperty("error")){
                    //txtlog.value = "合成PDF文档失败: " + jsonObj.error + "\r\n" + txtlog.value;
                }
                else{
                    //txtlog.value = "合成PDF文档成功\r\n" + txtlog.value;
                }
            }
                break;

            //HTTP上传结果反馈消息
            case 102:{
                if(jsonObj.hasOwnProperty("error")){
                    var text = "HTTP上传失败: " + jsonObj.error + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
                else{
                    //成功
                    var text = "HTTP上传成功: " + jsonObj.status + "\r\n";
                    //txtlog.value = text + txtlog.value;
                }
            }
                break;

            //单张图片结果反馈消息
            case 103:{
                //将图片名称显示到列表中
                //txtlog.value = "图片: " + jsonObj.file + "\r\n" + txtlog.value;
                //重命名文件
                //生成图片名称
                $.ajax({
                    async:false,
                    url:"/common/getFileCode",
                    type:"post",
                    data:{serviceTypeCode:ORIGINAL_FILE},
                    success:function(data){
                        originalFileNum = data;
                        PLUG_Rename(jsonObj.file,originalFileNum);
                    },
                    error:function(e){
                        alert("异常，请重试！");
                    }
                });


                var expressNum = $("input[name='expressNum']").val();
                //向后台添加一条原始文件的数据
                /*$.ajax({
                    url:"/image/addOriginalFile",
                    type:"post",
                    data:{expressNum:expressNum,fileCode:originalFileNum,filePath:jsonObj.file},
                    async:false,
                    success:function(data){

                        //后台添加成功后 生成图片名称，表格添加一行数据
                        layui.use('table', function(){
                            var table = layui.table;
                            var tablebak = table.cache['imagetable'];
                            var id = tablebak.length+1;
                            var time = getFormatDate1();
                            tablebak.push({
                                id:id,
                                originalFileNum:originalFileNum + ".jpg",
                                time:time
                            })
                            table.reload('imagetable',
                                {	 data:tablebak
                                });
                        });
                    },
                    error:function(e){
                        alert("异常，请重试！");
                    }
                });*/

                //上传文件到阿里云 //参数：远程服务url，字段名称，本地文件地址
                var key = PLUG_HTTP_UPLOAD("/image/uploadOriginalFile",file,jsonObj.file);
                //向后台添加一条原始文件的数据
                $.ajax({
                    url:"/image/addOriginalFile",
                    type:"post",
                    data:{expressNum:expressNum,fileCode:originalFileNum,key:key},
                    async:false,
                    success:function(data){
                        //后台添加成功后 生成图片名称，表格添加一行数据
                        layui.use('table', function(){
                            var table = layui.table;
                            var tablebak = table.cache['imagetable'];
                            var id = tablebak.length+1;
                            var time = getFormatDate1();
                            tablebak.push({
                                id:id,
                                originalFileNum:originalFileNum + ".jpg",
                                time:time
                            })
                            table.reload('imagetable',
                                {	 data:tablebak
                                });
                        });
                    },
                    error:function(e){
                        alert("异常，请重试！");
                    }
                });
                //文件数量加1
                var currCount = parseInt($("input[name='count']").val());
                $("input[name='count']").val(currCount+1);

                //如果需要显示jpg图片，发送消息: {"id": 22, "file": "jpg名称"}
                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file + '\"' + '}';
                ws_cmd.send(text);
            }
                break;

            //左、右页图片反馈消息
            case 104:{
                //将图片名称显示到列表中
                //txtlog.value = "左侧图片: " + jsonObj.file1 + "\r\n" + txtlog.value;
                //txtlog.value = "右侧图片: " + jsonObj.file2 + "\r\n" + txtlog.value;

                //左侧图片
                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file1 + '\"' + '}';
                ws_cmd.send(text);
                //右侧图片
                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file2 + '\"' + '}';
                ws_cmd.send(text);
            }
                break;

            //开启空白页检测，检测到图片均为空白图片
            case 105:{
                //不存在图片
            }
                break;

            //单张图片+条码内容 反馈消息
            case 106:{
                //图片名称为: jsonObj.file
                //条码内容为: jsonOjb.text(可为空)

                //txtlog.value = "图片: " + jsonObj.file + "\r\n" + txtlog.value;

                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file + '\"' + '}';
                ws_cmd.send(text);

                //显示条码内容
                //txtlog.value = "条码内容: " + jsonObj.text + "\r\n" + txtlog.value;
            }
                break;

            //左右页图片+条码内容 反馈消息
            case 107:{
                //左侧图片: jsonObj.file1;
                //右侧图片: jsonObj.file2;
                //条码内容: jsonObj.text(可为空)

                //txtlog.value = "左侧图片: " + jsonObj.file1 + "\r\n" + txtlog.value;
                //txtlog.value = "右侧图片: " + jsonObj.file2 + "\r\n" + txtlog.value;

                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file1 + '\"' + '}';
                ws_cmd.send(text);

                var text = '{\"id\": 22, \"file\": ' + '\"' + jsonObj.file2 + '\"' + '}';
                ws_cmd.send(text);

                //txtlog.value = "条码内容: " + jsonObj.text + "\r\n" + txtlog.value;
            }
                break;

            //开启空白页检测，检测到图片均为空白图片，既为空白图片，也就不会存在条码，
            //但为了预防算法检测BUG，还是需要处理下该消息
            case 108:{
                //不存在图片
                //条码内容: jsonObj.text(可为空)
                //txtlog.value = "条码内容: " + jsonObj.text + "\r\n" + txtlog.value;
            }
                break;

            //设备拔出通知
            case 110:{
                //txtlog.value = "设备拔出\r\n" + txtlog.value;
            }
                break;

            //边缘检测区域通知
            case 111:{
                x1 = jsonObj.x1;
                y1 = jsonObj.y1;
                x2 = jsonObj.x2;
                y2 = jsonObj.y2;
                x3 = jsonObj.x3;
                y3 = jsonObj.y3;
                x4 = jsonObj.x4;
                y4 = jsonObj.y4;
            }
                break;
        }
    }

    ws_cmd.onclose = function()
    {
        cmd_svc_connect = false;
        alert("未连接指令服务器");
    }
}

function PLUG_OpenDevice(){
    //通知插件服务浏览器的类型，以及视频预览的分辨率
    if(firefox_flag == true){
        var data = '{\"id\": 24, \"firefox\": 1}';
        ws_cmd.send(data);
    }
    else{
        ws_cmd.send('{\"id\": 24, \"firefox\": 0}');
    }
    //打开设备，格式：{"id": 0}
    ws_cmd.send('{\"id\": 0}');
}

function PLUG_Capture(){
    //拍照，格式: {"id": 1}
    ws_cmd.send('{\"id\": 1}');
}

function PLUG_CloseDevice(){
    //关闭设备，格式: {"id": 3}
    ws_cmd.send('{\"id\": 3}');
}

function PLUG_Custom(prefix){
    //自定义名称格式化，格式：{"id": 4, "prefix": "格式前缀", "num": 起始序号}
    var data = '{\"id\": 4, \"prefix\": ' + '\"' + prefix + '\"' + ',' + '\"num\":""}';
    ws_cmd.send(data);
}

function PLUG_SavePath(path){
    //保存路径，格式: {"id": 5, "path": "路径名称"}

    //var path = document.getElementById("path"); + '\"' + path + '\"' +
    var data = '{\"id\": 5, \"path\": "D:/tianyanfiles/" }';
    ws_cmd.send(data);
}

function PLUG_Size(){
    //设置宽高，格式: {"id": 6, "width": width, "height": height}

    var width = document.getElementById("width");
    var height = document.getElementById("height");

    var data = '{\"id\": 6, \"width\": ' + width.value + ',' + '\"height\": ' + height.value + '}';
    ws_cmd.send(data);
}

function PLUG_dpi(){
    //图片dpi，格式: {"id": 7, "dpi": value}

    //var dpi = document.getElementById("dpi");

    var data = '{\"id\": 7, \"dpi\": 30}';
    ws_cmd.send(data);
}

function PLUG_Color(){
    //色彩模式，格式: {"id": 8, "clr": value}

    var clr = document.getElementById("clr");

    var data = '{\"id\": 8, \"clr\": ' + clr.value + '}';
    ws_cmd.send(data);
}

function PLUG_Rotate(){
    //旋转角度，格式: {"id": 9, "angle": value}

    var angle = document.getElementById("angle");

    var data = '{\"id\": 9, \"angle\": ' + angle.value + '}';
    ws_cmd.send(data);
}

function PLUG_Origin(){
    //原图不裁边和展平，格式: {"id": 10}

    select_type = -1;
    ws_cmd.send('{\"id\": 10}');
}

function PLUG_CutEdge(){
    //单页裁边，格式: {"id": 11}

    select_type = -1;
    ws_cmd.send('{\"id\": 11}');
}

function PLUG_Flatten(){
    //书籍展平，格式: {"id": 12, "split": 1/0}

    select_type = -1;
    var split = document.getElementById("split");
    if(split.value != 0){
        ws_cmd.send('{\"id\": 12, \"split\": 1}');
    }
    else{
        ws_cmd.send('{\"id\": 12, \"split\": 0}');
    }
}

function PLUG_BlankDetect(){
    //空白页检测，格式: {"id": 13, "detect": 1/0}

    var detect = document.getElementById("detect");

    if(detect.value != 0){
        ws_cmd.send('{\"id\": 13, \"detect\": 1}');
    }
    else{
        ws_cmd.send('{\"id\": 13, \"detect\": 0}');
    }
}

function PLUG_AutoScan(){
    //翻页检测，格式: {"id": 14, "detect": 1/0}

    var detectPage = document.getElementById("detectPage");

    if(detectPage.value != 0){
        ws_cmd.send('{\"id\": 14, \"detect\": 1}');
    }
    else{
        ws_cmd.send('{\"id\": 14, \"detect\": 0}');
    }
}

function PLUG_SelectClip(){
    select_type = 0;
}

function PLUG_ClearClip(){
    //清除手动框选区域，格式: "{"id":20, "on": 0}"

    ws_cmd.send('{\"id\":20, \"on\": 0}');
}

function PLUG_SelectBCR(){
    select_type = 1;
}

function PLUG_ClearBCR(){
    //清除条码选择区域，格式: "{"id":21, "on": 0}"
    ws_cmd.send('{\"id\":21, \"on\": 0}');
}

function PLUG_BMP(){
    //BMP类型，格式: {"id": 15}

    ws_cmd.send('{\"id\": 15}');
}

function PLUG_JPG(){
    //JPG类型，格式: {"id": 16, "quality": value}

    var quality = document.getElementById("quality");

    var data = '{\"id\": 16, \"quality\": ' + quality.value + '}';
    ws_cmd.send(data);
}

function PLUG_HTTP_UPLOAD(url,name,file){
    //http上传，格式: {"id": 17, "url": "url地址", "name": "form表单名称", "file": "本地文件"}

   /* var url = document.getElementById("url");
    var name = document.getElementById("formname");
    var file = document.getElementById("file");*/

    var data = '{\"id\": 17, \"url\":' + '\"' + url.value + '\",' + '\"name\":' + '\"' + name.value + '\",' + '\"file\":' + '\"' + file.value + '\"' + '}';
    ws_cmd.send(data);
}

function PLUG_AddImage(image){
    //添加合成PDF文档的图片文件，格式: {"id": 18, "file": "本地图片文件"}

    //var image = document.getElementById("localimage");
    var data = '{\"id\": 18, \"file\": ' + '\"' + image + '\"' + '}';
    ws_cmd.send(data);
}

function PLUG_MergePDF(pdf){
    //合成PDF文档，格式: {"id": 19, "pdf": "pdf文档名称"}
    var data = '{\"id\": 19, \"pdf\": ' + '\"' + pdf + '\"' + '}';
    ws_cmd.send(data);
}

function PLUG_Rename(filepath,newfilename){
    //重命名文件，格式: {"id": 23, "file": "本地文件", "name": "新名称"}

    var data = '{\"id\": 23, \"file\": \"' + filepath + '\", \"name\": \"' + newfilename + '\"}';
    ws_cmd.send(data);
}

function PLUG_EdgeDetect(){
    //边缘检测，格式: {"id": 25, "on": 1/0}

    var detect = document.getElementById("detectedge");
    if(detect.value != 0){
        ws_cmd.send('{\"id\": 25, \"on\": 1}');
    }
    else{
        ws_cmd.send('{\"id\": 25, \"on\": 0}');
    }
}

function PLUG_Delete(file){
    //删除文件，格式: {"id": 26, "file": "本地文件"}
    var data = '{\"id\": 26, \"file\": \"' + file + '\"}';
    ws_cmd.send(data);
}

function PLUG_SaveCfg(){
    //保存配置信息，格式: {"id": 27}

    ws_cmd.send('{\"id\": 27}');
}

function PLUG_ReadCfg(){
    //读取配置信息，格式: {"id": 28}

    ws_cmd.send('{\"id\": 28}');
}

function PLUG_A4(){
    //设置A4扫描幅面，格式: {"id": 29, "on": 1/0}

    var a4 = 1;
    if(a4.value != 0){
        ws_cmd.send('{\"id\": 29, \"on\": 1}');
    }
    else{
        ws_cmd.send('{\"id\": 29, \"on\": 0}');
    }
}