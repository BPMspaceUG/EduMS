-- MySQL dump 10.13  Distrib 5.1.66, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: mitsm_business_warehouse
-- ------------------------------------------------------
-- Server version	5.1.66-0+squeeze1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participant` (
  `participant_id` int(10) NOT NULL AUTO_INCREMENT,
  `gender_id` int(10) NOT NULL,
  `titel` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `email_address_2` varchar(50) DEFAULT NULL,
  `phone_business` varchar(30) DEFAULT NULL,
  `phone_private` varchar(30) DEFAULT NULL,
  `phone_mobile` varchar(30) DEFAULT NULL,
  `phone_fax` varchar(30) DEFAULT NULL,
  `address_line_1` varchar(50) DEFAULT NULL,
  `address_line_2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `place_of_birth` varchar(50) DEFAULT NULL,
  `organization_id` int(10) NOT NULL,
  `contact_channel_id` int(10) DEFAULT NULL,
  `contact_channel_data` varchar(255) DEFAULT NULL,
  `contact_only` tinyint(1) NOT NULL,
  `contact_person` int(10) DEFAULT NULL,
  `status_sales_id` int(11) DEFAULT NULL,
  `status_sales_interests` varchar(50) DEFAULT NULL,
  `sales_history` text,
  `data_history` text,
  `joomla_id` int(11) DEFAULT NULL,
  `history_data` longtext,
  PRIMARY KEY (`participant_id`),
  KEY `contact_channelparticipant` (`contact_channel_id`),
  KEY `genderparticipant` (`gender_id`),
  KEY `organization_id` (`organization_id`),
  KEY `status_sales_id` (`status_sales_id`),
  CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `participant_ibfk_3` FOREIGN KEY (`contact_channel_id`) REFERENCES `contact_channel` (`contact_channel_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `participant_ibfk_4` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `participant_ibfk_6` FOREIGN KEY (`status_sales_id`) REFERENCES `status_sales` (`status_sales_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4751 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-16 16:47:49
