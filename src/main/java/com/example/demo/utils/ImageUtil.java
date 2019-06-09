package com.example.demo.utils;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;

public class ImageUtil{
    public static void imageOperate(String filePath,String textContent,String outPath){
        ImageIcon imageIcon = new ImageIcon(filePath);
        Image currentImage = imageIcon.getImage();
        int width=currentImage.getWidth(null)==-1?200:currentImage.getWidth(null);
        int height= currentImage.getHeight(null)==-1?200:currentImage.getHeight(null);
        System.out.println(width);
        System.out.println(height);
        BufferedImage bufferedImage = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = bufferedImage.createGraphics();
        graphics2D.drawImage(currentImage,0,0,width,height,null);
        graphics2D.setColor(Color.black);
        graphics2D.setFont(new Font("宋体",Font.BOLD,20));
        graphics2D.drawString(textContent,430,315);
        graphics2D.dispose();
        try {
            ImageIO.write(bufferedImage,"JPG",new File(outPath));
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
