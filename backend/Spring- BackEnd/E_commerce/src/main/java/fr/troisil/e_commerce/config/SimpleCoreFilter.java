package fr.troisil.e_commerce.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCoreFilter implements Filter {

   /* @Value("${app.client.url}")
    private String clientAppUrl = "";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        Map<String,String> map = new HashMap<>();
        String originHeader = request.getHeader("origin");
        // Ajout des en-têtes CORS
        response.setHeader("Access-Control-Allow-Origin", "*");  // Permet toutes les origines, à personnaliser pour plus de sécurité
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");  // Cache la réponse des requêtes OPTIONS pendant 1 heure
        response.setHeader("Access-Control-Allow-Headers", "Authorization, content-type, xsrf-token");
        response.addHeader("Access-Control-Expose-Headers", "Authorization,xsrf-token");

        // Si la méthode est OPTIONS, on interrompt la chaîne ici
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(servletRequest, servletResponse);  // Continue le filtrage pour les autres requêtes
        }
    }*/

    @Value("${app.client.url}")
    private String clientAppUrl = "";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        String originHeader = request.getHeader("origin");

        // Autoriser uniquement les requêtes provenant de clientAppUrl
        if (clientAppUrl.equals(originHeader)) {
            response.setHeader("Access-Control-Allow-Origin", clientAppUrl);
        }

        // Ajout des en-têtes CORS
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, content-type, xsrf-token");
        response.addHeader("Access-Control-Expose-Headers", "Authorization, xsrf-token");

        // Si la méthode est OPTIONS, on interrompt la chaîne ici
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            filterChain.doFilter(servletRequest, servletResponse);  // Continue le filtrage pour les autres requêtes
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Méthode init pour initialiser le filtre, si nécessaire
    }

    @Override
    public void destroy() {
        // Méthode destroy pour nettoyer les ressources, si nécessaire
    }
}
