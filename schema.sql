CREATE DATABASE IF NOT EXISTS sdcReviews;

USE sdcReviews;

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INT NOT NULL UNIQUE,
  product_id int NOT NULL,
  rating SMALLINT NOT NULL,
  date varchar(25) NOT NULL,
  summary varchar (50) NOT NULL,
  body varchar (1002) NOT NULL,
  recommend varchar(5) not null,
  reported varchar(5) NOT NULL,
  reviewer_name varchar(40) NOT NULL,
  reviewer_email varchar(320) NOT NULL,
  response varchar(500) DEFAULT null,
  helpfulness int DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL NOT NULL PRIMARY KEY,
  photo_id int NOT NULL,
  review_id int NOT NULL,
  url varchar(255),
  FOREIGN KEY (review_Id) REFERENCES reviews(review_id)
);

\copy photos (photo_id,review_id,url) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredPhotos.csv' Header DELIMITER ',' CSV;

CREATE TYPE character AS ENUM('Fit', 'Width', 'Size', 'Length', 'Comfort', 'Quality');

CREATE TABLE characteristics (
  id SERIAL NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL UNIQUE,
  product_id INT NOT NULL,
  characteristic character NOT NULL
);

\copy characteristics (characteristic_id,product_id,characteristic) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredCharacteristics.csv' DELIMITER ',' CSV;

CREATE TABLE characteristics_reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  characteristic_id INT NOT NULL UNIQUE,
  review_id INT NOT NULL,
  rating SMALLINT NOT NULL
)

\copy characteristics_reviews (id,characteristic_id,review_id,rating) FROM 'Users/michaelsmith/Documents/code/HR/SDC/csv-raw-data/filteredCharacteristicReviews.csv' DELIMITER ',' CSV;