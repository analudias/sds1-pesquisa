package com.devsuperior.dspesquisa.resources;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dspesquisa.dto.RecordDTO;
import com.devsuperior.dspesquisa.dto.RecordInsertDTO;
import com.devsuperior.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordResource {
	
	@Autowired
	private RecordService service;

	@PostMapping
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto) {//para falar que o endpoint vai aceitar no corpo do requisição o objeto informado no Postman, é preciso declará-lo no argumento
		RecordDTO newDTO = service.insert(dto);
		return ResponseEntity.ok().body(newDTO);
	}
	
	@GetMapping
	public ResponseEntity<Page<RecordDTO>> findAll(
			//@@RequestParam, para passar parâmetros de requisição
			@RequestParam(value = "min", defaultValue = "") String min,
			@RequestParam(value = "max", defaultValue = "") String max,
			@RequestParam(value = "page", defaultValue = "0") Integer page, 
			@RequestParam(value = "linesPerPage", defaultValue = "0") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "moment") String orderBy,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction) {		
		
		Instant minDate = ("".equals(min)) ? null : Instant.parse(min); //verfica se é nulo e converte a data de String para Instant
		Instant maxDate = ("".equals(max)) ? null : Instant.parse(max); 
		
		//garantindo que vai trazer todos os registros na busca feita
		if(linesPerPage == 0) {
			linesPerPage = Integer.MAX_VALUE;
		}
		//Direction - conversão para o tipo enumerado do Spring
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		
		Page<RecordDTO> list = service.findByMoments(minDate, maxDate, pageRequest);
		return ResponseEntity.ok().body(list);
		
	}
	
}
