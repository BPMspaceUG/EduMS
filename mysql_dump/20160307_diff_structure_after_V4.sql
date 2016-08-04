ALTER TABLE `brand` 
ADD COLUMN `imprint` LONGTEXT NULL AFTER `brandDescriptionSidebar`,
ADD COLUMN `protection of data privacy` LONGTEXT NULL AFTER `imprint`,
ADD COLUMN `terms and conditions` LONGTEXT NULL AFTER `protection of data privacy`,
ADD COLUMN `email` VARCHAR(99) NULL AFTER `terms and conditions`;
ALTER TABLE `topic` 
CHANGE COLUMN `topicImage` `topicImage` LONGTEXT NULL DEFAULT NULL ;


