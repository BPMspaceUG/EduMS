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


USE `bpmspace_edums_v3`;
CREATE  OR REPLACE VIEW `v_countParticipantOnEvent` AS SELECT event_id, count
FROM participation
GROUP BY event_id;

---um 'nur noch x Plätze frei' anzuzeigen
ALTER TABLE `bpmspace_edums_v3`.`event` ADD COLUMN `maxParticipants` INT NULL AFTER `mv_ned`;

--- View mit den für einen Participant relevanten Courseinformationen zukünftiger Kurse
CREATE OR REPLACE VIEW `v_futurecourses` AS
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

CREATE OR REPLACE VIEW `v_futurecourses` AS
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


CREATE OR REPLACE VIEW `v_courseByTopic` AS
SELECT course_name, course_description, courseHeadline, number_of_days, courseImage, course_price, topic_course_id
FROM course, topic_course where deprecated = 0 order by topic_course_id;


CREATE  OR REPLACE VIEW `v_topic_courseCourse` AS
SELECT topic_course.topic_id, 
course.course_description, course.course_name,
course.courseHeadline, course.number_of_days,
course.courseImage, course.course_price
FROM topic_course, course
where topic_course.course_id = course.course_id;


CREATE OR REPLACE VIEW `v_topic_coursecourse` AS
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
CREATE OR REPLACE VIEW `v_topic_coursecourse` AS
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


---Alle Views (18.2.)
CREATE OR REPLACE VIEW `v_all_events` AS
    SELECT 
        `event`.`event_id` AS `event_id`,
        `event`.`start_date` AS `start_date`,
        `event`.`finish_date` AS `finish_date`,
        `event`.`start_time` AS `start_time`,
        `event`.`finish_time` AS `finish_time`,
        `course`.`course_id` AS `course_id`,
        `course`.`course_name` AS `course_name`,
        `course`.`internet_course_article_id` AS `internet_course_article_id`,
        `course`.`test` AS `test`,
        `location`.`internet_location_name` AS `internet_location_name`,
        `location`.`internet_location_article_id` AS `internet_location_article_id`,
        `event`.`event_status_id` AS `event_status_id`,
        `event`.`eventguaranteestatus` AS `eventguaranteestatus`
    FROM
        ((`event`
        JOIN `course`)
        JOIN `location`)
    WHERE
        ((`event`.`course_id` = `course`.`course_id`)
            AND (`event`.`location_id` = `location`.`location_id`))
    ORDER BY `event`.`start_date` , `event`.`finish_date`;


CREATE OR REPLACE VIEW `v_all_events_participant_participation` AS
    SELECT 
        `e`.`event_id` AS `event_id`,
        `e`.`start_date` AS `event_start_date`,
        `c`.`course_name` AS `course_name`,
        `p`.`participant_id` AS `participant_id`,
        `p`.`last_name` AS `last_name`,
        `p`.`first_name` AS `first_name`,
        `p`.`email_address` AS `email_address`,
        `p`.`email_address_2` AS `email_address_2`,
        `p`.`organization_id` AS `organization_id`,
        `t`.`status_participation_id` AS `status_participation_id`,
        `t`.`order_date` AS `order_date`,
        `t`.`comment` AS `comment`,
        `t`.`status_billing_id` AS `status_billing_id`,
        `t`.`invoice_info` AS `invoice_info`
    FROM
        (((`participant` `p`
        JOIN `participation` `t`)
        JOIN `course` `c`)
        JOIN `event` `e`)
    WHERE
        ((`p`.`participant_id` = `t`.`participant_id`)
            AND (`e`.`event_id` = `t`.`event_id`)
            AND (`e`.`course_id` = `c`.`course_id`))
    ORDER BY `p`.`participant_id` DESC;


CREATE OR REPLACE VIEW `v_all_events_web` AS
    SELECT 
        `event`.`event_id` AS `event_id`,
        `event`.`start_date` AS `start_date`,
        `event`.`finish_date` AS `finish_date`,
        `event`.`start_time` AS `start_time`,
        `event`.`finish_time` AS `finish_time`,
        `course`.`course_id` AS `course_id`,
        `course`.`course_name` AS `course_name`,
        `course`.`internet_course_article_id` AS `internet_course_article_id`,
        `course`.`test` AS `test`,
        `location`.`internet_location_name` AS `internet_location_name`,
        `location`.`internet_location_article_id` AS `internet_location_article_id`,
        `event`.`event_status_id` AS `event_status_id`,
        `event`.`eventguaranteestatus` AS `eventguaranteestatus`
    FROM
        ((`event`
        JOIN `course`)
        JOIN `location`)
    WHERE
        ((`event`.`start_date` >= CURDATE())
            AND (`event`.`course_id` = `course`.`course_id`)
            AND (`event`.`location_id` = `location`.`location_id`)
            AND (`event`.`inhouse` = 0)
            AND ((`event`.`event_status_id` = 2)
            OR (`event`.`event_status_id` = 3)))
    ORDER BY `event`.`start_date` , `event`.`finish_date`;


CREATE OR REPLACE VIEW `v_apieventdata` AS
    SELECT 
        `e`.`event_id` AS `event_id`,
        `e`.`course_id` AS `course_id`,
        `e`.`start_date` AS `start_date`,
        `e`.`start_time` AS `start_time`,
        `e`.`finish_date` AS `finish_date`,
        `e`.`finish_time` AS `finish_time`,
        `e`.`location_id` AS `location_id`,
        `c`.`course_name` AS `course_name`,
        `c`.`test` AS `test`,
        `c`.`number_of_days` AS `number_of_days`,
        `l`.`location_name` AS `location_name`,
        `l`.`location_description` AS `location_description`
    FROM
        ((`event` `e`
        LEFT JOIN `course` `c` ON ((`c`.`course_id` = `e`.`course_id`)))
        LEFT JOIN `location` `l` ON ((`l`.`location_id` = `e`.`location_id`)))
    WHERE
        ((`e`.`start_date` > NOW())
            AND (`e`.`inhouse` = 0)
            AND (`c`.`deprecated` = 0))
    ORDER BY `e`.`start_date`;


CREATE OR REPLACE VIEW `v_packageview` AS
    SELECT 
        `topic`.`topic_id` AS `topic_id`,
        `topic`.`topic_name` AS `topic_name`,
        `topic`.`topic_description` AS `topic_description`,
        `package`.`package_id` AS `package_id`,
        `package`.`package_name` AS `package_name`,
        `package`.`package_price` AS `package_price`,
        `package`.`package_discount` AS `package_discount`,
        `package`.`package_description` AS `package_description`
    FROM
        (`topic`
        LEFT JOIN `package` ON ((`package`.`topic_id` = `topic`.`topic_id`)))
    WHERE
        (`package`.`deprecated` <> 1);


CREATE OR REPLACE VIEW `v_countparticipantonevent` AS
    SELECT 
        `participation`.`event_id` AS `event_id`,
        COUNT(0) AS `count`
    FROM
        `participation`
    GROUP BY `participation`.`event_id`;


CREATE OR REPLACE VIEW `v_coursebytopic` AS
    SELECT 
        `topic_course`.`topic_course_id` AS `topic_course_id`,
        `course`.`course_name` AS `course_name`,
        `course`.`course_description` AS `course_description`,
        `course`.`courseHeadline` AS `courseHeadline`,
        `course`.`number_of_days` AS `number_of_days`,
        `course`.`courseImage` AS `courseImage`,
        `course`.`course_price` AS `course_price`
    FROM
        (`course`
        JOIN `topic_course`)
    WHERE
        (`course`.`deprecated` = 0)
    ORDER BY `topic_course`.`topic_course_id`;

CREATE OR REPLACE VIEW `v_futurecourses` AS
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
    ORDER BY `e`.`start_date`;


CREATE OR REPLACE VIEW `v_topic_coursecourse` AS
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


CREATE OR REPLACE VIEW `v_brand` AS
    SELECT 
        `brand`.`brand_id` AS `brand_id`,
        `brand`.`super_brand` AS `super_brand`,
        `brand`.`brand_name` AS `brand_name`,
       `brand`.`brand_description` AS `brand_description`,
        `brand`.`brand_description_footer` AS `brand_description_footer`,
        `brand`.`accesstoken` AS `accesstoken`,
        `brand`.`login` AS `login`,
        `brand`.`discount` AS `discount`
        
    FROM
        `brand`;

CREATE OR REPLACE VIEW v_brandLocation AS SELECT location_id, brand_id, brand_location_id FROM `brand_location`;
CREATE OR REPLACE VIEW v_brandTopic AS SELECT brand_id, topic_id, brand_topic_id FROM `brand_topic`;
CREATE OR REPLACE VIEW v_course AS SELECT course_id, course_name, number_of_days, internet_course_article_id, min_participants, course_description, course_mail_desc, course_price, course_certificate_desc FROM `course` WHERE deprecated = 0;
CREATE OR REPLACE VIEW v_event AS SELECT event_id, event_status_id, course_id, brand_id, start_date, finish_date, start_time, finish_time, inhouse, location_id, eventguaranteestatus FROM `event`;
CREATE OR REPLACE VIEW v_location AS SELECT location_id, location_name, location_description, internet_location_name, internet_location_article_id, location_mail_desc FROM `location` WHERE deprecated = 0;
CREATE OR REPLACE VIEW v_organization AS SELECT organization_id, organization_name, contact_url, address_line_1, address_line_2, city, state, zip, country FROM `organization`;
CREATE OR REPLACE VIEW v_statusEvent AS SELECT status_event_id, status_event FROM `status_event`;
CREATE OR REPLACE VIEW v_statusEventguarantee AS SELECT ID, eventguaranteestatus FROM `status_eventguarantee`;
CREATE OR REPLACE VIEW v_statusTrainer AS SELECT status_trainer_id, status_trainer FROM `status_trainer`;
CREATE OR REPLACE VIEW v_topic AS SELECT topic_id, deprecated, topic_name, topicHeadline, topic_description, sidebar_description, topicImage, footer, trainer_id FROM `topic` WHERE deprecated = 0;
CREATE OR REPLACE VIEW v_topicCourse AS SELECT 'topic_course_id', 'topic_id', 'course_id', 'level', 'order' FROM `topic_course`;
CREATE OR REPLACE VIEW v_trainerEventAssignment AS SELECT event_id, trainer_id, trainer_status_id FROM `trainer_event_assignment`;






---Change Rob (23.2.)
ALTER TABLE brand CHANGE COLUMN `style` `css-style` LONGTEXT NULL DEFAULT NULL ;
ALTER TABLE brand CHANGE COLUMN `super_brand` `event_partner_id` INT(11) NOT NULL ;
---Ergänzung Cedric
CREATE OR REPLACE VIEW `v_brand` AS
    SELECT 
        `brand`.`brand_id` AS `brand_id`,
        `brand`.`event_partner_id` AS `event_partner_id`,
        `brand`.`brand_name` AS `brand_name`,
        `brand`.`brand_description` AS `brand_description`,
        `brand`.`brand_description_footer` AS `brand_description_footer`,
        `brand`.`accesstoken` AS `accesstoken`,
        `brand`.`login` AS `login`,
        `brand`.`discount` AS `discount`,
        `brand`.`css-style` AS `css-style`        
    FROM
        `brand` 