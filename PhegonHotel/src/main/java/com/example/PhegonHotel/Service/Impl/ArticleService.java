package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.ArticleDTO;
import com.example.PhegonHotel.Entity.Article;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Repository.ArticleRepository;
import com.example.PhegonHotel.Service.AwsS3Service;
import com.example.PhegonHotel.Service.Interface.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleService implements IArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll()
                .stream()
                .map(article -> new ArticleDTO(
                        article.getId(),
                        article.getTitle(),
                        article.getDescription(),
                        article.getImageUrl(),
                        article.getCreatedAt().toString()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public ArticleDTO getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new OurException("Article not found with ID: " + id));
        return new ArticleDTO(
                article.getId(),
                article.getTitle(),
                article.getDescription(),
                article.getImageUrl(),
                article.getCreatedAt().toString()
        );
    }

    @Override
    public ArticleDTO createArticle(String title, String description, MultipartFile image) {
        String imageUrl = awsS3Service.saveImageToS3(image);

        Article article = new Article();
        article.setTitle(title);
        article.setDescription(description);
        article.setImageUrl(imageUrl);
        article.setCreatedAt(LocalDate.now());

        Article savedArticle = articleRepository.save(article);

        return new ArticleDTO(
                savedArticle.getId(),
                savedArticle.getTitle(),
                savedArticle.getDescription(),
                savedArticle.getImageUrl(),
                savedArticle.getCreatedAt().toString()
        );
    }

    @Override
    public ArticleDTO updateArticle(Long id, String title, String description, MultipartFile image) {
        return articleRepository.findById(id).map(article -> {
            if (title != null) article.setTitle(title);
            if (description != null) article.setDescription(description);
            if (image != null) {
                String imageUrl = awsS3Service.saveImageToS3(image);
                article.setImageUrl(imageUrl);
            }
            Article updatedArticle = articleRepository.save(article);
            return new ArticleDTO(
                    updatedArticle.getId(),
                    updatedArticle.getTitle(),
                    updatedArticle.getDescription(),
                    updatedArticle.getImageUrl(),
                    updatedArticle.getCreatedAt().toString()
            );
        }).orElseThrow(() -> new OurException("Article not found with ID: " + id));
    }

    @Override
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
}
