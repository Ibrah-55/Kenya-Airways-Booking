export const SCHEMA = `
DROP TABLE IF EXISTS TICKET;
DROP TABLE IF EXISTS FLIGHT_DATE;
DROP TABLE IF EXISTS FLIGHT_DAY;
DROP TABLE IF EXISTS FLIGHT_PATH;
DROP TABLE IF EXISTS AIRPORT;
DROP TABLE IF EXISTS CUSTOMERS;

CREATE TABLE CUSTOMERS (
    CUSTOMER_ID VARCHAR(20) PRIMARY KEY,
    PASSWORD VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(30) UNIQUE NOT NULL,
    CNAME VARCHAR(30) NOT NULL,
    GENDER ENUM ('M','F','O'),
    DOB DATE,
    ROLE ENUM ('N','R','W'),
    PROFESSION ENUM ('STUDENT', 'ARMYPERSONNEL', 'SENIORCITIZEN', 'OTHER'),
    COUNTRY_CODE VARCHAR(4) NOT NULL,
    PHONE_NO VARCHAR(11) NOT NULL,
    ADDRESS VARCHAR(60)
);

CREATE TABLE AIRPORT (
    AIRPORT_ID INT PRIMARY KEY AUTO_INCREMENT,
    AIRPORT_NAME VARCHAR(80) NOT NULL,
    CITY VARCHAR(20) NOT NULL,
    COUNTRY VARCHAR(20) NOT NULL,
    CONSTRAINT UCC UNIQUE (CITY, COUNTRY)
);
ALTER TABLE AIRPORT AUTO_INCREMENT 901;

CREATE TABLE FLIGHT_PATH (
    FLIGHT_ID CHAR(5) PRIMARY KEY,
    SOURCE_ID INT NOT NULL,
    DESTINATION_ID INT NOT NULL,
    DEPARTURE_TIME TIME NOT NULL,
    DURATION TIME NOT NULL,
    NUM_ROWS INT NOT NULL,
    NUM_COLS INT NOT NULL,
    BASE_FARE INT NOT NULL,
    LEASE_EXPIRY DATE NOT NULL,
    FOREIGN KEY (SOURCE_ID) REFERENCES AIRPORT(AIRPORT_ID) ON DELETE CASCADE,
    FOREIGN KEY (DESTINATION_ID) REFERENCES AIRPORT(AIRPORT_ID) ON DELETE CASCADE
);

CREATE TABLE FLIGHT_DAY (
    FLIGHT_ID CHAR(5) NOT NULL,
    DAY_OF_WEEK ENUM ('1','2','3','4','5','6','7') NOT NULL,
    PRIMARY KEY (FLIGHT_ID, DAY_OF_WEEK),
    FOREIGN KEY (FLIGHT_ID) REFERENCES FLIGHT_PATH(FLIGHT_ID) ON DELETE CASCADE
);

CREATE TABLE FLIGHT_DATE (
    FLIGHT_ID CHAR(5) NOT NULL,
    DEPARTURE_DATE DATE NOT NULL,
    DELAYED_BY TIME NOT NULL,
    FLIGHT_STATUS ENUM ('AVAILABLE', 'CANCELLED'),
    PRIMARY KEY (FLIGHT_ID, DEPARTURE_DATE),
    FOREIGN KEY (FLIGHT_ID) REFERENCES FLIGHT_PATH(FLIGHT_ID)
);

CREATE TABLE TICKET (
    TICKET_ID INT PRIMARY KEY AUTO_INCREMENT,
    FLIGHT_ID CHAR(5) NOT NULL,
    CUSTOMER_ID VARCHAR(20) NOT NULL,
    PASSENGER_NAME VARCHAR(30) NOT NULL,
    TIME_OF_BOOKING DATETIME NOT NULL,
    DATE_OF_DEPARTURE DATE NOT NULL,
    FARE INT NOT NULL,
    SEAT_NUMBER INT NOT NULL,
    STATUS ENUM ('BOOKED', 'CANCELLED', 'UNAVAILABLE') NOT NULL,
    FOREIGN KEY (FLIGHT_ID, DATE_OF_DEPARTURE) REFERENCES FLIGHT_DATE(FLIGHT_ID, DEPARTURE_DATE) ON DELETE CASCADE,
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMERS(CUSTOMER_ID),
    CONSTRAINT UNTKT UNIQUE (FLIGHT_ID, DATE_OF_DEPARTURE, SEAT_NUMBER)
);
ALTER TABLE TICKET AUTO_INCREMENT 10000001;
`
