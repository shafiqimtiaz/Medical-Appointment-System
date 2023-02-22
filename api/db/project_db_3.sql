CREATE SCHEMA IF NOT EXISTS project;
SET search_path TO project;

CREATE TABLE Users
(
  user_id SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE Patients
(
  patient_id INT NOT NULL,
  date_of_birth DATE NOT NULL,
  health_condition VARCHAR(1000) NOT NULL,
  PRIMARY KEY (patient_id),
  FOREIGN KEY (patient_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Medical_staff
(
  medical_staff_id INT NOT NULL,
  license_number BIGINT NOT NULL,
  active BOOL NOT NULL,
  type INT NOT NULL,
  PRIMARY KEY (medical_staff_id),
  FOREIGN KEY (medical_staff_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Manager
(
  manager_id INT NOT NULL,
  PRIMARY KEY (manager_id),
  FOREIGN KEY (manager_id) REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Appointments
(
  appointment_id SERIAL NOT NULL,
  details VARCHAR(1000) NOT NULL,
  appointment_date TIMESTAMP NOT NULL,
  active BOOL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  updated_by VARCHAR(100) NOT NULL,
  medical_staff_id INT NOT NULL,
  patient_id INT NOT NULL,
  PRIMARY KEY (appointment_id),
  FOREIGN KEY (medical_staff_id) REFERENCES Medical_staff(medical_staff_id),  -- corrected column name
  FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);

CREATE TABLE Assessments
(
  assessment_id SERIAL NOT NULL,
  details VARCHAR(1000) NOT NULL,
  active BOOL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  updated_by VARCHAR(100) NOT NULL,
  patient_id INT NOT NULL,
  medical_staff_id INT,
  PRIMARY KEY (assessment_id),
  FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
  FOREIGN KEY (medical_staff_id) REFERENCES Medical_staff(medical_staff_id)
);

CREATE TABLE Answers
(
  answer_id SERIAL NOT NULL,
  answer VARCHAR(1000) NOT NULL,
  assessment_id INT NOT NULL,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (assessment_id) REFERENCES Assessments(assessment_id)
);