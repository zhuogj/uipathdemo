package com.example.demo.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name ="uipathtest")
public class UipathTest {
    @Id
    private long id;
    @Column
    private String name;
    @Column
    private int age;
    @Column
    private String address;
    @Column
    private String birthday;
    @Column
    private String salary;
    @Column
    private String src;
}
