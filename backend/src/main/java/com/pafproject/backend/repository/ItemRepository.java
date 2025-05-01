package com.pafproject.backend.repository;

import com.pafproject.backend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemRepository extends JpaRepository<Item, Long> {
}
