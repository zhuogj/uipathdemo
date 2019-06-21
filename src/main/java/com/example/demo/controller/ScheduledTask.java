package com.example.demo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/21 10:53
 * @Version : 1.0
 */
@Component
@Slf4j
public class ScheduledTask {
    @Async("executor")
    @Scheduled(fixedRate = 5000)
    public void getCurrentDate(){
        log.info("springbootTask定时任务执行获取当前时间:"+new Date()+Thread.currentThread().getName());
    }
}
