package com.devsuperior.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	//(coalesce(:min, null) garante que o NULL será aceito no POSTGRE
	@Query("SELECT obj FROM Record obj WHERE "
			+ "(coalesce(:min, null) is NULL OR obj.moment >= :min) AND "
			+ "(coalesce(:max, null) is NULL OR obj.moment <= :max)")
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);

}
