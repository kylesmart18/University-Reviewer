heroku pg:psql -a final-exam-kysm5645

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(50) PRIMARY KEY,       
  university_name VARCHAR(50),   
  review VARCHAR(50) NOT NULL,
  review_date DATE NOT NULL        
);