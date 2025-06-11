////package com.smiledonors.Login.Util;
////
////import io.jsonwebtoken.Claims;
////import io.jsonwebtoken.Jwts;
////import io.jsonwebtoken.SignatureAlgorithm;
////import io.jsonwebtoken.security.Keys;
////
////import javax.crypto.SecretKey;
////import java.nio.charset.StandardCharsets;
////import java.security.Key;
////import java.util.Date;
////import java.util.HashMap;
////import java.util.Map;
////
////import static java.security.KeyRep.Type.SECRET;
////
////public class JWTUtil {
////
////    private static final String SECRET = "smileDonorsSuperJWTKey2025@123";// 🔐 Replace with secure key
////    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10;// 10 hours
////
//////    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
////    private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
////
////    public static Map<String, String> generateToken(String email) {
////        String token = Jwts.builder()
////                .setSubject(email)
////                .setIssuedAt(new Date())
////                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
////                .signWith(key, SignatureAlgorithm.HS256)
////                .compact();
////
////        Map<String, String> response = new HashMap<>();
////        response.put("token", token);
////        return response;
////    }
////
////
//////    private static final String SECRET = "secret_key_which_should_be_very_secret";
//////
//////    public static String generateToken(String email) {
//////        return Jwts.builder()
//////                .setSubject(email)
//////                .setIssuedAt(new Date())
//////                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 1 day expiry
//////                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes(StandardCharsets.UTF_8))
//////                .compact();
//////    }
////
////    public static String extractEmail(String token) {
////        Claims claims = Jwts.parserBuilder()
////                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
////                .build()
////                .parseClaimsJws(token)
////                .getBody();
////        return claims.getSubject();
////    }
////
////}
//
//

package com.smiledonors.Login.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

//public class JWTUtil {
//
//    private static final String SECRET = "123sadfasdfasdfasdfasdfasdfasdfasdfasdfas124123235";
//
//    private JWTUtil() {
//        // Private constructor to prevent instantiation
//    }
//
//    // Method to generate token
////    public static String generateToken(String email) {
////        return Jwts.builder()
////                .setSubject(email)
////                .setIssuedAt(new Date())
////                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 2)) // 10 hours expiry
////                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes(StandardCharsets.UTF_8))
////                .compact();
////    }
//
//    private static String createToken(Map<String, Object> claims, String subject) {
//        long expirationMs = 1000 * 60 * 60 * 2; // 10 hours
//        return Jwts.builder()
//                .setClaims(claims)
//                .setSubject(subject)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
//                .signWith(SignatureAlgorithm.HS256, SECRET)
//                .compact();
//    }
//
//    // Extract email (subject)
//    public static String extractEmail(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // Generic method to extract claims
//    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    // Extract all claims
//    private static Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    // Check if token is expired
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    // Extract expiration
//    private Date extractExpiration(String token) {
//        return extractClaim(token, Claims::getExpiration);
//    }
//
//    // Validate token
////    public boolean validateToken(String token, UserDetails userDetails) {
////        final String email = extractEmail(token);
////        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
////    }
//
////    // Optional: Generate token (for login)
//public static String generateToken(String email) {
//    Map<String, Object> claims = new HashMap<>();
//    // Directly pass the email as the subject
//    return createToken(claims, email);  // Use email as the subject
//}
//
//
//    //    // Method to validate and extract email from token
//    public static Claims validateToken(String token) {
//        return Jwts.parser()
//                .setSigningKey(SECRET.getBytes(StandardCharsets.UTF_8))
//                .parseClaimsJws(token)
//                .getBody();
//    }
////
////    public static String extractEmail(String token) {
////        return validateToken(token).getSubject();
////    }
//
//}


public class JWTUtil {

    private static final String SECRET = "123sadfasdfasdfasdfasdfasdfasdfasdfasdfas124123235";

    private JWTUtil() {
        // Private constructor to prevent instantiation
    }

    private static String createToken(Map<String, Object> claims, String subject) {
        long expirationMs = 1000 * 60 * 60 * 2; // 2 hours
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // Extract email (subject)
    public static String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Generic method to extract claims
    public static <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims
    private static Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET) // Use SECRET directly here
                .parseClaimsJws(token)
                .getBody();
    }

    // Method to validate token
    public static Claims validateToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET) // Use SECRET directly here
                .parseClaimsJws(token)
                .getBody();
    }

    public static String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);  // Use email as the subject
    }
}





