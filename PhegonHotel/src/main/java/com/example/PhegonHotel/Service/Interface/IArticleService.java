package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.ArticleDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IArticleService {
    List<ArticleDTO> getAllArticles();

    ArticleDTO getArticleById(Long id);

    ArticleDTO createArticle(String title, String description, MultipartFile image);

    ArticleDTO updateArticle(Long id, String title, String description, MultipartFile image);

    void deleteArticle(Long id);
}
