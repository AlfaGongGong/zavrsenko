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
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `salePrice` decimal(10,0) DEFAULT NULL,
  `normalPrice` decimal(10,0) DEFAULT NULL,
  `releaseDate` varchar(255) DEFAULT NULL,
  `score` decimal(10,0) DEFAULT NULL,
  `image` varchar(999) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,'Heavy Burden',5,70,'0000-00-00',0,'https://cdn.cloudflare.steamstatic.com/steam/apps/2070000/capsule_sm_120.jpg?t=1695297377'),(2,'The Talos Principle',3,30,'0000-00-00',85,'https://cdn.cloudflare.steamstatic.com/steam/apps/257510/capsule_sm_120.jpg?t=1684960733'),(3,'The Witcher: Enhanced Edition Director\'s Cut',1,10,'0000-00-00',86,'https://cdn.cloudflare.steamstatic.com/steam/apps/20900/capsule_sm_120.jpg?t=1693600271'),(4,'Torn',3,30,'0000-00-00',74,'https://cdn.cloudflare.steamstatic.com/steam/apps/557520/capsule_sm_120.jpg?t=1680629664'),(5,'Borderlands 2',5,20,'0000-00-00',89,'https://cdn.cloudflare.steamstatic.com/steam/apps/49520/capsule_sm_120.jpg?t=1693524237'),(6,'Wolfenstein II: The New Colossus',6,40,'0000-00-00',86,'https://cdn.cloudflare.steamstatic.com/steam/apps/612880/capsule_sm_120.jpg?t=1691683256'),(7,'BlazBlue: Chronophantasma Extend',4,30,'0000-00-00',85,'https://cdn.cloudflare.steamstatic.com/steam/apps/388750/capsule_sm_120.jpg?t=1667790323'),(8,'The Witcher 2: Assassins of Kings Enhanced Ed',4,20,'0000-00-00',88,'https://cdn.cloudflare.steamstatic.com/steam/apps/20920/capsule_sm_120.jpg?t=1693600171'),(9,'InnerSpace',2,20,'0000-00-00',65,'https://cdn.cloudflare.steamstatic.com/steam/apps/347000/capsule_sm_120.jpg?t=1680629656'),(10,'Star Wars: Knights of the Old Republic',3,10,'0000-00-00',93,'https://cdn.cloudflare.steamstatic.com/steam/apps/32370/capsule_sm_120.jpg?t=1681144833'),(11,'MotoGP20',4,25,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/1161490/capsule_sm_120.jpg?t=1683646682'),(12,'Huntdown',4,20,'0000-00-00',85,'https://cdn.cloudflare.steamstatic.com/steam/apps/598550/capsule_sm_120.jpg?t=1694199558'),(13,'Oozi Earth Adventure',1,10,'0000-00-00',66,'https://cdn.cloudflare.steamstatic.com/steam/apps/257990/capsule_sm_120.jpg?t=1683194902'),(14,'Atomik: RunGunJumpGun',2,8,'0000-00-00',82,'https://cdn.cloudflare.steamstatic.com/steam/apps/440550/capsule_sm_120.jpg?t=1579700600'),(15,'To the Moon',2,10,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/206440/capsule_sm_120.jpg?t=1691637076'),(16,'Finding Paradise',2,10,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/337340/capsule_sm_120.jpg?t=1691637084'),(17,'Machinarium',3,20,'0000-00-00',85,'https://cdn.cloudflare.steamstatic.com/steam/apps/40700/capsule_sm_120.jpg?t=1683630220'),(18,'Steel Rats',1,10,'0000-00-00',68,'https://cdn.cloudflare.steamstatic.com/steam/apps/619700/capsule_sm_120.jpg?t=1674053137'),(19,'Sid Meier\'s Civilization: Beyond Earth',12,60,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/65980/capsule_sm_120.jpg?t=1568764824'),(20,'HOT WHEELS UNLEASHED',7,50,'0000-00-00',78,'https://cdn.cloudflare.steamstatic.com/steam/apps/1271700/capsule_sm_120.jpg?t=1685547345'),(21,'LUFTRAUSERS',2,10,'0000-00-00',80,'https://cdn.cloudflare.steamstatic.com/steam/apps/233150/capsule_sm_120.jpg?t=1659054136'),(22,'Razor2: Hidden Skies',1,10,'0000-00-00',61,'https://cdn.cloudflare.steamstatic.com/steam/apps/34920/capsule_sm_120.jpg?t=1573746590'),(23,'The Witcher 3: Wild Hunt',12,40,'0000-00-00',93,'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_sm_120.jpg?t=1693590732'),(24,'Ni no Kuni II: Revenant Kingdom',9,60,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/589360/capsule_sm_120.jpg?t=1666168049'),(25,'Wolfenstein: The New Order',4,20,'0000-00-00',81,'https://cdn.cloudflare.steamstatic.com/steam/apps/201810/capsule_sm_120.jpg?t=1691683281'),(26,'Star Wars Jedi Knight II: Jedi Outcast',3,10,'0000-00-00',89,'https://cdn.cloudflare.steamstatic.com/steam/apps/6030/capsule_sm_120.jpg?t=1586465683'),(27,'Pacific Storm Allies',1,14,'0000-00-00',60,'https://cdn.cloudflare.steamstatic.com/steam/apps/11260/capsule_sm_120.jpg?t=1691593029'),(28,'Orbital Gear',1,10,'0000-00-00',59,'https://cdn.cloudflare.steamstatic.com/steam/apps/298520/capsule_sm_120.jpg?t=1572343582'),(29,'Monster Boy and the Cursed Kingdom',7,30,'0000-00-00',82,'https://cdn.cloudflare.steamstatic.com/steam/apps/449610/capsule_sm_120.jpg?t=1695824378'),(30,'Botanicula',2,15,'0000-00-00',82,'https://cdn.cloudflare.steamstatic.com/steam/apps/207690/capsule_sm_120.jpg?t=1669304587'),(31,'NeverSynth',3,40,'0000-00-00',0,'https://cdn.cloudflare.steamstatic.com/steam/apps/2131200/capsule_sm_120.jpg?t=1667678875'),(32,'Jagged Alliance: Rage!',2,20,'0000-00-00',59,'https://cdn.cloudflare.steamstatic.com/steam/apps/463170/capsule_sm_120.jpg?t=1695813944'),(33,'Gungrave G.O.R.E',10,50,'0000-00-00',57,'https://cdn.cloudflare.steamstatic.com/steam/apps/1630110/capsule_sm_120.jpg?t=1675676867'),(34,'Blossom Tales: The Sleeping King',4,15,'0000-00-00',78,'https://cdn.cloudflare.steamstatic.com/steam/apps/446810/capsule_sm_120.jpg?t=1695826501'),(35,'Arise: A Simple Story',7,35,'0000-00-00',79,'https://cdn.cloudflare.steamstatic.com/steam/apps/866140/capsule_sm_120.jpg?t=1694422603'),(36,'Fury Unleashed',4,20,'0000-00-00',79,'https://cdn.cloudflare.steamstatic.com/steam/apps/465200/capsule_sm_120.jpg?t=1683211824'),(37,'Prince of Persia: The Sands of Time',2,10,'0000-00-00',89,'https://cdn.cloudflare.steamstatic.com/steam/apps/13600/capsule_sm_120.jpg?t=1447351278'),(38,'Atomicrops',3,15,'0000-00-00',78,'https://cdn.cloudflare.steamstatic.com/steam/apps/757320/capsule_sm_120.jpg?t=1695657527'),(39,'Absolver',6,30,'0000-00-00',75,'https://cdn.cloudflare.steamstatic.com/steam/apps/473690/capsule_sm_120.jpg?t=1669259057'),(40,'Who\'s That Flying?!',1,6,'0000-00-00',76,'https://cdn.cloudflare.steamstatic.com/steam/apps/57700/capsule_sm_120.jpg?t=1660896610'),(41,'Bleed 2',2,10,'0000-00-00',83,'https://cdn.cloudflare.steamstatic.com/steam/apps/396350/capsule_sm_120.jpg?t=1560632810'),(42,'Crimsonland',2,14,'0000-00-00',68,'https://cdn.cloudflare.steamstatic.com/steam/apps/262830/capsule_sm_120.jpg?t=1668434490'),(43,'Last Word',1,10,'0000-00-00',67,'https://cdn.cloudflare.steamstatic.com/steam/apps/355530/capsule_sm_120.jpg?t=1681246319'),(44,'Urban Trial Freestyle',1,7,'0000-00-00',58,'https://cdn.cloudflare.steamstatic.com/steam/apps/243450/capsule_sm_120.jpg?t=1635255570'),(45,'The Witness',10,40,'0000-00-00',87,'https://cdn.cloudflare.steamstatic.com/steam/apps/210970/capsule_sm_120.jpg?t=1598383120'),(46,'Echoes Of Aetheria',3,15,'0000-00-00',77,'https://cdn.cloudflare.steamstatic.com/steam/apps/354740/capsule_sm_120.jpg?t=1681233492'),(47,'Unrailed!',5,20,'0000-00-00',77,'https://cdn.cloudflare.steamstatic.com/steam/apps/1016920/capsule_sm_120.jpg?t=1695678785'),(48,'Samorost 3',3,20,'0000-00-00',80,'https://cdn.cloudflare.steamstatic.com/steam/apps/421120/capsule_sm_120.jpg?t=1669304500'),(49,'CRYPTARK',3,15,'0000-00-00',80,'https://cdn.cloudflare.steamstatic.com/steam/apps/344740/capsule_sm_120.jpg?t=1576348143'),(50,'Wolfenstein: The Old Blood',4,20,'0000-00-00',76,'https://cdn.cloudflare.steamstatic.com/steam/apps/350080/capsule_sm_120.jpg?t=1574181755'),(51,'BioShock Infinite',7,30,'0000-00-00',94,'https://cdn.cloudflare.steamstatic.com/steam/apps/8870/capsule_sm_120.jpg?t=1602794480'),(52,'God\'s Trigger',3,15,'0000-00-00',75,'https://cdn.cloudflare.steamstatic.com/steam/apps/488730/capsule_sm_120.jpg?t=1639505383'),(53,'The Inner World - The Last Wind Monk',2,20,'0000-00-00',79,'https://cdn.cloudflare.steamstatic.com/steam/apps/613470/capsule_sm_120.jpg?t=1676463854'),(54,'Fahrenheit: Indigo Prophecy Remastered',2,10,'0000-00-00',61,'https://cdn.cloudflare.steamstatic.com/steam/apps/312840/capsule_sm_120.jpg?t=1680629653'),(55,'RUINER',4,20,'0000-00-00',75,'https://cdn.cloudflare.steamstatic.com/steam/apps/464060/capsule_sm_120.jpg?t=1622220266'),(56,'Project Warlock',3,12,'0000-00-00',78,'https://cdn.cloudflare.steamstatic.com/steam/apps/893680/capsule_sm_120.jpg?t=1695917320'),(57,'Borderlands: The Pre-Sequel',14,70,'0000-00-00',75,'https://cdn.cloudflare.steamstatic.com/steam/apps/261640/capsule_sm_120.jpg?t=1693524255'),(58,'BPM: BULLETS PER MINUTE',5,20,'0000-00-00',74,'https://cdn.cloudflare.steamstatic.com/steam/apps/1286350/capsule_sm_120.jpg?t=1667228772'),(59,'STAR WARS: Knights of the Old Republic II - T',3,10,'0000-00-00',85,'https://cdn.cloudflare.steamstatic.com/steam/apps/208580/capsule_sm_120.jpg?t=1683660620'),(60,'Tangle Tower',4,20,'0000-00-00',74,'https://cdn.cloudflare.steamstatic.com/steam/apps/359510/capsule_sm_120.jpg?t=1695670089'),(61,'Call of Juarez: Gunslinger',3,15,'22/05/2013',79,'https://cdn.cloudflare.steamstatic.com/steam/apps/204450/capsule_sm_120.jpg?t=1685519689'),(62,'Call of Juarez: Bound in Blood',2,10,'30/06/2009',78,'https://cdn.cloudflare.steamstatic.com/steam/apps/21980/capsule_sm_120.jpg?t=1685519805'),(63,'Insurmountable',5,25,'29/04/2021',74,'https://cdn.cloudflare.steamstatic.com/steam/apps/1385100/capsule_sm_120.jpg?t=1662554944'),(64,'Call of Juarez',2,10,'12/06/2007',72,'https://cdn.cloudflare.steamstatic.com/steam/apps/3020/capsule_sm_120.jpg?t=1685519756'),(65,'Lucius II',3,20,'13/02/2015',48,'https://cdn.cloudflare.steamstatic.com/steam/apps/296830/capsule_sm_120.jpg?t=1667025112');
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
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
