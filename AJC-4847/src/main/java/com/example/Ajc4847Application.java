package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ AppProperties.class})
public class Ajc4847Application {

	public static void main(String[] args) {
		SpringApplication.run(Ajc4847Application.class, args);
	}
}
