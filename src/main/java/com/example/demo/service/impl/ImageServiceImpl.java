package com.example.demo.service.impl;

import com.example.demo.model.UipathTest;
import com.example.demo.service.ImageService;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

@Service
public class ImageServiceImpl implements ImageService {
    @Override
    public  void operateImage(UipathTest uipathTest,byte[] bytes,String outPath) {
        ImageIcon imageIcon = new ImageIcon(bytes);
        Image currentImage = imageIcon.getImage();
        int width=currentImage.getWidth(null)==-1?200:currentImage.getWidth(null);
        int height= currentImage.getHeight(null)==-1?200:currentImage.getHeight(null);
        System.out.println(width);
        System.out.println(height);
        BufferedImage bufferedImage = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.drawImage(currentImage,0,0,width,height,null);
        graphics2D.setColor(Color.DARK_GRAY);
        graphics2D.setFont(new Font("微软雅黑",Font.PLAIN,16));
//        String substring = uipathTest.getBirthday().substring(0, 4);
//        graphics2D.drawString(substring+"年",330,316);
//        graphics2D.drawString(substring+"年",592,316);
        graphics2D.drawString(uipathTest.getName(),330,355);
        graphics2D.drawString(uipathTest.getName(),880,355);
        graphics2D.drawString(uipathTest.getSalary(),636,535);
        graphics2D.drawString(uipathTest.getSalary(),636,666);
        graphics2D.dispose();
        try {
            ImageIO.write(bufferedImage,"JPG",new File(outPath));
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
