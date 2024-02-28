INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES ('SJKT-0001', 'Muhammad Zufar Al Hafidz','faralhaonly@gmail.com', 'dawdawdas', 'Tangerang Selatan', 'Jl. Walet', '083021730130');

INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES ('SJKT-0002', 'Muhammad Zufar Al Hafidz','faralhaonly@gmail.com', 'dawdawdas', 'Tangerang Selatan', 'Jl. Walet', '083021730130');

INSERT INTO 'student' ('id','name','email', 'password', 'city', 'address', 'phonenumber')
VALUES (?, ?, ?, ?, ?, ?, ?);

INSERT INTO admin (id, name, email)
VALUES ('SJKT-0002', 'Anjay', 'anjay@gmail.com');

SELECT id FROM student ORDER BY id ASC LIMIT 1;