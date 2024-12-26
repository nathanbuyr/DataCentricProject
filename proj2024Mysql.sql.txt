-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: collegeDB
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `proj2024Mysql`;
CREATE DATABASE `proj2024Mysql`;
USE `proj2024Mysql`;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `mid` varchar(3) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `credits` ENUM('5','10','15'),
  `lecturer` VARCHAR(4),
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('ALG','Algebra','5','L001'),('CRW','Creative Writing','10','L002'),('DB','Database Technology','5','L003'),('JAV','Java Programming','10','L003'),('LNG','Long Division','5','L001'),('MFL','Mechanics of Fluids','5','L004'),('MOB','Mobile Applications Development','5','L005'),('MSO','Mechanics of Solids','5','L006'),('POT','Poetry','5','L006'),('SHA','Shakespeare','5','L006'),('TTB','Times Tables','10','L007');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `sid` varchar(4) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `age` integer DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('G001','Sean Smith',32),('G002','Alison Conners',23),('G003','Thomas Murphy',19),('G004','Anne Greene',23),('G005','Tom Riddle',27),('G006','Brian Collins',38),('G007','Fiona O\'Hehir',30),('G008','George Johnson',24),('G009','Albert Newton',31),('G010','Marie Yeats',21),('G011','Jonathon Small',22),('G012','Barbara Harris',23),('G013','Oliver Flanagan',19),('G014','Neil Blaney',34),('G015','Nigel Delaney',19),('G016','Johnny Connors',29),('G017','Bill Turpin',18),('G018','Amanda Knox',23),('G019','James Joyce',39),('G020','Alice L\'Estrange',32);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `sid` varchar(4) NOT NULL,
  `mid` varchar(3) NOT NULL,
  `grade` integer DEFAULT NULL,
  PRIMARY KEY (`sid`,`mid`),
  KEY `mid` (`mid`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`),
  CONSTRAINT `grade_ibfk_2` FOREIGN KEY (`mid`) REFERENCES `module` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES ('G006','ALG',28),('G009','ALG',49),('G018','ALG',77),('G004','CRW',56),('G007','CRW',55),('G008','CRW',82),('G014','CRW',51),('G001','JAV',40),('G015','JAV',50),('G003','LNG',72),('G006','LNG',92),('G016','LNG',84),('G018','LNG',32),('G002','MFL',72),('G003','MFL',67),('G009','MFL',78),('G016','MFL',35),('G001','MOB',73),('G015','MOB',82),('G019','MOB',32),('G002','MSO',79),('G016','MSO',52),('G004','POT',45),('G008','POT',72),('G014','POT',86),('G004','SHA',71),('G017','SHA',68),('G005','TTB',87),('G006','TTB',91),('G018','TTB',65);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-12 12:49:40
