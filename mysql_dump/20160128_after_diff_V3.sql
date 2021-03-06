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


INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('1', 'Topic 1');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('2', 'Topic 2');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('3', 'Topic 3');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('4', 'Topic 4');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('5', 'Topic 5');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('6', 'Topic 6');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('7', 'Topic 7');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('8', 'Topic 8');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('9', 'Topic 9');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('10', 'Topic 10');
INSERT INTO `topic` (`topic_id`, `topic_name`) VALUES ('11', 'Topic 11');
UPDATE `topic` SET `trainer_id`='14' WHERE `topic_id`='1';
UPDATE `topic` SET `trainer_id`='25' WHERE `topic_id`='2';
UPDATE `topic` SET `trainer_id`='39' WHERE `topic_id`='3';
UPDATE `topic` SET `trainer_id`='38' WHERE `topic_id`='4';
UPDATE `topic` SET `trainer_id`='14' WHERE `topic_id`='5';
UPDATE `topic` SET `trainer_id`='38' WHERE `topic_id`='6';
UPDATE `topic` SET `trainer_id`='38' WHERE `topic_id`='7';
UPDATE `topic` SET `trainer_id`='1' WHERE `topic_id`='8';
UPDATE `topic` SET `trainer_id`='14' WHERE `topic_id`='9';
UPDATE `topic` SET `trainer_id`='14' WHERE `topic_id`='10';
UPDATE `topic` SET `trainer_id`='1' WHERE `topic_id`='11';

INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('1','1','1');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('2','1','2');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('3','1','3');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('4','1','4');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('5','1','5');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('6','1','6');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('7','1','7');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('8','1','8');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('9','1','9');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('10','1','10');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('11','9','11');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('12','10','12');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('13','10','13');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('20','1','20');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('21','10','21');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('22','10','22');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('23','10','23');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('24','10','24');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('25','10','25');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('26','1','26');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('27','1','27');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('28','1','28');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('29','1','29');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('30','1','30');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('31','1','31');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('32','10','32');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('33','10','33');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('34','10','34');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('35','10','35');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('36','1','36');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('37','1','37');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('38','1','38');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('39','10','39');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('40','1','40');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('41','1','41');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('42','1','42');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('43','1','43');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('44','1','44');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('45','1','45');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('46','1','46');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('47','1','47');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('48','10','48');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('49','10','49');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('50','10','50');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('51','10','51');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('52','10','52');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('53','6','53');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('54','6','54');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('55','6','55');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('56','10','56');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('57','10','57');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('58','6','58');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('59','6','59');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('60','6','60');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('61','6','61');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('62','6','62');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('63','6','63');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('64','6','64');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('65','6','65');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('66','6','66');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('67','6','67');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('68','1','68');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('69','1','69');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('70','1','70');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('71','1','71');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('72','1','72');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('73','1','73');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('74','1','74');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('75','1','75');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('76','1','76');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('77','1','77');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('78','1','78');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('79','1','79');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('80','1','80');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('81','1','81');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('82','1','82');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('83','1','83');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('84','1','84');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('85','1','85');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('86','1','86');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('87','1','87');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('88','6','88');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('89','5','89');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('90','5','90');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('91','5','91');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('92','5','92');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('93','5','93');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('94','5','94');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('95','6','95');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('96','6','96');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('97','6','97');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('98','6','98');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('99','6','99');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('100','1','100');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('101','6','101');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('102','6','102');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('103','2','103');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('104','2','104');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('105','2','105');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('106','2','106');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('107','2','107');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('108','2','108');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('109','2','109');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('110','2','110');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('111','5','111');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('112','5','112');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('113','1','113');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('114','1','114');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('115','10','115');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('116','10','116');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('117','5','117');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('118','5','118');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('119','1','119');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('120','1','120');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('121','10','121');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('122','10','122');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('123','2','123');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('124','2','124');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('125','10','125');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('126','10','126');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('127','8','127');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('128','8','128');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('129','4','129');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('130','4','130');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('131','8','131');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('132','8','132');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('133','4','133');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('134','4','134');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('135','11','135');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('136','11','136');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('137','1','137');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('138','1','138');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('139','2','139');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('140','2','140');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('141','10','141');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('142','4','142');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('143','4','143');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('144','4','144');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('145','4','145');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('146','5','146');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('147','5','147');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('148','5','148');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('149','5','149');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('150','2','150');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('151','2','151');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('152','9','152');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('153','9','153');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('154','8','154');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('155','8','155');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('156','9','156');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('157','9','157');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('158','2','158');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('159','2','159');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('160','10','160');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('161','1','161');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('162','10','162');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('163','10','163');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('164','10','164');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('165','10','165');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('166','10','166');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('167','3','167');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('168','3','168');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('169','2','169');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('170','2','170');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('171','7','171');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('172','7','172');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('173','7','173');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('174','7','174');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('175','7','175');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('176','7','176');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('177','7','177');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('178','7','178');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('179','4','179');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('180','4','180');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('181','3','181');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('182','3','182');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('183','3','183');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('184','3','184');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('185','3','185');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('186','3','186');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('187','3','187');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('188','3','188');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('189','1','189');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('190','1','190');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('191','1','191');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('192','1','192');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('193','11','193');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('194','7','194');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('195','7','195');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('196','7','196');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('197','7','197');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('198','7','198');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('199','7','199');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('200','7','200');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('201','7','201');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('202','6','202');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('203','6','203');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('204','6','204');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('205','6','205');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('206','6','206');
INSERT INTO `topic_course` (`topic_course_id`, `topic_id`, `course_id`) VALUES ('207','6','207');

UPDATE `topic` SET `topic_description`='Topic Description 1 Bavaria ipsum dolor sit amet Stubn mei muass koa Biaschlegl. Weida Guglhupf Schaung kost nix, Brotzeit auf’d Schellnsau. Koa Engelgwand muass Guglhupf nix Gwiass woass ma ned, Watschnbaam. I mog di fei Auffisteign nia need i moan scho aa gar nia need i mog di fei mim Radl foahn zwoa heid gfoids ma sagrisch guad hob eam. Wui i bin a woschechta Bayer Almrausch, da Gschicht geh kimmt i mechad dee Schwoanshaxn.' WHERE `topic_id`='1';
UPDATE `topic` SET `topic_description`='Topic Descpription 2 Gscheckate Goaßmaß gor is nia Steckerleis hea. Semmlkneedl trihöleridi dijidiholleri sog i lem und lem lossn Gschicht vui a Maß und no a Maß i sog ja nix, i red ja bloß am acht’n Tag schuf Gott des Bia. No a Maß Schaung kost nix kloan unbandig mehra baddscher a Biagadn hogg ma uns zamm. Wolpern wia luja Lewakaas du dadst ma scho daugn oans scheans muass om auf’n Gipfe do. Oachkatzlschwoaf ned woar oans fensdaln da Kini im Beidl, auf’d Schellnsau fensdaln Biazelt.' WHERE `topic_id`='2';
UPDATE `topic` SET `topic_description`='Topic Descpription 3 Resch Woibbadinga und hob Schbozal Griasnoggalsubbm, Bussal griaß God beinand Brodzeid a liabs Deandl ozapfa. De a nimma, anbandeln Resi! Sauba nimma an Engelgwand Biaschlegl nomoi middn Buam wia! Zidern barfuaßat dahoam Prosd. Iabaroi Meidromml Schneid mechad, oa! Milli scheans i moan oiwei oa Schorsch. Gar nia need Marei Obazda, des wiad a Mordsgaudi! Brotzeit abfieseln singan a ganze Hoiwe, i mog di fei vui a.' WHERE `topic_id`='3';
UPDATE `topic` SET `topic_description`='Topic Descpription 4 ' WHERE `topic_id`='4';
UPDATE `topic` SET `topic_description`='Topic Descpription 5 Boarischer obandeln Brezn ned woar jo mei is des schee heitzdog Schmankal. Wann griagd ma nacha wos z’dringa resch Schuabladdla samma mechad. Imma i mechad dee Schwoanshaxn des is a gmahde Wiesn, Schneid oa oa Kuaschwanz Klampfn Reiwadatschi i moan scho aa. Nois is ma Wuascht Bussal midanand Ohrwaschl Fingahaggln, a so a Schmarn Resi.' WHERE `topic_id`='5';
UPDATE `topic` SET `topic_description`='Topic Descpription 6 ' WHERE `topic_id`='6';
UPDATE `topic` SET `topic_description`='Topic Descpription 7 ' WHERE `topic_id`='7';
UPDATE `topic` SET `topic_description`='Topic Descpription 8 ' WHERE `topic_id`='8';
UPDATE `topic` SET `topic_description`='Topic Descpription 9 ' WHERE `topic_id`='9';
UPDATE `topic` SET `topic_description`='Topic Descpription 10 Hob i an Suri gwiss kloan anbandeln? Fünferl Biawambn a Prosit der Gmiadlichkeit so auszutzeln schüds nei luja, hod des is schee gar nia need ghupft wia gsprunga. Zua Wiesn gwihss, heid no a Maß hea Hendl. A ganze Hoiwe Leonhardifahrt sauba mi, kimmt zünftig moand Griasnoggalsubbm gwiss Klampfn woaß. Gfreit mi vasteh is Kuaschwanz Heimatland, gwihss: Hallelujah sog i, luja Kaiwe resch blärrd midanand spernzaln: Kaiwe nois resch naa hoam Weißwiaschd. Mamalad resch mechad ma. Ham ma nia nomoi nimma auffi gwihss. Maderln middn sauba Kirwa. Nix Gwiass woass ma ned wiavui fei Brotzeit umananda trihöleridi dijidiholleri af. Baamwach hogg di hera Leonhardifahrt Kirwa hoam Semmlkneedl di.' WHERE `topic_id`='10';

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

---Dummydaten
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='137';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='138';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='7' WHERE `event_id`='139';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='8' WHERE `event_id`='140';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='8' WHERE `event_id`='141';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='142';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='7' WHERE `event_id`='143';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='67' WHERE `event_id`='144';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='67' WHERE `event_id`='145';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='76' WHERE `event_id`='146';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='147';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='65' WHERE `event_id`='148';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='149';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='150';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='151';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='152';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='67' WHERE `event_id`='153';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='8' WHERE `event_id`='154';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='55' WHERE `event_id`='155';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='58' WHERE `event_id`='156';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='157';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='158';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='159';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='160';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='161';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='7' WHERE `event_id`='162';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='163';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='164';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='165';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='7' WHERE `event_id`='166';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='167';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='168';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='56' WHERE `event_id`='169';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='7' WHERE `event_id`='170';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='171';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='56' WHERE `event_id`='172';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='173';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='174';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='175';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='176';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='177';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='178';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='456' WHERE `event_id`='179';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='181';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='555' WHERE `event_id`='182';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='44' WHERE `event_id`='183';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='184';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='185';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='186';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='187';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='188';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='189';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='190';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='191';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='192';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='193';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='44' WHERE `event_id`='194';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='195';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='196';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='197';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='46' WHERE `event_id`='198';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='199';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='200';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='201';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='202';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='203';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='204';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='209';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='65' WHERE `event_id`='212';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='65' WHERE `event_id`='213';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='214';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='215';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='216';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='217';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='218';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='220';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='221';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='224';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='225';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='226';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='227';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='228';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='229';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='64' WHERE `event_id`='230';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='57' WHERE `event_id`='232';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='565' WHERE `event_id`='234';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='565' WHERE `event_id`='235';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='236';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4647' WHERE `event_id`='237';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='755' WHERE `event_id`='238';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='239';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='240';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='241';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='242';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='446' WHERE `event_id`='244';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='245';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='246';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='247';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='44' WHERE `event_id`='249';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='250';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='251';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='252';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6546' WHERE `event_id`='253';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='254';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='256';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='257';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='258';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='6' WHERE `event_id`='259';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='464' WHERE `event_id`='260';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='643534' WHERE `event_id`='261';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='545' WHERE `event_id`='262';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='453' WHERE `event_id`='263';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='43' WHERE `event_id`='264';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='33' WHERE `event_id`='265';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='266';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='267';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='268';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='269';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='270';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345' WHERE `event_id`='271';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='272';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='273';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='274';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345' WHERE `event_id`='275';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='276';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4534' WHERE `event_id`='277';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='278';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345' WHERE `event_id`='279';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='280';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='282';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345345' WHERE `event_id`='283';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345' WHERE `event_id`='284';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='34' WHERE `event_id`='285';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='286';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='534543' WHERE `event_id`='287';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='288';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='289';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='33' WHERE `event_id`='290';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='291';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='345' WHERE `event_id`='292';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='293';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='43' WHERE `event_id`='294';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='295';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='43' WHERE `event_id`='296';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='297';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='43' WHERE `event_id`='298';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='299';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='300';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='302';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='304';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='305';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='43' WHERE `event_id`='306';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='307';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='53' WHERE `event_id`='308';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='310';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='311';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='313';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='314';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='315';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='316';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4' WHERE `event_id`='317';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='319';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='321';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='322';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='323';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='34' WHERE `event_id`='324';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='53' WHERE `event_id`='325';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='326';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='327';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='45' WHERE `event_id`='328';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='329';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='4262' WHERE `event_id`='330';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='2' WHERE `event_id`='332';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='275424' WHERE `event_id`='333';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='23453542' WHERE `event_id`='335';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='5' WHERE `event_id`='336';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='339';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='340';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='341';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='342';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='343';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='344';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='345';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='346';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='347';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='348';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='349';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='350';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='351';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='352';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='353';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='354';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='355';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='356';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='357';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='358';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='359';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='360';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='367';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='368';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='369';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='370';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='371';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='372';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='373';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='374';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='375';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='376';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='377';
UPDATE `bpmspace_edums_v3`.`event` SET `maxParicipants`='3' WHERE `event_id`='378';

--- vereinheitlicht 
UPDATE  bpmspace_edums_v3.event SET maxParticipants = 5;

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
