#Convert schema EDUMS Version '20151223' to Version '20160107';

	BEGIN;

SET foreign_key_checks=0;

	ALTER TABLE `bpmspace_edums`.`anmeldungen` 
	RENAME TO  `bpmspace_edums`.`registration` ;
	
	ALTER TABLE `bpmspace_edums`.`registration` 
	CHANGE COLUMN `id` `registration_id` INT(11) NOT NULL ,
	CHANGE COLUMN `anm_datum` `registration_date` DATETIME NULL ,
	CHANGE COLUMN `kdnr` `customer_id` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `paket` `package` TINYTEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `ansprechpartner` `contact_person` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `email_ap` `email_contact_person` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `firma` `company` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `strasse` `street` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `plzort` `city` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `land` `country` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `teltag` `phone_day` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `telhandy` `phone_mobile` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn1_name` `participant1_name` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn1_email` `participant_email` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn2_name` `participant2_name` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn2_email` `participant2_email` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn3_name` `participant3_name` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `tn3_email` `participant3_email` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `zus_infos` `additional_information` TEXT NULL DEFAULT NULL ,
	CHANGE COLUMN `pruefung` `test` TINYINT(1) NULL DEFAULT NULL ,
	ADD COLUMN `postcode` INT NULL AFTER `street`

	
	CREATE TABLE brand_location (
	  brand_location_id integer(11) NOT NULL auto_increment,
	  location_id integer(11) NOT NULL,
	  brand_id integer(11) NOT NULL,
	  INDEX location_id_1_idx (location_id),
	  INDEX brand_id_4_idx (brand_id),
	  PRIMARY KEY (brand_location_id),
	  CONSTRAINT brand_id_4 FOREIGN KEY (brand_id) REFERENCES brand (brand_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT location_id_1 FOREIGN KEY (location_id) REFERENCES location (location_id) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;

	CREATE TABLE brand_topic (
	  brand_topic_id integer(11) NOT NULL auto_increment,
	  brand_id integer(11) NOT NULL,
	  topic_id integer(11) NOT NULL,
	  INDEX brand_id_5_idx (brand_id),
	  INDEX topic_id_4_idx (topic_id),
	  PRIMARY KEY (brand_topic_id),
	  CONSTRAINT brand_id_5 FOREIGN KEY (brand_id) REFERENCES brand (brand_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT topic_id_4 FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARACTER SET utf8;

	CREATE TABLE course_test (
	  course_test_id integer(11) NOT NULL auto_increment,
	  course_id integer(11) DEFAULT NULL,
	  test_id integer(11) DEFAULT NULL,
	  INDEX course_id_idx (course_id),
	  INDEX test_id_idx (test_id),
	  PRIMARY KEY (course_test_id),
	  CONSTRAINT course_id FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT test_id FOREIGN KEY (test_id) REFERENCES course (course_id) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;


	CREATE TABLE trainer_course (
	  trainer_course_id integer(11) NOT NULL,
	  trainer_id integer(11) DEFAULT NULL,
	  course_id integer(11) DEFAULT NULL,
	  INDEX trainer_id_idx (trainer_id),
	  INDEX course_id_3_idx (course_id),
	  PRIMARY KEY (trainer_course_id),
	  CONSTRAINT course_id_3 FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT trainer_id FOREIGN KEY (trainer_id) REFERENCES trainer (trainer_id) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;
	
	
	CREATE TABLE topic_course (
	  topic_course_id integer(11) NOT NULL,
	  topic_id integer(11) DEFAULT NULL,
	  course_id integer(11) DEFAULT NULL,
	  INDEX course_id_2_idx (course_id),
	  INDEX topic_id_idx (topic_id),
	  PRIMARY KEY (topic_course_id),
	  CONSTRAINT course_id_2 FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	  CONSTRAINT topic_id FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE NO ACTION ON UPDATE NO ACTION
	) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;
	
	ALTER TABLE package CHANGE COLUMN package_name package_name longtext NOT NULL,
                    ADD INDEX topic_id_2_idx (topic_id),
                    ADD CONSTRAINT topic_id_2 FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
                    ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARACTER SET utf8;
	
	SET foreign_key_checks=1;

	ALTER TABLE brand ADD COLUMN brand_description longtext,
					  ADD COLUMN brand_description_footer longtext;

	ALTER TABLE course ADD COLUMN course_price integer(10) DEFAULT NULL,
					   ADD COLUMN course_certificate_desc varchar(45) DEFAULT NULL;

	ALTER TABLE location ADD COLUMN location_mail_desc tinytext,
						 ADD COLUMN favourite integer(11) DEFAULT NULL;

	ALTER TABLE topic CHANGE COLUMN topic_name topic_name longtext NOT NULL,
					  ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARACTER SET utf8;

	DROP TABLE brand_location_limit;

	DROP TABLE brand_topic_limit;

	DROP TABLE course_course;


COMMIT;




