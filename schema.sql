CREATE DATABASE IF NOT EXISTS sdcReviews;

USE sdcReviews;

CREATE TABLE IF NOT EXISTS reviews (
  reviewId SERIAL NOT NULL PRIMARY KEY,
  productId int NOT NULL,
  rating TINYINT NOT NULL,
  date varchar(25) NOT NULL,
  summary varchar (50) NOT NULL,
  body varchar (1002) NOT NULL,
  recommended bit not null,
  reported INT NOT NULL DEFAULT 0,
  reviewerName varchar(40) NOT NULL,
  reviewerEmail varchar(320) NOT NULL,
  response varchar(500) DEFAULT null,
  helpfulness int DEFAULT 0,
);

CREATE TABLE IF NOT EXISTS photos (
  photoId SERIAL int NOT NULL PRIMARY KEY,
  reviewId int NOT NULL,
  url varchar(255),
  FOREIGN KEY (reviewerId) references reviewers (reviewerId)
);

CREATE TABLE characteristics (
  characteristicId SERIAL INT NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  reviewId INT NOT NULL,
  characteristic ENUM('fit', 'width', 'size', 'length', 'comfort') NOT NULL,
  rating TINYINT NOT NULL,
  FOREIGN KEY (reviewId) references reviews (reviewId)
);
