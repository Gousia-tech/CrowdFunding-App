package com.smiledonors.Login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration.class,
		org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration.class
})
public class SmileDonorApplication {

	public static void main(String[] args) {

		SpringApplication.run(SmileDonorApplication.class, args);

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
