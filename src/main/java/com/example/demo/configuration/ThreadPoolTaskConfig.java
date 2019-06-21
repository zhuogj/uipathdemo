package com.example.demo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync
public class ThreadPoolTaskConfig {
    @Bean(name = "executor")
    public Executor executor(){
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        int coreNum = Runtime.getRuntime().availableProcessors();
        //核心线程数为CPU数*5
        executor.setCorePoolSize(coreNum*5);
        executor.setMaxPoolSize(coreNum*10);
        //设置非核心线程的存活时间
        executor.setKeepAliveSeconds(300);
        //设置队列长度
        executor.setQueueCapacity(200);
        //设置线程前缀
        executor.setThreadNamePrefix("thread-uipath");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        return executor;

    }
}
