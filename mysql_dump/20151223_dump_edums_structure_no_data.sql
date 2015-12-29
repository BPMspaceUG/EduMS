-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bpmspace_edums
-- ------------------------------------------------------
-- Server version	5.5.46-0+deb7u1

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
-- Temporary table structure for view `all_events`
--

DROP TABLE IF EXISTS `all_events`;
/*!50001 DROP VIEW IF EXISTS `all_events`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_events` (
  `event_id` tinyint NOT NULL,
  `start_date` tinyint NOT NULL,
  `finish_date` tinyint NOT NULL,
  `start_time` tinyint NOT NULL,
  `finish_time` tinyint NOT NULL,
  `course_id` tinyint NOT NULL,
  `course_name` tinyint NOT NULL,
  `internet_course_article_id` tinyint NOT NULL,
  `test` tinyint NOT NULL,
  `internet_location_name` tinyint NOT NULL,
  `internet_location_article_id` tinyint NOT NULL,
  `event_status_id` tinyint NOT NULL,
  `eventguaranteestatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `all_events_participant_participation`
--

DROP TABLE IF EXISTS `all_events_participant_participation`;
/*!50001 DROP VIEW IF EXISTS `all_events_participant_participation`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_events_participant_participation` (
  `event_id` tinyint NOT NULL,
  `event_start_date` tinyint NOT NULL,
  `course_name` tinyint NOT NULL,
  `participant_id` tinyint NOT NULL,
  `last_name` tinyint NOT NULL,
  `first_name` tinyint NOT NULL,
  `email_address` tinyint NOT NULL,
  `email_address_2` tinyint NOT NULL,
  `organization_id` tinyint NOT NULL,
  `status_participation_id` tinyint NOT NULL,
  `order_date` tinyint NOT NULL,
  `comment` tinyint NOT NULL,
  `status_billing_id` tinyint NOT NULL,
  `invoice_info` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `all_events_web`
--

DROP TABLE IF EXISTS `all_events_web`;
/*!50001 DROP VIEW IF EXISTS `all_events_web`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `all_events_web` (
  `event_id` tinyint NOT NULL,
  `start_date` tinyint NOT NULL,
  `finish_date` tinyint NOT NULL,
  `start_time` tinyint NOT NULL,
  `finish_time` tinyint NOT NULL,
  `course_id` tinyint NOT NULL,
  `course_name` tinyint NOT NULL,
  `internet_course_article_id` tinyint NOT NULL,
  `test` tinyint NOT NULL,
  `internet_location_name` tinyint NOT NULL,
  `internet_location_article_id` tinyint NOT NULL,
  `event_status_id` tinyint NOT NULL,
  `eventguaranteestatus` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `anmeldungen`
--

DROP TABLE IF EXISTS `anmeldungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anmeldungen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anm_datum` datetime DEFAULT NULL,
  `kdnr` text,
  `paket` text,
  `ansprechpartner` text,
  `email_ap` text,
  `firma` text,
  `strasse` text,
  `plzort` text,
  `land` text,
  `teltag` text,
  `telhandy` text,
  `tn1_name` text,
  `tn1_email` text,
  `tn2_name` text,
  `tn2_email` text,
  `tn3_name` text,
  `tn3_email` text,
  `zus_infos` text,
  `pruefung` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=525 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `apieventdata`
--

DROP TABLE IF EXISTS `apieventdata`;
/*!50001 DROP VIEW IF EXISTS `apieventdata`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `apieventdata` (
  `event_id` tinyint NOT NULL,
  `course_id` tinyint NOT NULL,
  `start_date` tinyint NOT NULL,
  `start_time` tinyint NOT NULL,
  `finish_date` tinyint NOT NULL,
  `finish_time` tinyint NOT NULL,
  `location_id` tinyint NOT NULL,
  `course_name` tinyint NOT NULL,
  `test` tinyint NOT NULL,
  `number_of_days` tinyint NOT NULL,
  `location_name` tinyint NOT NULL,
  `location_description` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `brand_id` int(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `super_brand` int(11) NOT NULL,
  `style` longtext,
  `brand_name` varchar(50) DEFAULT NULL,
  `accesstoken` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `brand_name` (`brand_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brand_location_limit`
--

DROP TABLE IF EXISTS `brand_location_limit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand_location_limit` (
  `entryid` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  PRIMARY KEY (`entryid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brand_topic_limit`
--

DROP TABLE IF EXISTS `brand_topic_limit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand_topic_limit` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  PRIMARY KEY (`entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contact_channel`
--

DROP TABLE IF EXISTS `contact_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_channel` (
  `contact_channel_id` int(10) NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(50) DEFAULT NULL,
  `contact_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`contact_channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `course_id` int(10) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(50) DEFAULT NULL,
  `test` tinyint(1) NOT NULL,
  `number_of_days` int(10) DEFAULT NULL,
  `number_of_trainers` int(10) DEFAULT NULL,
  `internet_course_article_id` int(10) DEFAULT NULL,
  `min_participants` int(10) DEFAULT NULL,
  `deprecated` tinyint(4) DEFAULT '0',
  `topic_id` int(11) NOT NULL,
  `course_mail_desc` mediumtext,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `course_name` (`course_name`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `course_course`
--

DROP TABLE IF EXISTS `course_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_course` (
  `entry_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `super_course_id` int(11) NOT NULL,
  PRIMARY KEY (`entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `event_id` int(10) NOT NULL AUTO_INCREMENT,
  `event_status_id` int(10) NOT NULL DEFAULT '1',
  `course_id` int(10) NOT NULL,
  `brand_id` int(10) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `finish_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `finish_time` time DEFAULT NULL,
  `inhouse` tinyint(1) NOT NULL DEFAULT '1',
  `location_id` int(10) DEFAULT NULL,
  `URL_Teilnehmerfeedback` longtext,
  `URL_Trainerfeedback` longtext,
  `eventguaranteestatus` int(10) NOT NULL DEFAULT '1',
  `status_billing_id` int(11) DEFAULT NULL,
  `URL_invoice` longtext,
  `note` text,
  `invoice_info` text,
  `mv_reg` decimal(10,0) DEFAULT NULL,
  `mv_tra` decimal(10,0) DEFAULT NULL,
  `mv_mat` decimal(10,0) DEFAULT NULL,
  `mv_cro` decimal(10,0) DEFAULT NULL,
  `mv_cat` decimal(10,0) DEFAULT NULL,
  `mv_ned` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `brand_id` (`brand_id`),
  KEY `course_id` (`course_id`),
  KEY `event_status_id` (`event_status_id`),
  KEY `location_id` (`location_id`),
  KEY `eventguaranteestatus` (`eventguaranteestatus`),
  KEY `status_billing_id` (`status_billing_id`),
  CONSTRAINT `courseevent` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`eventguaranteestatus`) REFERENCES `status_eventguarantee` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `event_ibfk_4` FOREIGN KEY (`status_billing_id`) REFERENCES `status_billing` (`status_billing_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `status_eventevent` FOREIGN KEY (`event_status_id`) REFERENCES `status_event` (`status_event_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4027 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback` (
  `event_id` int(10) NOT NULL,
  `feedback_id` int(10) NOT NULL,
  `feeback_value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`feedback_id`),
  CONSTRAINT `eventfeedback` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gender` (
  `gender_id` int(10) NOT NULL AUTO_INCREMENT,
  `gender` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`gender_id`),
  UNIQUE KEY `gender` (`gender`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `location_id` int(10) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(50) DEFAULT NULL,
  `location_description` longtext NOT NULL,
  `deprecated` tinyint(1) NOT NULL,
  `internet_location_name` varchar(255) DEFAULT NULL,
  `internet_location_article_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `location_name` (`location_name`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `organization_id` int(10) NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(50) DEFAULT NULL,
  `contact_url` varchar(50) DEFAULT NULL,
  `address_line_1` varchar(50) DEFAULT NULL,
  `address_line_2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`organization_id`),
  UNIQUE KEY `organization_name` (`organization_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1222 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `package_id` int(11) NOT NULL AUTO_INCREMENT,
  `package_name` mediumtext NOT NULL,
  `package_price` float NOT NULL,
  `package_discount` float NOT NULL,
  `topic_id` int(11) NOT NULL,
  `package_description` longtext NOT NULL,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `packageview`
--

DROP TABLE IF EXISTS `packageview`;
/*!50001 DROP VIEW IF EXISTS `packageview`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `packageview` (
  `topic_id` tinyint NOT NULL,
  `topic_name` tinyint NOT NULL,
  `topic_description` tinyint NOT NULL,
  `package_id` tinyint NOT NULL,
  `package_name` tinyint NOT NULL,
  `package_price` tinyint NOT NULL,
  `package_discount` tinyint NOT NULL,
  `package_description` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

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
) ENGINE=InnoDB AUTO_INCREMENT=5908 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participation` (
  `event_id` int(10) NOT NULL,
  `participant_id` int(10) NOT NULL,
  `status_participation_id` int(10) NOT NULL DEFAULT '2',
  `reason_for_cancel` varchar(50) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `comment` longtext,
  `status_billing_id` int(11) DEFAULT NULL,
  `URL_invoice` longtext,
  `status_buch_id` int(11) DEFAULT NULL,
  `invoice_info` text,
  PRIMARY KEY (`event_id`,`participant_id`),
  KEY `participantparticipation` (`participant_id`),
  KEY `status_participantparticipation` (`status_participation_id`),
  KEY `status_billing_id` (`status_billing_id`),
  KEY `status_buch_id` (`status_buch_id`),
  CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`participant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participation_ibfk_3` FOREIGN KEY (`status_participation_id`) REFERENCES `status_participation` (`status_participation_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `participation_ibfk_4` FOREIGN KEY (`status_billing_id`) REFERENCES `status_billing` (`status_billing_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `participation_ibfk_5` FOREIGN KEY (`status_buch_id`) REFERENCES `status_buch` (`status_buch_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_billing`
--

DROP TABLE IF EXISTS `status_billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_billing` (
  `status_billing_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_billing` varchar(50) NOT NULL,
  PRIMARY KEY (`status_billing_id`),
  UNIQUE KEY `status_billing` (`status_billing`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_buch`
--

DROP TABLE IF EXISTS `status_buch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_buch` (
  `status_buch_id` int(10) NOT NULL AUTO_INCREMENT,
  `status_buch` varchar(50) NOT NULL,
  PRIMARY KEY (`status_buch_id`),
  UNIQUE KEY `status_buch` (`status_buch`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_event`
--

DROP TABLE IF EXISTS `status_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_event` (
  `status_event_id` int(10) NOT NULL AUTO_INCREMENT,
  `status_event` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_event_id`),
  UNIQUE KEY `status_event` (`status_event`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_eventguarantee`
--

DROP TABLE IF EXISTS `status_eventguarantee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_eventguarantee` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `eventguaranteestatus` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `eventguaranteestatus` (`eventguaranteestatus`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_participation`
--

DROP TABLE IF EXISTS `status_participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_participation` (
  `status_participation_id` int(10) NOT NULL AUTO_INCREMENT,
  `status_participation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_participation_id`),
  UNIQUE KEY `status_participation` (`status_participation`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_sales`
--

DROP TABLE IF EXISTS `status_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_sales` (
  `status_sales_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_sales` varchar(50) NOT NULL,
  PRIMARY KEY (`status_sales_id`),
  UNIQUE KEY `status_sales` (`status_sales`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_sales_interests`
--

DROP TABLE IF EXISTS `status_sales_interests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_sales_interests` (
  `status_sales_interests_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_sales_interests` varchar(50) NOT NULL,
  PRIMARY KEY (`status_sales_interests_id`),
  UNIQUE KEY `status_sales_interests` (`status_sales_interests`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status_trainer`
--

DROP TABLE IF EXISTS `status_trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_trainer` (
  `status_trainer_id` int(10) NOT NULL AUTO_INCREMENT,
  `status_trainer` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`status_trainer_id`),
  UNIQUE KEY `status_trainer` (`status_trainer`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_name` mediumtext NOT NULL,
  `topic_description` longtext NOT NULL,
  `sidebar_descrition` longtext NOT NULL,
  `footer` longtext NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainer` (
  `trainer_id` int(10) NOT NULL AUTO_INCREMENT,
  `trainer_name` varchar(50) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `trainer_hash` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`trainer_id`),
  UNIQUE KEY `trainer_name` (`trainer_name`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trainer_event_assignment`
--

DROP TABLE IF EXISTS `trainer_event_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trainer_event_assignment` (
  `event_id` int(10) NOT NULL,
  `trainer_id` int(10) NOT NULL,
  `trainer_status_id` int(10) NOT NULL DEFAULT '1',
  PRIMARY KEY (`event_id`,`trainer_id`),
  KEY `eventtrainer_event_assignment` (`event_id`),
  KEY `status_trainertrainer_event_ass` (`trainer_status_id`),
  KEY `trainertrainer_event_assignment` (`trainer_id`),
  CONSTRAINT `eventtrainer_event_assignment` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE,
  CONSTRAINT `status_trainertrainer_event_assignment` FOREIGN KEY (`trainer_status_id`) REFERENCES `status_trainer` (`status_trainer_id`) ON UPDATE CASCADE,
  CONSTRAINT `trainertrainer_event_assignment` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `all_events`
--

/*!50001 DROP TABLE IF EXISTS `all_events`*/;
/*!50001 DROP VIEW IF EXISTS `all_events`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_events` AS select `event`.`event_id` AS `event_id`,`event`.`start_date` AS `start_date`,`event`.`finish_date` AS `finish_date`,`event`.`start_time` AS `start_time`,`event`.`finish_time` AS `finish_time`,`course`.`course_id` AS `course_id`,`course`.`course_name` AS `course_name`,`course`.`internet_course_article_id` AS `internet_course_article_id`,`course`.`test` AS `test`,`location`.`internet_location_name` AS `internet_location_name`,`location`.`internet_location_article_id` AS `internet_location_article_id`,`event`.`event_status_id` AS `event_status_id`,`event`.`eventguaranteestatus` AS `eventguaranteestatus` from ((`event` join `course`) join `location`) where ((`event`.`course_id` = `course`.`course_id`) and (`event`.`location_id` = `location`.`location_id`)) order by `event`.`start_date`,`event`.`finish_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_events_participant_participation`
--

/*!50001 DROP TABLE IF EXISTS `all_events_participant_participation`*/;
/*!50001 DROP VIEW IF EXISTS `all_events_participant_participation`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_events_participant_participation` AS select `e`.`event_id` AS `event_id`,`e`.`start_date` AS `event_start_date`,`c`.`course_name` AS `course_name`,`p`.`participant_id` AS `participant_id`,`p`.`last_name` AS `last_name`,`p`.`first_name` AS `first_name`,`p`.`email_address` AS `email_address`,`p`.`email_address_2` AS `email_address_2`,`p`.`organization_id` AS `organization_id`,`t`.`status_participation_id` AS `status_participation_id`,`t`.`order_date` AS `order_date`,`t`.`comment` AS `comment`,`t`.`status_billing_id` AS `status_billing_id`,`t`.`invoice_info` AS `invoice_info` from (((`participant` `p` join `participation` `t`) join `course` `c`) join `event` `e`) where ((`p`.`participant_id` = `t`.`participant_id`) and (`e`.`event_id` = `t`.`event_id`) and (`e`.`course_id` = `c`.`course_id`)) order by `p`.`participant_id` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `all_events_web`
--

/*!50001 DROP TABLE IF EXISTS `all_events_web`*/;
/*!50001 DROP VIEW IF EXISTS `all_events_web`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `all_events_web` AS select `event`.`event_id` AS `event_id`,`event`.`start_date` AS `start_date`,`event`.`finish_date` AS `finish_date`,`event`.`start_time` AS `start_time`,`event`.`finish_time` AS `finish_time`,`course`.`course_id` AS `course_id`,`course`.`course_name` AS `course_name`,`course`.`internet_course_article_id` AS `internet_course_article_id`,`course`.`test` AS `test`,`location`.`internet_location_name` AS `internet_location_name`,`location`.`internet_location_article_id` AS `internet_location_article_id`,`event`.`event_status_id` AS `event_status_id`,`event`.`eventguaranteestatus` AS `eventguaranteestatus` from ((`event` join `course`) join `location`) where ((`event`.`start_date` >= curdate()) and (`event`.`course_id` = `course`.`course_id`) and (`event`.`location_id` = `location`.`location_id`) and (`event`.`inhouse` = 0) and ((`event`.`event_status_id` = 2) or (`event`.`event_status_id` = 3))) order by `event`.`start_date`,`event`.`finish_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `apieventdata`
--

/*!50001 DROP TABLE IF EXISTS `apieventdata`*/;
/*!50001 DROP VIEW IF EXISTS `apieventdata`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `apieventdata` AS select `e`.`event_id` AS `event_id`,`e`.`course_id` AS `course_id`,`e`.`start_date` AS `start_date`,`e`.`start_time` AS `start_time`,`e`.`finish_date` AS `finish_date`,`e`.`finish_time` AS `finish_time`,`e`.`location_id` AS `location_id`,`c`.`course_name` AS `course_name`,`c`.`test` AS `test`,`c`.`number_of_days` AS `number_of_days`,`l`.`location_name` AS `location_name`,`l`.`location_description` AS `location_description` from ((`event` `e` left join `course` `c` on((`c`.`course_id` = `e`.`course_id`))) left join `location` `l` on((`l`.`location_id` = `e`.`location_id`))) where ((`e`.`start_date` > now()) and (`e`.`inhouse` = 0) and (`c`.`deprecated` = 0)) order by `e`.`start_date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `packageview`
--

/*!50001 DROP TABLE IF EXISTS `packageview`*/;
/*!50001 DROP VIEW IF EXISTS `packageview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `packageview` AS select `topic`.`topic_id` AS `topic_id`,`topic`.`topic_name` AS `topic_name`,`topic`.`topic_description` AS `topic_description`,`package`.`package_id` AS `package_id`,`package`.`package_name` AS `package_name`,`package`.`package_price` AS `package_price`,`package`.`package_discount` AS `package_discount`,`package`.`package_description` AS `package_description` from (`topic` left join `package` on((`package`.`topic_id` = `topic`.`topic_id`))) where (`package`.`deprecated` <> 1) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-25 10:11:55
