-- ADMINISTRATIVE TABLES
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
CREATE TABLE mentor (
	id VARCHAR(10) NOT NULL,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phonenumber VARCHAR(255) NOT NULL,
	shortRegion VARCHAR(5) NOT NULL,
	isVerified BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);
CREATE TABLE region (
	id VARCHAR(5) NOT NULL,
	region VARCHAR(50) NOT NULL,
	createdBy VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);


-- CLASS
CREATE TABLE JENIS (
	jenis VARCHAR(255) NOT NULL,
	keterangan VARCHAR(255),
	createdBy VARCHAR(255) NOT NULL,
	PRIMARY KEY (jenis)
);
CREATE TABLE semester (
	semester INT DEFAULT 1 PRIMARY KEY
);
CREATE TABLE class (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
	mentor VARCHAR(255) NOT NULL,
	semester INT NOT NULL,
	jenis VARCHAR(255) NOT NULL,
	id_region VARCHAR(5) NOT NULL,
	FOREIGN KEY (jenis) REFERENCES jenis(jenis),
	FOREIGN KEY (mentor) REFERENCES mentor(id),
	FOREIGN KEY (id_region) REFERENCES region(id)
);
CREATE TABLE student_class (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_class VARCHAR(255) NOT NULL,
	id_student VARCHAR(10) NOT NULL,
	FOREIGN KEY (id_class) REFERENCES class(id),
	FOREIGN KEY (id_student) REFERENCES student(id)
);

-- CLASS PROPERTIES
CREATE TABLE attendance (
	id_class VARCHAR(255) NOT NULL,
	id_student VARCHAR(10) NOT NULL,
	attend BOOLEAN DEFAULT 0,
	attend_reason VARCHAR(50) DEFAULT 'Abstain/Tanpa Keterangan',
	attend_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_class) REFERENCES class(id),
	FOREIGN KEY (id_student) REFERENCES student(id)
);
CREATE TABLE grade (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_class VARCHAR(255) NOT NULL,
	id_student VARCHAR(10) NOT NULL,
	grade INT DEFAULT 0,
	FOREIGN KEY (id_class) REFERENCES class(id),
	FOREIGN KEY (id_student) REFERENCES student(id)
);
CREATE TABLE grade_class (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_grade INT NOT NULL,
	id_student VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_grade) REFERENCES grade(id),
	FOREIGN KEY (id_student) REFERENCES student(id)
);