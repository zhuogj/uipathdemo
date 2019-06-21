package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/21 10:31
 * @Version : 1.0
 */
@Controller
@RequestMapping("/timer")
public class TimerController {
    private static Logger logger = LoggerFactory.getLogger(TimerController.class);
    @GetMapping("/timer")
    @ResponseBody
    public String doTimer(){
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                logger.info("Timer定时任务启动："+new Date());
            }
        },1000,1000);
        return "timer";
    }
    @GetMapping("/executor")
    public String ScheduledExecutorService(){
        ScheduledExecutorService service = Executors.newScheduledThreadPool(10);
        service.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                logger.info("ScheduledExecutorService定时任务执："+ new Date()+Thread.currentThread().getName());
            }
        },1,1, TimeUnit.SECONDS);
        logger.info("ScheduledExecutorService定时任务启动："+new Date());
        return "ScheduledExecutorService";
    }

}
