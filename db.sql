CREATE DATABASE hcq;
USE hcq;
-- ADMINISTRATIVE TABLES
CREATE TABLE token (
	token VARCHAR(64) NOT NULL,
	email VARCHAR(255) NOT NULL,
	PRIMARY KEY (token)
);
CREATE TABLE student (
	id VARCHAR(10) NOT NULL,
  name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	city VARCHAR(30),
	address VARCHAR(255),
	phone_number VARCHAR(20) NOT NULL,
	UNIQUE KEY index1 (id) USING BTREE,
	PRIMARY KEY (id)
);
CREATE TABLE admin (
	id VARCHAR(10) NOT NULL,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	city VARCHAR(30),
	address VARCHAR(255),
	phone_number VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE mentor (
	id VARCHAR(10) NOT NULL,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	city VARCHAR(30),
	address VARCHAR(255),
	is_verified BOOLEAN NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

-- CLASS
CREATE TABLE jenis (
	jenis VARCHAR(255) NOT NULL,
	keterangan VARCHAR(255),
	created_by VARCHAR(255) NOT NULL,
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
	FOREIGN KEY (jenis) REFERENCES jenis(jenis),
	FOREIGN KEY (mentor) REFERENCES mentor(id)
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

CREATE INDEX idx_student_id ON student(id);
CREATE INDEX idx_student_class_id_class ON student_class(id_class);
CREATE INDEX idx_student_class_id_student ON student_class(id_student);
CREATE INDEX idx_grade_id_student ON grade(id_student);
CREATE INDEX idx_grade_id_class ON grade(id_class);
CREATE INDEX idx_attendance_id_class ON attendance(id_class);
CREATE INDEX idx_attendance_id_student ON attendance(id_student);
CREATE INDEX idx_grade_class_id_grade ON grade_class(id_grade);
CREATE INDEX idx_grade_class_id_student ON grade_class(id_student);