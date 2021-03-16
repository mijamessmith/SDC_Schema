CREATE DATABASE IF NOT EXISTS sdcReviews;

USE sdcReviews;

CREATE TABLE IF NOT EXISTS reviewers (
  reviewerId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  numOfReported int DEFAULT 0,
  numOfReviews int DEFAULT 0
);


CREATE TABLE IF NOT EXISTS reviewMetadata (
  productId INT PRIMARY KEY NOT NULL,
  recommendTrueCount INT DEFAULT 0,
  recommendFalseCount INT DEFAULT 0,
  ratingOf1 INT DEFAULT 0,
  ratingOf2 INT DEFAULT 0,
  ratingOf3 INT DEFAULT 0,
  ratingOf4 INT DEFAULT 0,
  ratingOf5 INT DEFAULT 0,
  isReported BOOLEAN DEFAULT false,
  helpfulnessTotal INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  reviewerId int NOT NULL,
  productId int NOT NULL,
  body varchar (10000) NOT NULL,
  summary varchar (90) NOT NULL,
  date DATETIME NOT NULL,
  helpfulness int DEFAULT 0,
  rating SMALL INT NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  photos BOOLEAN NOT NULL,
  FOREIGN KEY (productId) references reviewMetadata (productId),
  FOREIGN KEY (reviewerId) references reviewers (reviewerId)
);

CREATE TABLE IF NOT EXISTS photos (
  photoId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  reviewId int NOT NULL,
  reviewerId int NOT NULL,
  url varchar(255),
  FOREIGN KEY(reviewId) references reviews(reviewId),
  FOREIGN KEY (reviewerId) references reviewers (reviewerId)
);

CREATE TABLE characteristicRatings (
  characteristicId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  reviewId INT NOT NULL,
  characteristic varchar(16) NOT NULL,
  rating SMALL INT NOT NULL,
  FOREIGN KEY (productId) references reviewMetadata (productId),
  FOREIGN KEY (reviewId) references reviews (reviewId)
);

