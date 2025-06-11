package com.smiledonors.Login.Config;

import com.smiledonors.Login.Security.JWTAuthenticationFilter;

import org.modelmapper.ModelMapper;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public ModelMapper modelMapper() {

        return new ModelMapper();

    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {

        return new JWTAuthenticationFilter();

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();

    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session ->

                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/h2-console/**").permitAll()

                        .requestMatchers("/api/auth/donor/**", "/api/auth/org/**" ).permitAll()  // 👈 Make sure your POST/PUT endpoints are covered

                        .anyRequest().authenticated()

                )

                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));// 👈 Needed for H2 console

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class); // 👈 Adding JWT filter

        return http.build();

    }


}
