-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Erstellungszeit: 07. Mrz 2016 um 01:26
-- Server-Version: 5.6.26
-- PHP-Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `bpmspace_edums_v4`
--
CREATE DATABASE IF NOT EXISTS `bpmspace_edums_v4` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bpmspace_edums_v4`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `brand_id` int(10) NOT NULL,
  `brand_name` varchar(50) DEFAULT NULL,
  `discount` float(8,2) NOT NULL DEFAULT '0.00',
  `event_partner_id` int(11) NOT NULL,
  `css-style` longtext,
  `accesstoken` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `brandDescription` longtext,
  `brandDescriptionFooter` longtext,
  `deprecated` tinyint(1) DEFAULT NULL,
  `brandImage` blob,
  `brandHeadline` tinytext,
  `brandDescriptionSidebar` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brand_location`
--

DROP TABLE IF EXISTS `brand_location`;
CREATE TABLE `brand_location` (
  `brand_location_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brand_topic`
--

DROP TABLE IF EXISTS `brand_topic`;
CREATE TABLE `brand_topic` (
  `brand_topic_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `candidate_selection`
--

DROP TABLE IF EXISTS `candidate_selection`;
CREATE TABLE `candidate_selection` (
  `candidate_selection_id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `sql_query` text,
  `visited_courses` text,
  `not_visited_courses` text,
  `z_candidates` tinyint(4) DEFAULT NULL,
  `joomla_users` tinyint(4) DEFAULT NULL,
  `visited_courses_public` tinyint(4) DEFAULT NULL,
  `visited_courses_inhouse` tinyint(4) DEFAULT NULL,
  `not_visited_courses_public` tinyint(4) DEFAULT NULL,
  `not_visited_courses_inhouse` tinyint(4) DEFAULT NULL,
  `show_date_start` date DEFAULT NULL,
  `show_date_end` date DEFAULT NULL,
  `method_visited` varchar(45) DEFAULT NULL,
  `method_not_visited` varchar(45) DEFAULT NULL,
  `mail_include` text,
  `mail_exclude` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `contact_channel`
--

DROP TABLE IF EXISTS `contact_channel`;
CREATE TABLE `contact_channel` (
  `contact_channel_id` int(10) NOT NULL,
  `contact_name` varchar(50) DEFAULT NULL,
  `contact_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` int(10) NOT NULL,
  `course_name` varchar(50) DEFAULT NULL,
  `courseHeadline` tinytext NOT NULL,
  `test` tinyint(1) NOT NULL,
  `number_of_days` int(10) DEFAULT NULL,
  `number_of_trainers` int(10) DEFAULT NULL,
  `internet_course_article_id` int(10) DEFAULT NULL,
  `min_participants` int(10) DEFAULT NULL,
  `deprecated` tinyint(4) DEFAULT '0',
  `courseDescription` mediumtext,
  `courseImage` longblob,
  `courseDescriptionMail` mediumtext,
  `coursePrice` float DEFAULT NULL,
  `courseDescriptionCertificate` mediumtext,
  `max_participants` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course_test`
--

DROP TABLE IF EXISTS `course_test`;
CREATE TABLE `course_test` (
  `course_test_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `test_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `event_id` int(10) NOT NULL,
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
  `maxParticipants` int(11) DEFAULT '15'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `event_id` int(10) NOT NULL,
  `feedback_id` int(10) NOT NULL,
  `feeback_value` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gender`
--

DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender` (
  `gender_id` int(10) NOT NULL,
  `gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `location`
--

DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `location_id` int(10) NOT NULL,
  `location_name` varchar(50) DEFAULT NULL,
  `internet_location_name` varchar(255) DEFAULT NULL,
  `internet_location_article_id` int(10) DEFAULT NULL,
  `deprecated` tinyint(1) NOT NULL,
  `location_description` longtext NOT NULL,
  `location_mail_desc` longtext,
  `favourite` int(11) DEFAULT NULL,
  `max_participants` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `organization`
--

DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `organization_id` int(10) NOT NULL,
  `organization_name` varchar(50) DEFAULT NULL,
  `contact_url` varchar(50) DEFAULT NULL,
  `address_line_1` varchar(50) DEFAULT NULL,
  `address_line_2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participant`
--

DROP TABLE IF EXISTS `participant`;
CREATE TABLE `participant` (
  `participant_id` int(10) NOT NULL,
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
  `joomla_email` varchar(250) NOT NULL,
  `joomla_sync_history` text NOT NULL,
  `no_contact` tinyint(1) DEFAULT '0',
  `mail_history` text NOT NULL,
  `history_data` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `participation`
--

DROP TABLE IF EXISTS `participation`;
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
  `invoice_info` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `registration`
--

DROP TABLE IF EXISTS `registration`;
CREATE TABLE `registration` (
  `registration_id` int(11) NOT NULL,
  `registration_date` datetime DEFAULT NULL,
  `customer_id` text CHARACTER SET latin1,
  `package` tinytext,
  `contact_person` text CHARACTER SET latin1,
  `email_contact_person` text CHARACTER SET latin1,
  `company` text CHARACTER SET latin1,
  `street` text CHARACTER SET latin1,
  `city` text CHARACTER SET latin1,
  `country` text CHARACTER SET latin1,
  `phone_day` text CHARACTER SET latin1,
  `phone_mobile` text CHARACTER SET latin1,
  `participant1_name` text CHARACTER SET latin1,
  `participant1_email` text CHARACTER SET latin1,
  `participant2_name` text CHARACTER SET latin1,
  `participant2_email` text CHARACTER SET latin1,
  `participant3_name` text CHARACTER SET latin1,
  `participant3_email` text CHARACTER SET latin1,
  `additional_information` text CHARACTER SET latin1,
  `test` tinyint(1) DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `registration_events`
--

DROP TABLE IF EXISTS `registration_events`;
CREATE TABLE `registration_events` (
  `registration_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_billing`
--

DROP TABLE IF EXISTS `status_billing`;
CREATE TABLE `status_billing` (
  `status_billing_id` int(11) NOT NULL,
  `status_billing` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_buch`
--

DROP TABLE IF EXISTS `status_buch`;
CREATE TABLE `status_buch` (
  `status_buch_id` int(10) NOT NULL,
  `status_buch` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_event`
--

DROP TABLE IF EXISTS `status_event`;
CREATE TABLE `status_event` (
  `status_event_id` int(10) NOT NULL,
  `status_event` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_eventguarantee`
--

DROP TABLE IF EXISTS `status_eventguarantee`;
CREATE TABLE `status_eventguarantee` (
  `ID` int(10) NOT NULL,
  `eventguaranteestatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_participation`
--

DROP TABLE IF EXISTS `status_participation`;
CREATE TABLE `status_participation` (
  `status_participation_id` int(10) NOT NULL,
  `status_participation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_sales`
--

DROP TABLE IF EXISTS `status_sales`;
CREATE TABLE `status_sales` (
  `status_sales_id` int(11) NOT NULL,
  `status_sales` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `status_trainer`
--

DROP TABLE IF EXISTS `status_trainer`;
CREATE TABLE `status_trainer` (
  `status_trainer_id` int(10) NOT NULL,
  `status_trainer` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `topic`
--

DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `topic_id` int(11) NOT NULL,
  `topicName` longtext NOT NULL,
  `topicHeadline` tinytext NOT NULL,
  `topicDescription` longtext NOT NULL,
  `topicDescriptionSidebar` longtext NOT NULL,
  `topicImage` longblob,
  `topicDescriptionFooter` longtext NOT NULL,
  `responsibleTrainer_id` int(11) NOT NULL,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `topic_course`
--

DROP TABLE IF EXISTS `topic_course`;
CREATE TABLE `topic_course` (
  `topic_course_id` int(11) NOT NULL,
  `topic_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trainer`
--

DROP TABLE IF EXISTS `trainer`;
CREATE TABLE `trainer` (
  `trainer_id` int(10) NOT NULL,
  `trainer_name` varchar(50) DEFAULT NULL,
  `email_address` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `trainer_hash` varchar(32) DEFAULT NULL,
  `deprecated` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trainer_course`
--

DROP TABLE IF EXISTS `trainer_course`;
CREATE TABLE `trainer_course` (
  `trainer_course_id` int(11) NOT NULL,
  `trainer_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `trainer_event_assignment`
--

DROP TABLE IF EXISTS `trainer_event_assignment`;
CREATE TABLE `trainer_event_assignment` (
  `event_id` int(10) NOT NULL,
  `trainer_id` int(10) NOT NULL,
  `trainer_status_id` int(10) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_brandtopic`
--
DROP VIEW IF EXISTS `v_brandtopic`;
CREATE TABLE `v_brandtopic` (
`brand_topic_id` int(11)
,`brand_id` int(11)
,`topic_id` int(11)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_brand__notdepercated_loginnotempty_accesstokennotempty`
--
DROP VIEW IF EXISTS `v_brand__notdepercated_loginnotempty_accesstokennotempty`;
CREATE TABLE `v_brand__notdepercated_loginnotempty_accesstokennotempty` (
`brand_id` int(10)
,`event_partner_id` int(11)
,`brand_name` varchar(50)
,`brandHeadline` tinytext
,`brandDescription` longtext
,`brandDescriptionFooter` longtext
,`brandDescriptionSidebar` longtext
,`brandImage` blob
,`accesstoken` varchar(50)
,`login` varchar(50)
,`discount` float(8,2)
,`css-style` longtext
,`branddeprecated` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_course_notdepercated`
--
DROP VIEW IF EXISTS `v_course_notdepercated`;
CREATE TABLE `v_course_notdepercated` (
`course_id` int(10)
,`course_name` varchar(50)
,`number_of_days` int(10)
,`internet_course_article_id` int(10)
,`min_participants` int(10)
,`courseHeadline` tinytext
,`courseDescription` mediumtext
,`courseDescriptionMail` mediumtext
,`coursePrice` float
,`courseDescriptionCertificate` mediumtext
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`
--
DROP VIEW IF EXISTS `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`;
CREATE TABLE `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` (
`event_id` int(10)
,`start_date` date
,`finish_date` date
,`start_time` time
,`finish_time` time
,`course_id` int(10)
,`course_name` varchar(50)
,`test` tinyint(1)
,`coursedeprecated` tinyint(4)
,`courseMaxParticipants` int(11)
,`location_id` int(10)
,`location_name` varchar(50)
,`internet_location_name` varchar(255)
,`location_description` longtext
,`locationMaxParticipants` int(11)
,`event_status_id` int(10)
,`eventguaranteestatus` int(10)
,`eventinhouse` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_participationevent_count_futurepublicnotstornonotnew`
--
DROP VIEW IF EXISTS `v_participationevent_count_futurepublicnotstornonotnew`;
CREATE TABLE `v_participationevent_count_futurepublicnotstornonotnew` (
`event_id` int(10)
,`count` bigint(21)
,`status_participation_id` int(10)
,`status_participation_name` varchar(50)
,`courseMinParticipants` int(10)
,`courseMaxParticipants` int(11)
,`locationMaxParticipants` int(11)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_statusevent`
--
DROP VIEW IF EXISTS `v_statusevent`;
CREATE TABLE `v_statusevent` (
`status_event_id` int(10)
,`status_event` varchar(50)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_statuseventguarantee`
--
DROP VIEW IF EXISTS `v_statuseventguarantee`;
CREATE TABLE `v_statuseventguarantee` (
`ID` int(10)
,`eventguaranteestatus` varchar(255)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_statustrainer`
--
DROP VIEW IF EXISTS `v_statustrainer`;
CREATE TABLE `v_statustrainer` (
`status_trainer_id` int(10)
,`status_trainer` varchar(50)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_testcourse`
--
DROP VIEW IF EXISTS `v_testcourse`;
CREATE TABLE `v_testcourse` (
`course_id` int(11)
,`test_id` int(11)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_topiccourse_notdepercatedlevelnotzero`
--
DROP VIEW IF EXISTS `v_topiccourse_notdepercatedlevelnotzero`;
CREATE TABLE `v_topiccourse_notdepercatedlevelnotzero` (
`topic_course_id` int(11)
,`topic_id` int(11)
,`topicName` longtext
,`course_id` int(11)
,`course_name` varchar(50)
,`level` int(11)
,`rank` int(11)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `v_topic_notdepercated`
--
DROP VIEW IF EXISTS `v_topic_notdepercated`;
CREATE TABLE `v_topic_notdepercated` (
`topic_id` int(11)
,`deprecated` tinyint(1)
,`topicName` longtext
,`topicHeadline` tinytext
,`topicDescription` longtext
,`topicDescriptionSidebar` longtext
,`topicImage` longblob
,`footer` longtext
,`responsibleTrainer_id` int(11)
);

-- --------------------------------------------------------

--
-- Struktur des Views `v_brandtopic`
--
DROP TABLE IF EXISTS `v_brandtopic`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_brandtopic`  AS  select `brand_topic`.`brand_topic_id` AS `brand_topic_id`,`brand_topic`.`brand_id` AS `brand_id`,`brand_topic`.`topic_id` AS `topic_id` from `brand_topic` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_brand__notdepercated_loginnotempty_accesstokennotempty`
--
DROP TABLE IF EXISTS `v_brand__notdepercated_loginnotempty_accesstokennotempty`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_brand__notdepercated_loginnotempty_accesstokennotempty`  AS  select `brand`.`brand_id` AS `brand_id`,`brand`.`event_partner_id` AS `event_partner_id`,`brand`.`brand_name` AS `brand_name`,`brand`.`brandHeadline` AS `brandHeadline`,`brand`.`brandDescription` AS `brandDescription`,`brand`.`brandDescriptionFooter` AS `brandDescriptionFooter`,`brand`.`brandDescriptionSidebar` AS `brandDescriptionSidebar`,`brand`.`brandImage` AS `brandImage`,`brand`.`accesstoken` AS `accesstoken`,`brand`.`login` AS `login`,`brand`.`discount` AS `discount`,`brand`.`css-style` AS `css-style`,`brand`.`deprecated` AS `branddeprecated` from `brand` where ((`brand`.`deprecated` <> '1') and (`brand`.`login` <> '') and (`brand`.`accesstoken` <> '')) ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_course_notdepercated`
--
DROP TABLE IF EXISTS `v_course_notdepercated`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_course_notdepercated`  AS  select `course`.`course_id` AS `course_id`,`course`.`course_name` AS `course_name`,`course`.`number_of_days` AS `number_of_days`,`course`.`internet_course_article_id` AS `internet_course_article_id`,`course`.`min_participants` AS `min_participants`,`course`.`courseHeadline` AS `courseHeadline`,`course`.`courseDescription` AS `courseDescription`,`course`.`courseDescriptionMail` AS `courseDescriptionMail`,`course`.`coursePrice` AS `coursePrice`,`course`.`courseDescriptionCertificate` AS `courseDescriptionCertificate` from `course` where (`course`.`deprecated` <> '1') ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`
--
DROP TABLE IF EXISTS `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew`  AS  select `event`.`event_id` AS `event_id`,`event`.`start_date` AS `start_date`,`event`.`finish_date` AS `finish_date`,`event`.`start_time` AS `start_time`,`event`.`finish_time` AS `finish_time`,`course`.`course_id` AS `course_id`,`course`.`course_name` AS `course_name`,`course`.`test` AS `test`,`course`.`deprecated` AS `coursedeprecated`,`course`.`max_participants` AS `courseMaxParticipants`,`location`.`location_id` AS `location_id`,`location`.`location_name` AS `location_name`,`location`.`internet_location_name` AS `internet_location_name`,`location`.`location_description` AS `location_description`,`location`.`max_participants` AS `locationMaxParticipants`,`event`.`event_status_id` AS `event_status_id`,`event`.`eventguaranteestatus` AS `eventguaranteestatus`,`event`.`inhouse` AS `eventinhouse` from ((`event` join `course`) join `location`) where ((`event`.`course_id` = `course`.`course_id`) and (`event`.`location_id` = `location`.`location_id`) and (`course`.`deprecated` <> '1') and (`event`.`start_date` >= cast(now() as date)) and (`event`.`inhouse` <> '1') and (`event`.`event_status_id` <> '6') and (`event`.`event_status_id` <> '1')) order by `event`.`start_date`,`event`.`finish_date` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_participationevent_count_futurepublicnotstornonotnew`
--
DROP TABLE IF EXISTS `v_participationevent_count_futurepublicnotstornonotnew`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_participationevent_count_futurepublicnotstornonotnew`  AS  select `participation`.`event_id` AS `event_id`,count(0) AS `count`,`participation`.`status_participation_id` AS `status_participation_id`,`status_participation`.`status_participation` AS `status_participation_name`,`course`.`min_participants` AS `courseMinParticipants`,`course`.`max_participants` AS `courseMaxParticipants`,`location`.`max_participants` AS `locationMaxParticipants` from ((((`participation` join `status_participation`) join `event`) join `course`) join `location`) where ((`participation`.`status_participation_id` = `status_participation`.`status_participation_id`) and (`event`.`event_id` = `participation`.`event_id`) and (`event`.`course_id` = `course`.`course_id`) and (`event`.`location_id` = `location`.`location_id`) and (`event`.`start_date` >= cast(now() as date)) and (`event`.`inhouse` <> '1') and (`event`.`event_status_id` <> '6') and (`event`.`event_status_id` <> '1')) group by `participation`.`event_id`,`participation`.`status_participation_id` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_statusevent`
--
DROP TABLE IF EXISTS `v_statusevent`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_statusevent`  AS  select `status_event`.`status_event_id` AS `status_event_id`,`status_event`.`status_event` AS `status_event` from `status_event` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_statuseventguarantee`
--
DROP TABLE IF EXISTS `v_statuseventguarantee`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_statuseventguarantee`  AS  select `status_eventguarantee`.`ID` AS `ID`,`status_eventguarantee`.`eventguaranteestatus` AS `eventguaranteestatus` from `status_eventguarantee` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_statustrainer`
--
DROP TABLE IF EXISTS `v_statustrainer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_statustrainer`  AS  select `status_trainer`.`status_trainer_id` AS `status_trainer_id`,`status_trainer`.`status_trainer` AS `status_trainer` from `status_trainer` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_testcourse`
--
DROP TABLE IF EXISTS `v_testcourse`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_testcourse`  AS  select `course_test`.`course_test_id` AS `course_id`,`course_test`.`test_id` AS `test_id` from `course_test` ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_topiccourse_notdepercatedlevelnotzero`
--
DROP TABLE IF EXISTS `v_topiccourse_notdepercatedlevelnotzero`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_topiccourse_notdepercatedlevelnotzero`  AS  select `tc`.`topic_course_id` AS `topic_course_id`,`tc`.`topic_id` AS `topic_id`,`t`.`topicName` AS `topicName`,`tc`.`course_id` AS `course_id`,`c`.`course_name` AS `course_name`,`tc`.`level` AS `level`,`tc`.`rank` AS `rank` from ((`topic_course` `tc` left join `course` `c` on((`tc`.`course_id` = `c`.`course_id`))) left join `topic` `t` on((`tc`.`topic_id` = `t`.`topic_id`))) where ((`c`.`deprecated` <> '1') and (`tc`.`level` <> '0')) ;

-- --------------------------------------------------------

--
-- Struktur des Views `v_topic_notdepercated`
--
DROP TABLE IF EXISTS `v_topic_notdepercated`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_topic_notdepercated`  AS  select `topic`.`topic_id` AS `topic_id`,`topic`.`deprecated` AS `deprecated`,`topic`.`topicName` AS `topicName`,`topic`.`topicHeadline` AS `topicHeadline`,`topic`.`topicDescription` AS `topicDescription`,`topic`.`topicDescriptionSidebar` AS `topicDescriptionSidebar`,`topic`.`topicImage` AS `topicImage`,`topic`.`topicDescriptionFooter` AS `footer`,`topic`.`responsibleTrainer_id` AS `responsibleTrainer_id` from `topic` where (`topic`.`deprecated` <> '1') ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`),
  ADD UNIQUE KEY `brand_name` (`brand_name`);

--
-- Indizes für die Tabelle `brand_location`
--
ALTER TABLE `brand_location`
  ADD PRIMARY KEY (`brand_location_id`),
  ADD KEY `location_id_1_idx` (`location_id`),
  ADD KEY `brand_id_4_idx` (`brand_id`);

--
-- Indizes für die Tabelle `brand_topic`
--
ALTER TABLE `brand_topic`
  ADD PRIMARY KEY (`brand_topic_id`),
  ADD KEY `brand_id_5_idx` (`brand_id`),
  ADD KEY `topic_id_4_idx` (`topic_id`);

--
-- Indizes für die Tabelle `candidate_selection`
--
ALTER TABLE `candidate_selection`
  ADD PRIMARY KEY (`candidate_selection_id`);

--
-- Indizes für die Tabelle `contact_channel`
--
ALTER TABLE `contact_channel`
  ADD PRIMARY KEY (`contact_channel_id`);

--
-- Indizes für die Tabelle `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_name` (`course_name`);

--
-- Indizes für die Tabelle `course_test`
--
ALTER TABLE `course_test`
  ADD PRIMARY KEY (`course_test_id`),
  ADD KEY `course_id_idx` (`course_id`),
  ADD KEY `test_id_idx` (`test_id`);

--
-- Indizes für die Tabelle `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `brand_id` (`brand_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `event_status_id` (`event_status_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `eventguaranteestatus` (`eventguaranteestatus`),
  ADD KEY `status_billing_id` (`status_billing_id`);

--
-- Indizes für die Tabelle `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`event_id`,`feedback_id`);

--
-- Indizes für die Tabelle `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`gender_id`),
  ADD UNIQUE KEY `gender` (`gender`);

--
-- Indizes für die Tabelle `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`),
  ADD UNIQUE KEY `location_name` (`location_name`);

--
-- Indizes für die Tabelle `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`organization_id`),
  ADD UNIQUE KEY `organization_name` (`organization_name`);

--
-- Indizes für die Tabelle `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`participant_id`),
  ADD KEY `contact_channelparticipant` (`contact_channel_id`),
  ADD KEY `genderparticipant` (`gender_id`),
  ADD KEY `organization_id` (`organization_id`),
  ADD KEY `status_sales_id` (`status_sales_id`);

--
-- Indizes für die Tabelle `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`event_id`,`participant_id`),
  ADD KEY `participantparticipation` (`participant_id`),
  ADD KEY `status_participantparticipation` (`status_participation_id`),
  ADD KEY `status_billing_id` (`status_billing_id`),
  ADD KEY `status_buch_id` (`status_buch_id`);

--
-- Indizes für die Tabelle `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`registration_id`);

--
-- Indizes für die Tabelle `registration_events`
--
ALTER TABLE `registration_events`
  ADD KEY `registration_id_1_idx` (`registration_id`),
  ADD KEY `event_id_5_idx` (`event_id`);

--
-- Indizes für die Tabelle `status_billing`
--
ALTER TABLE `status_billing`
  ADD PRIMARY KEY (`status_billing_id`),
  ADD UNIQUE KEY `status_billing` (`status_billing`);

--
-- Indizes für die Tabelle `status_buch`
--
ALTER TABLE `status_buch`
  ADD PRIMARY KEY (`status_buch_id`),
  ADD UNIQUE KEY `status_buch` (`status_buch`);

--
-- Indizes für die Tabelle `status_event`
--
ALTER TABLE `status_event`
  ADD PRIMARY KEY (`status_event_id`),
  ADD UNIQUE KEY `status_event` (`status_event`);

--
-- Indizes für die Tabelle `status_eventguarantee`
--
ALTER TABLE `status_eventguarantee`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `eventguaranteestatus` (`eventguaranteestatus`);

--
-- Indizes für die Tabelle `status_participation`
--
ALTER TABLE `status_participation`
  ADD PRIMARY KEY (`status_participation_id`),
  ADD UNIQUE KEY `status_participation` (`status_participation`);

--
-- Indizes für die Tabelle `status_sales`
--
ALTER TABLE `status_sales`
  ADD PRIMARY KEY (`status_sales_id`),
  ADD UNIQUE KEY `status_sales` (`status_sales`);

--
-- Indizes für die Tabelle `status_trainer`
--
ALTER TABLE `status_trainer`
  ADD PRIMARY KEY (`status_trainer_id`),
  ADD UNIQUE KEY `status_trainer` (`status_trainer`);

--
-- Indizes für die Tabelle `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topic_id`);

--
-- Indizes für die Tabelle `topic_course`
--
ALTER TABLE `topic_course`
  ADD PRIMARY KEY (`topic_course_id`),
  ADD KEY `course_id_2_idx` (`course_id`),
  ADD KEY `topic_id_idx` (`topic_id`);

--
-- Indizes für die Tabelle `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`trainer_id`),
  ADD UNIQUE KEY `trainer_name` (`trainer_name`);

--
-- Indizes für die Tabelle `trainer_course`
--
ALTER TABLE `trainer_course`
  ADD PRIMARY KEY (`trainer_course_id`),
  ADD KEY `trainer_id_idx` (`trainer_id`),
  ADD KEY `course_id_3_idx` (`course_id`);

--
-- Indizes für die Tabelle `trainer_event_assignment`
--
ALTER TABLE `trainer_event_assignment`
  ADD PRIMARY KEY (`event_id`,`trainer_id`),
  ADD KEY `eventtrainer_event_assignment` (`event_id`),
  ADD KEY `status_trainertrainer_event_ass` (`trainer_status_id`),
  ADD KEY `trainertrainer_event_assignment` (`trainer_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `brand_location`
--
ALTER TABLE `brand_location`
  MODIFY `brand_location_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `brand_topic`
--
ALTER TABLE `brand_topic`
  MODIFY `brand_topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT für Tabelle `candidate_selection`
--
ALTER TABLE `candidate_selection`
  MODIFY `candidate_selection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;
--
-- AUTO_INCREMENT für Tabelle `contact_channel`
--
ALTER TABLE `contact_channel`
  MODIFY `contact_channel_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=210;
--
-- AUTO_INCREMENT für Tabelle `course_test`
--
ALTER TABLE `course_test`
  MODIFY `course_test_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT für Tabelle `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4326;
--
-- AUTO_INCREMENT für Tabelle `gender`
--
ALTER TABLE `gender`
  MODIFY `gender_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;
--
-- AUTO_INCREMENT für Tabelle `organization`
--
ALTER TABLE `organization`
  MODIFY `organization_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1337;
--
-- AUTO_INCREMENT für Tabelle `participant`
--
ALTER TABLE `participant`
  MODIFY `participant_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6648;
--
-- AUTO_INCREMENT für Tabelle `registration`
--
ALTER TABLE `registration`
  MODIFY `registration_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1603;
--
-- AUTO_INCREMENT für Tabelle `status_billing`
--
ALTER TABLE `status_billing`
  MODIFY `status_billing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `status_buch`
--
ALTER TABLE `status_buch`
  MODIFY `status_buch_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `status_event`
--
ALTER TABLE `status_event`
  MODIFY `status_event_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `status_eventguarantee`
--
ALTER TABLE `status_eventguarantee`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `status_participation`
--
ALTER TABLE `status_participation`
  MODIFY `status_participation_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `status_sales`
--
ALTER TABLE `status_sales`
  MODIFY `status_sales_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT für Tabelle `status_trainer`
--
ALTER TABLE `status_trainer`
  MODIFY `status_trainer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT für Tabelle `topic`
--
ALTER TABLE `topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT für Tabelle `trainer`
--
ALTER TABLE `trainer`
  MODIFY `trainer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `brand_location`
--
ALTER TABLE `brand_location`
  ADD CONSTRAINT `brand_id_4` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `location_id_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `brand_topic`
--
ALTER TABLE `brand_topic`
  ADD CONSTRAINT `brand_id_5` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `topic_id_4` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `course_test`
--
ALTER TABLE `course_test`
  ADD CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `test_id` FOREIGN KEY (`test_id`) REFERENCES `course` (`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `courseevent` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_3` FOREIGN KEY (`eventguaranteestatus`) REFERENCES `status_eventguarantee` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `event_ibfk_4` FOREIGN KEY (`status_billing_id`) REFERENCES `status_billing` (`status_billing_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `status_eventevent` FOREIGN KEY (`event_status_id`) REFERENCES `status_event` (`status_event_id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `eventfeedback` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `participant_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `participant_ibfk_3` FOREIGN KEY (`contact_channel_id`) REFERENCES `contact_channel` (`contact_channel_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `participant_ibfk_4` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`organization_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `participant_ibfk_6` FOREIGN KEY (`status_sales_id`) REFERENCES `status_sales` (`status_sales_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`participant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participation_ibfk_3` FOREIGN KEY (`status_participation_id`) REFERENCES `status_participation` (`status_participation_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `participation_ibfk_4` FOREIGN KEY (`status_billing_id`) REFERENCES `status_billing` (`status_billing_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `participation_ibfk_5` FOREIGN KEY (`status_buch_id`) REFERENCES `status_buch` (`status_buch_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints der Tabelle `registration_events`
--
ALTER TABLE `registration_events`
  ADD CONSTRAINT `event_id_5` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `registration_id_1` FOREIGN KEY (`registration_id`) REFERENCES `registration` (`registration_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `topic_course`
--
ALTER TABLE `topic_course`
  ADD CONSTRAINT `course_id_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `trainer_course`
--
ALTER TABLE `trainer_course`
  ADD CONSTRAINT `course_id_3` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `trainer_event_assignment`
--
ALTER TABLE `trainer_event_assignment`
  ADD CONSTRAINT `eventtrainer_event_assignment` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `status_trainertrainer_event_assignment` FOREIGN KEY (`trainer_status_id`) REFERENCES `status_trainer` (`status_trainer_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `trainertrainer_event_assignment` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
