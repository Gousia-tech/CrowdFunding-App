package com.smiledonors;

import com.smiledonors.configuration.EmailConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(EmailConfig.class)
public class DonationServiceModuleApplication {

    public static void main(String[] args) {
        SpringApplication.run(DonationServiceModuleApplication.class, args);
    }

}