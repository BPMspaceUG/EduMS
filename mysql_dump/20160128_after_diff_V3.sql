ALTER TABLE `package` CHANGE `package_description` `package_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `footer` `footer` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `topic_description` `topic_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_descrition` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `registration` CHANGE COLUMN `registration_id` `registration_id` INT(11) NOT NULL AUTO_INCREMENT ;

--- davor unbedingt die Tabellen topic und topic_course leeren. Sonst müsste Copy&Paste klappen
--- 1.Einstellung in Workbensch ändern: Preferences -> SQL-Editor -> "Safe Updates..." Haken rausgenommen

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
UPDATE location SET deprecated = 1 WHERE location_name LIKE 'Z_%' OR internet_location_name = '_Alt_' OR internet_location_name = '_alt_' OR internet_location_name = '_ALT_' OR internet_location_article_id = '999'

