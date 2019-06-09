package com.example.demo.dao;


import com.example.demo.model.UipathTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UipathTestDao extends JpaRepository<UipathTest,Long> {
    @Override
    <S extends UipathTest> S save(S s);
}
