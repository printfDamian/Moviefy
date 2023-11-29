USE myshows;

ALTER TABLE watchlist 
ADD CONSTRAINT watchlist FOREIGN KEY (`user_id`)
REFERENCES users(id);

ALTER TABLE favoriteMovies
ADD CONSTRAINT favoriteMovies FOREIGN KEY (`user_id`)
REFERENCES users(id);

ALTER TABLE movieLists
ADD CONSTRAINT movieLists FOREIGN KEY (`user_id`)
REFERENCES users(id);