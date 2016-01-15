-- Convert schema 'bpmspace_edums_no_datae.sql' to '20151227_dump_bwng_structure_no_data.sql':;

BEGIN;

SET foreign_key_checks=0;


CREATE TABLE registration_events (
  registration_id integer(11) DEFAULT NULL,
  event_id integer(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8;

CREATE TABLE candidate_selection (
  candidate_selection_id integer(11) NOT NULL auto_increment,
  name varchar(250) DEFAULT NULL,
  sql_query text,
  visited_courses text,
  not_visited_courses text,
  z_candidates tinyint(4) DEFAULT NULL,
  joomla_users tinyint(4) DEFAULT NULL,
  visited_courses_public tinyint(4) DEFAULT NULL,
  visited_courses_inhouse tinyint(4) DEFAULT NULL,
  not_visited_courses_public tinyint(4) DEFAULT NULL,
  not_visited_courses_inhouse tinyint(4) DEFAULT NULL,
  show_date_start date DEFAULT NULL,
  show_date_end date DEFAULT NULL,
  method_visited varchar(45) DEFAULT NULL,
  method_not_visited varchar(45) DEFAULT NULL,
  mail_include text,
  mail_exclude text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARACTER SET utf8;



ALTER TABLE participant ADD COLUMN joomla_email varchar(250) NOT NULL,
                        ADD COLUMN joomla_sync_history text NOT NULL,
                        ADD COLUMN no_contact tinyint(1) DEFAULT 0,
                        ADD COLUMN mail_history text NOT NULL,
                        ENGINE=InnoDB AUTO_INCREMENT=6424 DEFAULT CHARACTER SET utf8;

ALTER TABLE `bpmspace_edums`.`registration_events` 
ADD INDEX `registration_id_1_idx` (`registration_id` ASC),
ADD INDEX `event_id_5_idx` (`event_id` ASC);
ALTER TABLE `bpmspace_edums`.`registration_events` 
ADD CONSTRAINT `registration_id_1`
  FOREIGN KEY (`registration_id`)
  REFERENCES `bpmspace_edums`.`registration` (`registration_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `event_id_5`
  FOREIGN KEY (`event_id`)
  REFERENCES `bpmspace_edums`.`event` (`event_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
						
						
						
SET foreign_key_checks=1;
COMMIT;

