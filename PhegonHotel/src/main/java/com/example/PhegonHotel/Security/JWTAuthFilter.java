package com.example.PhegonHotel.Security;

import com.example.PhegonHotel.Service.CustomUserDetailsService;
import com.example.PhegonHotel.Utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.CachingUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String jwtToken;
//        final String username;
//
//        // Nếu không có header hoặc header không bắt đầu bằng "Bearer", bỏ qua lọc
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        jwtToken = authHeader.substring(7); // Loại bỏ "Bearer " để lấy token
//        username = jwtUtils.extractUsername(jwtToken);
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            // Lấy thông tin User từ database
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//
//            // Kiểm tra token hợp lệ
//            if (jwtUtils.isValidToken(jwtToken, userDetails)) {
//                UsernamePasswordAuthenticationToken token =
//                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//                // Thiết lập Authentication cho SecurityContext
//                SecurityContextHolder.getContext().setAuthentication(token);
//            }
//        }
//
//        // Tiếp tục chain lọc
//        filterChain.doFilter(request, response);
//    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;

        // Các đường dẫn không cần kiểm tra JWT
        String[] whitelist = {
                "/auth/forgot-password",
                "/auth/verify-otp",
                "/auth/reset-password",
                "/auth/send-email"
        };

        // Lấy đường dẫn yêu cầu
        String requestPath = request.getServletPath();

        // Nếu yêu cầu nằm trong danh sách whitelist, bỏ qua lọc
        if (Arrays.stream(whitelist).anyMatch(requestPath::equals)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Nếu không có header hoặc header không bắt đầu bằng "Bearer ", bỏ qua lọc
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7); // Loại bỏ "Bearer " để lấy token
        username = jwtUtils.extractUsername(jwtToken);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Lấy thông tin User từ database
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            // Kiểm tra token hợp lệ
            if (jwtUtils.isValidToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken token =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Thiết lập Authentication cho SecurityContext
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }

        // Tiếp tục chain lọc
        filterChain.doFilter(request, response);
    }


//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String jwtToken;
//        final String username;
//
//        if (authHeader == null || authHeader.isBlank()) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        jwtToken = authHeader.substring(7);//
//        username = jwtUtils.extractUsername(jwtToken);
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            /// check username ton tai o DB -
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//            // ì not exist, create new user
//        /// neu google token, validate vơi google
//            //...............
//
//            // neu tu gen
//            if (jwtUtils.isValidToken(jwtToken, userDetails)) {
//                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                securityContext.setAuthentication(token);
//                SecurityContextHolder.setContext(securityContext);
//            }
//        }
//        filterChain.doFilter(request, response);
//    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.startsWith("/swagger-ui/") || path.startsWith("/v3/api-docs") || path.equals("/swagger-ui.html");
    }



}
