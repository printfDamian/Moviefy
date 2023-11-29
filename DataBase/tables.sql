DROP DATABASE IF EXISTS myshows;

CREATE DATABASE myshows CHARACTER SET utf8 COLLATE utf8_general_ci;

USE myshows;

# with need register and login in order to have a whatchlist and other future functionalitys

CREATE TABLE
    users(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name VARCHAR(50) NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP NULL
    ) ENGINE = InnoDB;

# Movies and shows to your Watchlist to keep track of what you want to watch.

CREATE TABLE
    watchlist(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        user_id INT(11) UNSIGNED NOT NULL,
        movie_id INT(11) UNSIGNED NOT NULL,
        state_id INT(11) UNSIGNED NOT NULL,
        my_rating DECIMAL NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP NULL
    ) ENGINE = InnoDB;

CREATE TABLE
    favoriteMovies(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        user_id INT(11) UNSIGNED NOT NULL,
        movie_id INT(11) UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP NULL
    ) ENGINE = InnoDB;

CREATE TABLE
    movieLists(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        user_id INT(11) UNSIGNED NOT NULL,
        movie_id INT(11) UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP NULL
    ) ENGINE = InnoDB;
CREATE TABLE
    watch_status(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
        status_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP NULL
    )ENGINE = InnoDB;