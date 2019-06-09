package com.example.demo.service.impl;

import com.example.demo.configuration.ThreadPoolTaskConfig;
import com.example.demo.dao.UipathTestDao;
import com.example.demo.mapper.UipathTestMapper;
import com.example.demo.model.UipathTest;
import com.example.demo.service.ExcelService;
import com.example.demo.service.ImageService;
import com.google.common.base.Splitter;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class ExcelServiceImpl implements ExcelService {
    @Autowired
    private UipathTestDao uipathTestDao;
    @Autowired
    private UipathTestMapper uipathTestMapper;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ThreadPoolTaskConfig threadPoolTaskConfig;

    @Override
    public void excel2Table(String filePath) {
        System.out.println("当前文件："+filePath);
        FileInputStream fis  = null;
        try{
            File excel = new File(filePath);
            if (excel.isFile()&& excel.exists()){
                String[] splits  = excel.getName().split("\\.");
                Workbook wb = null;
                fis = new FileInputStream(excel);
                if ("xls".equals(splits[1])){
                    wb = new HSSFWorkbook(fis);
                    System.out.println("文件后缀为xls返回的处理对象");
                }else if ("xlsx".equals(splits[1])){
                    System.out.println("文件后缀为xlsx返回的处理对象");
                    wb = new XSSFWorkbook(fis);
                }else {
                    System.out.println("文件类型错误！");
                    return;
                }
                //读取sheet0
                Sheet sheet = wb.getSheetAt(0);
                //第一行为字段
                int firstRowIndex  = sheet.getFirstRowNum()+1;
                //注意此处，最后一行可能要+1，需确定
                int lastRowIndex = sheet.getLastRowNum()+1;
                //以下为Excel的字段信息，暂时先用测试数据
                String name = null;
                String age = null;
                String address = null;
                String birthday = null;
                for (int rowIndex = firstRowIndex;rowIndex <lastRowIndex;rowIndex++){
                    System.out.println("rowIndex:"+rowIndex);
                    Row row = sheet.getRow(rowIndex);
                    if (row!=null){
                        int firstCellIndex = row.getFirstCellNum();
                        int lastCellIndex = row.getLastCellNum();
                        for ( int cellIndex = firstCellIndex;cellIndex < lastCellIndex;cellIndex++){
                            Cell cell = row.getCell(cellIndex);
                            if (cell!=null && !"".equals(cell.toString())){
                                switch (cellIndex){
                                    case 0:
                                        name = cell.toString();
                                        break;
                                    case 1:
                                        age = cell.toString();
                                        break;
                                    case 2:
                                        address = cell.toString();
                                        break;
                                    case 3:
                                        birthday = cell.toString();
                                        break;
                                }
                            }
                        }
                        //在数据库操作的时候，在插入数据之前，生成图片。然后起一个线程把文件上传到服务器。
                        String s = age.substring(0,2);
                        UipathTest uipathTest = UipathTest.builder().name(name).
                                age(Integer.valueOf(s)).address(address).birthday(birthday).build();
                        uipathTestDao.save(uipathTest);
                    }
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void insert(String rowContent) {
        System.out.println(rowContent);
        if (rowContent !=null && rowContent!=""){
            List<String> row = Splitter.on(";").splitToList(rowContent);
            UipathTest uipathTest = UipathTest.builder().name(row.get(0)).age(Integer.valueOf(row.get(1)))
                    .address(row.get(2)).birthday(row.get(3)).salary(row.get(4)).build();
//            UipathTest save = uipathTestDao.save(uipathTest);
            uipathTestMapper.insert(uipathTest);
            UipathTest selectByName = uipathTestMapper.selectById(uipathTest.getId());
            Executor executor = threadPoolTaskConfig.executor();
            executor.execute(()->{
                String uuid = UUID.randomUUID().toString().toUpperCase();
                String srcPath = selectByName.getName() + uuid.replace("-","");
                String srcBasePath = "C:\\Users\\zhuoguangjing\\Desktop\\image\\";
                String src = srcBasePath+srcPath+".jpg";
                selectByName.setSrc(src);
//                imageService.operateImage(selectByName,"C:\\Users\\zhuoguangjing\\Desktop\\rawJpg.jpg",src);
                System.out.println("当前线程名称"+Thread.currentThread().getName());
            });
        }
    }
}
