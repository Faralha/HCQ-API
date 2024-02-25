CREATE TABLE 'student' (
	'id' VARCHAR(10) NOT NULL,
    'name' VARCHAR(255) NOT NULL,
	'email' VARCHAR(255) NOT NULL,
	'password' VARCHAR(255) NOT NULL,
	'city' VARCHAR(30),
	'address' VARCHAR(255),
	'phonenumber' VARCHAR(255) NOT NULL,
	UNIQUE KEY 'index1' ('id') USING BTREE,
	PRIMARY KEY ('id')
);

CREATE TABLE admin (
	id VARCHAR(10) NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES ('SJKT-0001', 'Muhammad Zufar Al Hafidz','faralhaonly@gmail.com', 'dawdawdas', 'Tangerang Selatan', 'Jl. Walet', '083021730130');

INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES ('SJKT-0002', 'Muhammad Zufar Al Hafidz','faralhaonly@gmail.com', 'dawdawdas', 'Tangerang Selatan', 'Jl. Walet', '083021730130');

INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES (?, ?, ?, ?, ?, ?, ?);

INSERT INTO admin (id, name, email)
VALUES ('SJKT-0004', 'Anjay', 'anjay@gmail.com');

SELECT id FROM student ORDER BY id ASC LIMIT 1;