package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/3 14:13
 * @Version : 1.0
 */
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ResponseResult {
    /**
     * 1成功；0失败
     */
    private Integer code;
    /**
     * 结果信息
     */
    private String msg;
    /**
     * 封装的内容
     */
    private Object data;
    public ResponseResult(Integer code, String msg){
        this.code = code;
        this.msg = msg;
    }
    public static ResponseResult OK(){
        return new ResponseResult(1,"success");
    }
    public static ResponseResult ERROR(){
        return new ResponseResult(0,"error");
    }

}
