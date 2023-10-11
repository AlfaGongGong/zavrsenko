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
-- Table structure for table `gaming_gear`
--

DROP TABLE IF EXISTS `gaming_gear`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gaming_gear` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `asin` varchar(255) NOT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `review_rating` decimal(3,2) DEFAULT '0.00',
  `review_count` int DEFAULT '0',
  `is_amazon_choice` tinyint(1) DEFAULT '0',
  `is_bestseller` tinyint(1) DEFAULT '0',
  `is_prime` tinyint(1) DEFAULT '0',
  `price` decimal(10,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `asin` (`asin`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gaming_gear`
--

LOCK TABLES `gaming_gear` WRITE;
/*!40000 ALTER TABLE `gaming_gear` DISABLE KEYS */;
INSERT INTO `gaming_gear` VALUES (1,'Wireless D-09 Computer Mouse','B0CGY3YFDT','https://m.media-amazon.com/images/I/616YhNKtqML._AC_UY654_QL65_.jpg',0.00,0,0,0,0,7.49,'2023-10-01 23:23:30','2023-10-02 14:40:56',' USB Cordless Mice for Laptop, Ergo Grips, Lightspeed 5-Level 2400 DPI, 16 Months Battery, Portable for PC Mac Chromebook, 6 Button, Stormy Black'),(2,'ASUS ROG Strix Scope II 96 ','B0C7KFZ5TL','https://m.media-amazon.com/images/I/71zmZbiUeAL._AC_UY654_QL65_.jpg',4.70,452,0,0,0,179.99,'2023-10-01 23:23:30','2023-10-02 14:40:56','Wireless Gaming Keyboard, Tri-Mode Connection, Dampening Foam & Switch-Dampening Pads, Hot-Swappable Pre-lubed ROG NX Snow Switches, PBT Keycaps, RGB-Black'),(3,'ROCCAT Vulcan 121 AIMO ','B07YNHBVGQ','https://m.media-amazon.com/images/I/81dvVgSVhtL._AC_UY654_QL65_.jpg',4.60,2,0,0,0,69.98,'2023-10-01 23:23:30','2023-10-02 15:08:36','Linear Mechanical Titan Switch Full-size PC Gaming Keyboard with Per-key AIMO RGB Lighting, Anodized Aluminum Top Plate and Detachable Palm Rest – Black'),(4,'Chroma RGB Lighting ','B0C51934VF','https://m.media-amazon.com/images/I/71tuAoPh-LL._AC_UY654_QL65_.jpg',3.90,34,0,0,0,129.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','RGB Gaming Mouse Pad, Extended Large Mouse Pad with 14 Lighting Modes, Waterproof and Non-Slip Rubber Base Keyboard Mat Soft Gaming Pad Size 31.5X12 in'),(5,'ROCCAT Burst Pro PC Gaming Mouse','B08JX791DW','https://m.media-amazon.com/images/I/61RuA9aqdsL._AC_UY654_QL65_.jpg',4.50,1,0,0,0,29.99,'2023-10-01 23:23:30','2023-10-02 15:08:36','Optical Switches, Super Lightweight Ergonomic Wired Computer Mouse, RGB Lighting, Titan Scroll Wheel, Honeycomb Shell, Claw Grip, Owl-Eye Sensor, 16K DPI, Black'),(6,'Razer Basilisk V3 ','B09C13PZX7','https://m.media-amazon.com/images/I/61AcT0ZuO3L._AC_UY654_QL65_.jpg',4.60,5,0,0,0,49.90,'2023-10-01 23:23:30','2023-10-02 15:08:36','Customizable Ergonomic Gaming Mouse: Fastest Gaming Mouse Switch - Chroma RGB Lighting - 26K DPI Optical Sensor -Classic Black\n'),(7,'Cherry MX 2.0S','B0BTDRGJMH','https://m.media-amazon.com/images/I/71OAKRQ8AnL._AC_UY654_QL65_.jpg',4.60,39,0,0,0,79.99,'2023-10-01 23:23:30','2023-10-02 15:08:36',' Wired Gaming Keyboard with RGB Lighting Different MX Switching Characteristics: MX Black, MX Blue, MX Brown, MX RED and MX Silent RED (Black - MX Silent Red Switch)'),(8,'Razer Cobra ','B0C51J2ZXN','https://m.media-amazon.com/images/I/61N55jovDVL._AC_UY654_QL65_.jpg',4.20,47,0,0,0,0.00,'2023-10-01 23:23:30','2023-10-02 15:08:36','Wired Gaming Mouse: 58g Lightweight Design - Gen-3 Optical Switches - Chroma RGB Lighting with Underglow - Precise 8500 DPI Optical Sensor - 100% PTFE Mouse Feet - Speedflex Cable - Black'),(9,'ASUS ROG Gladius III ','B0BRTJNQQ8','https://m.media-amazon.com/images/I/51+3Ssz-96L._AC_UY654_QL65_.jpg',4.30,350,0,0,0,95.15,'2023-10-01 23:23:30','2023-10-02 15:08:36','Wireless AimPoint Gaming Mouse, Connectivity (2.4GHz RF, Bluetooth, Wired), 36000 DPI Sensor, 6 programmable Buttons, ROG SpeedNova, Replaceable switches, Paracord Cable, White'),(10,'ROCCAT Vulcan II Max ','B0BD99ZDZJ','https://m.media-amazon.com/images/I/81ZRAuptuGL._AC_UY654_QL65_.jpg',4.10,7,0,0,0,179.99,'2023-10-01 23:23:30','2023-10-02 15:08:36','Optical-Mechanical PC Gaming Keyboard with Customizable RGB Illuminated Keys and Palm Rest, Titan II Tactile Linear Switches, Aluminum Plate, 100M Keystroke Durability – Black'),(11,'Razer Ornata V3','B09X6FKCBD','https://m.media-amazon.com/images/I/71YW8+KhOwL._AC_UY654_QL65_.jpg',4.40,722,0,0,0,67.99,'2023-10-01 23:23:30','2023-10-02 15:08:36',' Gaming Keyboard: Low-Profile Keys - Mecha-Membrane Switches - UV-Coated Keycaps - Backlit Media Keys - 10-Zone RGB Lighting - Spill-Resistant - Magnetic Wrist Wrest - Classic Black'),(12,'MageGee Gaming Keyboard and Mouse Combo','B0B6HCZ482','https://m.media-amazon.com/images/I/71Ar9DJz48L._AC_UY654_QL65_.jpg',4.50,12,0,0,0,32.99,'2023-10-01 23:23:30','2023-10-02 15:08:36',' K1 LED Rainbow Backlit with 104 Key Computer Keyboard for PC/Laptop(Black & Gray)'),(13,'Razer DeathStalker V2 Pro TKL','B0B5FP7WCG','https://m.media-amazon.com/images/I/71SpCoZ9DhL._AC_UY654_QL65_.jpg',4.20,346,0,0,0,219.99,'2023-10-01 23:23:30','2023-10-02 15:13:30','Wireless Gaming Keyboard: Low-Profile Optical Switches - Linear Red - HyperSpeed Wireless & Bluetooth 5.0 - Up to 200 Hrs - Ultra-Durable Coated Keycaps - Chroma RGB'),(14,'Corsair Dark Core RGB Pro','B082LVNHW9','https://m.media-amazon.com/images/I/61Q8UQrNpxL._AC_UY654_QL65_.jpg',4.50,4,0,0,0,63.50,'2023-10-01 23:23:30','2023-10-02 15:13:30','Wireless FPS/MOBA Gaming Mouse with SLIPSTREAM Technology, Black, Backlit RGB LED, 18000 DPI, Optical,CH-9315411-NA'),(15,'Razer Huntsman V2 TKL','B09C13WYDX','https://m.media-amazon.com/images/I/81VbPK0fFqL._AC_UY654_QL65_.jpg',4.60,2,0,0,0,109.99,'2023-10-01 23:23:30','2023-10-02 15:13:30',' Tenkeyless Gaming Keyboard: Fastest Linear Optical Switches Gen2 w/Sound Dampeners & 8000Hz Polling Rate - Detachable TypeC Cable - Doubleshot PBT Keycaps - Ergonomic Wrist Rest'),(16,'ASUS ROG Spatha X ','B09726KT4R','https://m.media-amazon.com/images/I/81FDMl-cF-L._AC_UY654_QL65_.jpg',4.40,600,0,0,0,142.77,'2023-10-01 23:23:30','2023-10-02 15:13:30','Wireless Gaming Mouse (Magnetic Charging Stand, 12 Programmable Buttons, 19,000 DPI, Push-fit Hot Swap Switch Sockets, ROG Micro Switches&Paracord and Aura RGB lighting),Black'),(17,'RedThunder K10','B09BR46F63','https://m.media-amazon.com/images/I/717IaZVyToL._AC_UY654_QL65_.jpg',4.00,3,0,0,0,52.99,'2023-10-01 23:23:30','2023-10-02 15:13:30','Wireless Gaming Keyboard and Mouse Combo, LED Backlit Rechargeable 3800mAh Battery, Mechanical Feel Anti-ghosting Keyboard + 7D 3200DPI Mice for PC Gamer (Black)'),(18,'Razer DeathAdder V3 Pro','B0B6XZLNHQ','https://m.media-amazon.com/images/I/61a3WCSv23L._AC_UY654_QL65_.jpg',4.60,929,0,0,0,147.52,'2023-10-01 23:23:30','2023-10-02 15:13:30','Gaming Mouse: 63g Ultra Lightweight - Focus Pro 30K Optical Sensor - Fast Optical Switches Gen-3 - HyperSpeed Wireless - 5 Programmable Buttons - 90 Hr Battery - Black'),(19,'Razer DeathAdder V2 Pro ','B08FQMBKQG','https://m.media-amazon.com/images/I/61C3xYVKtZL._AC_UY654_QL65_.jpg',4.60,3,0,0,0,68.00,'2023-10-01 23:23:30','2023-10-02 15:13:30','Wireless Gaming Mouse: 20K DPI Optical Sensor - 3X Faster Than Mechanical Optical Switch - Chroma RGB Lighting - 70 Hr Battery Life - 8 Programmable Buttons - Classic Black'),(20,'Razer Viper V2 Pro','B09VCSKB1C','https://m.media-amazon.com/images/I/61zQBLVpV4L._AC_UY654_QL65_.jpg',4.30,1,0,0,0,128.00,'2023-10-01 23:23:30','2023-10-02 15:20:22','HyperSpeed Wireless Gaming Mouse: 59g Ultra-Lightweight - Optical Switches Gen-3-30K Optical Sensor - On-Mouse DPI Controls - 80hr Battery - USB Type C Cable Included - White'),(21,'Hard Carrying Case for Logitech G502 Mouse','B09W9GV9Q5','https://m.media-amazon.com/images/I/81fGzH5fTkL._AC_UY654_QL65_.jpg',4.00,5,0,0,0,11.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','Portable Gaming Case Protective Storage Bag(Black)'),(22,'RedThunder K20 ','B0BDDSWVQ2','https://m.media-amazon.com/images/I/71JyLUxzKmL._AC_UY654_QL65_.jpg',4.00,275,0,0,0,49.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','Wireless Keyboard and Mouse Combo, Full Size Anti-Ghosting Keyboard with Multimedia Keys + 7D 4800DPI Optical Mice, Rechargeable RGB Gaming/Office Set for PC Laptop Mac Xbox (Black)'),(103,'RGB Gaming Mouse Pad, Extended Large Mouse Pad with 14 Lighting Modes, Waterproof and Non-Slip Rubber Base Keyboard Mat Soft Gaming Pad Size 31.5X12 in','B0888SWT49','https://m.media-amazon.com/images/I/61rebkGGwUL._AC_UY654_QL65_.jpg',4.60,0,0,0,0,18.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','RGB Gaming Mouse, Software Controlled RGB Light Effects & Macro Customization, Pixart 3327 Sensor up to 6,200DPI, 7 Programmable Buttons, Mouse Weight 87g,Black'),(105,'HyperX Pulsefire Core ','B07H3GFJJ2','https://m.media-amazon.com/images/I/413jb9SWLPS._AC_UY654_QL65_.jpg',4.60,0,0,0,0,19.00,'2023-10-01 23:23:30','2023-10-02 15:20:22','RGB Gaming Mouse Pad, Extended Large Mouse Pad with 14 Lighting Modes, Waterproof and Non-Slip Rubber Base Keyboard Mat Soft Gaming Pad Size 31.5X12 in'),(106,'Gamenote RGB Headphone Stand & Power Strip 2 in 1','B08J3KYJKM','https://m.media-amazon.com/images/I/61hgSq0CM4L._AC_UY654_QL65_.jpg',4.80,0,0,0,0,26.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','Desk Gaming Headset Holder with 3 USB Charging Ports and 3 Power Outlets Earphone Hanger Accessories for Desktop Gamer'),(107,'Snpurdiri ','B08SBG4JG7','https://m.media-amazon.com/images/I/71PA0hB-IXL._AC_UY654_QL65_.jpg',4.30,0,0,0,0,19.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','Wired Gaming Keyboard, RGB Backlit Ultra-Compact Mini Keyboard, Waterproof Small Compact 61 Keys Keyboard for PC/Mac Gamer, Typist, Travel, Easy to Carry on Business Trip(Black)'),(125,'Glass Mousepad Gaming for Desk','B0CBVPKK7B','https://m.media-amazon.com/images/I/519z-3zexGL._AC_UY654_QL65_.jpg',4.90,0,0,0,0,59.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','XL Micro-Etched Tempered Glass, Ultra-Smooth & Ultra-Durable, 17.7\\\" x15.7 inches'),(145,'Cherry MX 2.0S ','B0BXTF94VG','https://m.media-amazon.com/images/I/515qJzsjT4L._AC_UY654_QL65_.jpg',4.60,0,0,0,0,79.99,'2023-10-01 23:23:30','2023-10-02 15:20:22','Wired Gaming Keyboard with RGB Lighting Different MX Switching Characteristics: MX Black, MX Blue, MX Brown, MX RED and MX Silent RED (Black - MX Red Switch)');
/*!40000 ALTER TABLE `gaming_gear` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-10 21:53:33
