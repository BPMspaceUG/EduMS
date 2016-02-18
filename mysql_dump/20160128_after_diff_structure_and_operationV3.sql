ALTER TABLE `package` CHANGE `package_description` `package_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `footer` `footer` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `topic_description` `topic_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_descrition` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;

SET foreign_key_checks=0;
ALTER TABLE `registration` CHANGE COLUMN `registration_id` `registration_id` INT(11) NOT NULL AUTO_INCREMENT ;

--- davor unbedingt die Tabellen topic und topic_course leeren. Sonst müsste Copy&Paste klappen
--- 1.Einstellung in Workbensch ändern: Preferences -> SQL-Editor -> "Safe Updates..." Haken rausgenommen
--- reconnect MySQL Workbench

--- 2. Key-Löschweitergabe
ALTER TABLE `bpmspace_edums_v3`.`package` 
DROP FOREIGN KEY `topic_id_2`;
ALTER TABLE `bpmspace_edums_v3`.`package` 
ADD CONSTRAINT `topic_id_2`
  FOREIGN KEY (`topic_id`)
  REFERENCES `bpmspace_edums_v3`.`topic` (`topic_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `bpmspace_edums_v3`.`package` 
DROP FOREIGN KEY `topicid_fk`;
ALTER TABLE `bpmspace_edums_v3`.`package` 
ADD CONSTRAINT `topicid_fk`
  FOREIGN KEY (`topic_id`)
  REFERENCES `bpmspace_edums_v3`.`topic` (`topic_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

--- 3. Löschen der Zeilen in topic
DELETE FROM topic;
DELETE FROM topic_course;

-----

ALTER TABLE `topic_course` 
ADD COLUMN `level` INT(11) NULL AFTER `course_id`,
ADD COLUMN `order` INT(11) NULL AFTER `level`;

ALTER TABLE `course` 
CHANGE COLUMN `topic_id` `course_description` MEDIUMTEXT NULL DEFAULT NULL ,
CHANGE COLUMN `course_price` `course_price` FLOAT NULL DEFAULT NULL ,
CHANGE COLUMN `course_certificate_desc` `course_certificate_desc` MEDIUMTEXT NULL DEFAULT NULL ;

ALTER TABLE `trainer` 
ADD COLUMN `deprecated` TINYINT(1) NOT NULL AFTER `trainer_hash`;

UPDATE course SET deprecated = 1 WHERE course_name LIKE 'z_%';
UPDATE location SET deprecated = 1 WHERE location_name LIKE 'Z_%' OR internet_location_name = '_Alt_' OR internet_location_name = '_alt_' OR internet_location_name = '_ALT_' OR internet_location_article_id = '999';
UPDATE trainer SET deprecated = 1 WHERE trainer_name LIKE 'Z_%';

ALTER TABLE `bpmspace_edums_v3`.`topic` 
CHANGE COLUMN `topic_description` `topic_description` LONGTEXT NULL ,
CHANGE COLUMN `sidebar_description` `sidebar_description` LONGTEXT NULL ,
CHANGE COLUMN `footer` `footer` LONGTEXT NULL ,
CHANGE COLUMN `trainer_id` `trainer_id` INT(11) NULL ,
CHANGE COLUMN `deprecated` `deprecated` TINYINT(1) NULL DEFAULT '0' ;


ALTER TABLE `registration` CHANGE COLUMN `participant_email` `participant1_email` TEXT NULL DEFAULT NULL ;


ALTER TABLE topic CHANGE COLUMN topic_description topic_description longtext,
                  CHANGE COLUMN sidebar_description sidebar_description longtext,
                  CHANGE COLUMN footer footer longtext,
                  CHANGE COLUMN trainer_id trainer_id integer(11) DEFAULT NULL,
                  CHANGE COLUMN deprecated deprecated tinyint(1) DEFAULT 0;

SET foreign_key_checks=1;




------------------------Added Views on 4.Feb.16
---Ergänzung von tbl-Topic
ALTER TABLE `topic` ADD `topicHeadline` TINYTEXT NOT NULL AFTER `topic_name`;
ALTER TABLE `topic` ADD `topicImage` MEDIUMBLOB NULL DEFAULT NULL AFTER `sidebar_description`;

---Ergänzung von tbl-Course
ALTER TABLE `course` ADD `courseHeadline` TINYTEXT NOT NULL AFTER `course_name`;
ALTER TABLE `course` ADD `courseImage` MEDIUMBLOB NULL DEFAULT NULL AFTER `course_description`;

---Erzeugung der Views
CREATE VIEW vBrand AS SELECT brand_id, super_brand, brand_name, brand_description, brand_description_footer FROM `brand`;
CREATE VIEW vBrandLocation AS SELECT location_id, brand_id, brand_location_id FROM `brand_location`;
CREATE VIEW vBrandTopic AS SELECT brand_id, topic_id, brand_topic_id FROM `brand_topic`;
CREATE VIEW vCourse AS SELECT course_id, course_name, number_of_days, internet_course_article_id, min_participants, course_description, course_mail_desc, course_price, course_certificate_desc FROM `course` WHERE deprecated = 0;
CREATE VIEW vEvent AS SELECT event_id, event_status_id, course_id, brand_id, start_date, finish_date, start_time, finish_time, inhouse, location_id, eventguaranteestatus FROM `event`;
CREATE VIEW vlocation AS SELECT location_id, location_name, location_description, internet_location_name, internet_location_article_id, location_mail_desc FROM `location` WHERE deprecated = 0;
CREATE VIEW vOrganization AS SELECT organization_id, organization_name, contact_url, address_line_1, address_line_2, city, state, zip, country FROM `organization`;
CREATE VIEW vStatusEvent AS SELECT status_event_id, status_event FROM `status_event`;
CREATE VIEW vStatusEventguarantee AS SELECT ID, eventguaranteestatus FROM `status_eventguarantee`;
CREATE VIEW vStatusTrainer AS SELECT status_trainer_id, status_trainer FROM `status_trainer`;
CREATE VIEW vTopic AS SELECT topic_id, deprecated, topic_name, topicHeadline, topic_description, sidebar_description, topicImage, footer, trainer_id FROM `topic` WHERE deprecated = 0;
CREATE VIEW vTopicCourse AS SELECT 'topic_course_id', 'topic_id', 'course_id', 'level', 'order' FROM `topic_course`;
CREATE VIEW vTrainerEventAssignment AS SELECT event_id, trainer_id, trainer_status_id FROM `trainer_event_assignment`;

---Es werden keine Views für folgende Tabellen erzeugt: 
---> candidate_selection, contact_channel, feedback, gender, package, participant, participation,
---> registration, registration_events, status_billing, status_buch, status_participation, status_sales, 
---> status_sales_interests, trainer, trainer_course


---View für die Anzahl an Participants bei einem Event
USE `bpmspace_edums_v3`;
CREATE  OR REPLACE VIEW `v_countParticipantOnEvent` AS SELECT event_id, count
FROM participation
GROUP BY event_id;

---um 'nur noch x Plätze frei' anzuzeigen
ALTER TABLE `bpmspace_edums_v3`.`event` ADD COLUMN `maxParticipants` INT NULL AFTER `mv_ned`;

--- View mit den für einen Participant relevanten Courseinformationen zukünftiger Kurse
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_futurecourses` AS
    SELECT 
        `e`.`event_id` AS `event_id`,
        `e`.`maxParticipants` AS `maxParticipants`,
        `e`.`start_date` AS `start_date`,
        `e`.`finish_date` AS `finish_date`,
        `l`.`location_name` AS `location_name`,
        `c`.`course_name` AS `course_name`,
        `c`.`course_price` AS `course_price`,
        `t`.`trainer_name` AS `trainer_name`,
        `poe`.`count` AS `partOnEvent`
    FROM
        (((((`event` `e`
        JOIN `location` `l`)
        JOIN `course` `c`)
        JOIN `trainer` `t`)
        JOIN `trainer_event_assignment` `tea`)
        JOIN `v_countparticipantonevent` `poe`)
    WHERE
        ((`e`.`location_id` = `l`.`location_id`)
            AND (`e`.`course_id` = `c`.`course_id`)
            AND (`tea`.`trainer_id` = `t`.`trainer_id`)
            AND (`tea`.`event_id` = `e`.`event_id`)
            AND (`poe`.`event_id` = `e`.`event_id`)
            AND (`e`.`start_date` > NOW()))
    ORDER BY `e`.`start_date`


--- vereinheitlicht 
UPDATE  bpmspace_edums_v3.event SET maxParticipants = 15;

--- poe aus where entfernt
DROP VIEW `bpmspace_edums_v3`.`v_futurecourses`

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_futurecourses` AS
    SELECT 
        `e`.`event_id` AS `event_id`,
        `e`.`maxParticipants` AS `maxParticipants`,
        `e`.`start_date` AS `start_date`,
        `e`.`finish_date` AS `finish_date`,
        `l`.`location_name` AS `location_name`,
        `c`.`course_name` AS `course_name`,
        `c`.`course_price` AS `course_price`,
        `t`.`trainer_name` AS `trainer_name`,
        `poe`.`count` AS `partOnEvent`
    FROM
        (((((`event` `e`
        JOIN `location` `l`)
        JOIN `course` `c`)
        JOIN `trainer` `t`)
        JOIN `trainer_event_assignment` `tea`)
        JOIN `v_countparticipantonevent` `poe`)
    WHERE
        ((`e`.`location_id` = `l`.`location_id`)
            AND (`e`.`course_id` = `c`.`course_id`)
            AND (`tea`.`trainer_id` = `t`.`trainer_id`)
            AND (`tea`.`event_id` = `e`.`event_id`)
            AND (`e`.`start_date` > NOW()))
    ORDER BY `e`.`start_date`


CREATE  OR REPLACE VIEW `v_courseByTopic` AS
SELECT course_name, course_description, courseHeadline, number_of_days, courseImage, course_price, topic_course_id
FROM course, topic_course where deprecated = 0 order by topic_course_id;

USE `bpmspace_edums_v3`;
CREATE  OR REPLACE VIEW `v_topic_courseCourse` AS
SELECT topic_course.topic_id, 
course.course_description, course.course_name,
course.courseHeadline, course.number_of_days,
course.courseImage, course.course_price
FROM topic_course, course
where topic_course.course_id = course.course_id;



USE `bpmspace_edums_v3`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_topic_coursecourse` AS
    SELECT 
        `topic_course`.`topic_id` AS `topic_id`,
        `course`.`course_description` AS `course_description`,
        `course`.`course_name` AS `course_name`,
        `course`.`courseHeadline` AS `courseHeadline`,
        `course`.`number_of_days` AS `number_of_days`,
        `course`.`courseImage` AS `courseImage`,
        `course`.`course_price` AS `course_price`,
        `course`.`course_id` AS `course_id`
    FROM
        (`topic_course`
        JOIN `course`)
    WHERE
        (`topic_course`.`course_id` = `course`.`course_id`);

        USE `bpmspace_edums_v3`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `v_topic_coursecourse` AS
    SELECT 
        `topic_course`.`topic_id` AS `topic_id`,
        `topic_course`.`course_id` AS `tc_course_id`,
        `course`.`course_description` AS `course_description`,
        `course`.`course_name` AS `course_name`,
        `course`.`courseHeadline` AS `courseHeadline`,
        `course`.`number_of_days` AS `number_of_days`,
        `course`.`courseImage` AS `courseImage`,
        `course`.`course_price` AS `course_price`,
        `course`.`course_id` AS `course_id`
    FROM
        (`topic_course`
        JOIN `course`)
    WHERE
        (`topic_course`.`course_id` = `course`.`course_id`);


---general
---Try to limit the name to 50 characters (shorter is better) Avoid using underscores even if the system allows it, except where noted in this document. CamelCase (also camel caps, medial capitals or PascalCase notation achieves the same word separation without them and in fewer characters.
---Use only letters or underscores (try to avoid numbers)
---Use a letter as the first character of the name. (don't start names with underscores or numbers)
---Limit the use of abbreviations (can lead to misinterpretation of names)
---Limit the use of acronyms (some acronyms have more than one meaning e.g. "ASP")
---Make the name readable (they shouldn't sound funny when read aloud).
---Avoid using spaces in names even if the system allows it.
---tables
---
---Table names should be singular
---Don’t use prefixes and abbreviations in Table names
---use CamelCase in Table names
---For table names, underscores should not be used
---n:m tables (Junction/Intersection Tables) should be named by concatenating the names of the tables
---columns
---
---the columns name of the Primary Key Fields should simply be [TableName]_id
---the columns name of the Foreign Key Fields should have the exact same name as they do in the parent table
---don't use the [TableName] in the columns name except in the Primary Key Fields
---do not prefix your columns name with eg. "fld_" or "Col_"
---Bit fields should be given affirmative boolean names like "deprecated"
---views
---
---view names should start with "v_" - While it is pointless to prefix tables, it can be helpful for views.
---view names should be should be different depending on the type or purpose of the view ** 
---views with no join shall have the name of the tabel v_[TableName] ** 
---views with one or more joins shall have the name of all table e.g. v_[TableName][TableName][TableName] ** 
---views with a WHERE statement and/or a selection criteria can have a suffix to specifie the purpose e.g. v_[TableName][TableName]only_ID or v[TableName]_deprecated_true