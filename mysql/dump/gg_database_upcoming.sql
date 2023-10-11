CREATE DATABASE  IF NOT EXISTS `gg_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gg_database`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: gg_database
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `upcoming`
--

DROP TABLE IF EXISTS `upcoming`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upcoming` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstReleaseDate` date DEFAULT NULL,
  `tier` varchar(255) DEFAULT NULL,
  `topCriticScore` varchar(255) DEFAULT NULL,
  `image` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upcoming`
--

LOCK TABLES `upcoming` WRITE;
/*!40000 ALTER TABLE `upcoming` DISABLE KEYS */;
INSERT INTO `upcoming` VALUES (15005,'Assassin\'s Creed Mirage','2023-10-05','','N/A','https://assets-prd.ignimgs.com/2022/09/10/assassins-creed-mirage-button-fin-1662844632503.jpg'),(15123,'Super Mario Bros. Wonder','2023-10-20','','N/A','https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_SuperMarioBrosWonder.jpg'),(15199,'Sonic Superstars','2023-10-17','','N/A','https://sonicsuperstars.com/images/herobg_1920.jpg'),(15205,'Detective Pikachu Returns','2023-10-06','','N/A','https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000068693/c4b5a71815eb1817733a82d6228a624751f8f4a3fbc6c3a4f69f81be1e114454'),(15394,'Hot Wheels Unleashed 2: Turbocharged','2023-10-19','','N/A','https://cdn.cloudflare.steamstatic.com/steam/apps/2051120/header.jpg?t=1694793100'),(15504,'Forza Motorsport','2023-10-10','','N/A','https://cdn.akamai.steamstatic.com/steam/apps/2440510/capsule_616x353.jpg?t=1696010427'),(15556,'Disgaea 7: Vows of the Virtueless','2023-10-03','Mighty','85','https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000062710/7ff9ff85554b445f5cfc1e33d56155494d905df4a04577032f0c65e91e589fd7'),(15561,'Silent Hope','2023-10-03','Strong','75','https://cdn.cloudflare.steamstatic.com/steam/apps/1960110/capsule_616x353.jpg?t=1695671554');
/*!40000 ALTER TABLE `upcoming` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-10 21:53:03
