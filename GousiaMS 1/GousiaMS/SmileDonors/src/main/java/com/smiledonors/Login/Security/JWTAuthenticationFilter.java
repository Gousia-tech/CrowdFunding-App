//package com.smiledonors.Login.Security;
//
//import com.smiledonors.Login.Util.JWTUtil;
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.JwtException;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//
//public class JWTAuthenticationFilter extends OncePerRequestFilter {
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain filterChain)
//            throws ServletException, IOException {
//
//        final String authHeader = request.getHeader("Authorization");
//
//        // No token present or doesn't start with Bearer
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        final String token = authHeader.substring(7);// Remove "Bearer "
//
//        try {
//            String email = JWTUtil.extractEmail(token);
//            System.out.println("Authorization Header: " + authHeader);
//            System.out.println("Extracted Token: " + token);
//            System.out.println("Extracted Email: " + email);
//
//            // If email is extracted and no current authentication set
//            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(
//                                        email,
//                                        null,
//                                        List.of(new SimpleGrantedAuthority("ROLE_USER"))
//                        );
//
//                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//
//
//
//        } catch (ExpiredJwtException e) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        } catch (JwtException e) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}
//


package com.smiledonors.Login.Security;

import com.smiledonors.Login.Util.JWTUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        System.out.println("Auth Header" + authHeader);

        log.debug("Checking Authorization header for URI: {}", request.getRequestURI());

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.info("No Bearer token found in Authorization header");
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);

        try {
            String email = JWTUtil.extractEmail(token);
            log.debug("Token extracted: {}", token);
            log.info("Email extracted from token: {}", email);


            // Validate the token and extract claims
            Claims claims = JWTUtil.validateToken(token);  // This method should return claims after validating

            // Extract the payload (subject, which can be the username/email)
            String payload = claims.getSubject();
            System.out.println("Payload " + payload);

            // Set the username in request attributes for further processing if needed
            request.setAttribute("username", payload);

            // Now authenticate the user by creating an Authentication object
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            payload, // The payload (subject) is the username or email
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_USER"))  // Add roles if necessary
                    );

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.info("Authentication set for user: {}", payload);

        } catch (Exception e) {
            log.error("Error during authentication: ", e);
        }

        filterChain.doFilter(request, response);
    }
}
