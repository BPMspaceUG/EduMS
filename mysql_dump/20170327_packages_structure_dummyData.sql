-- Tabellenstruktur für Tabelle `package`
DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
`package_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL DEFAULT 0,
  `package_discount` float(8,2) NOT NULL DEFAULT 0.00,
  `packageName` longtext NOT NULL,
  `packageHeadline` tinytext NOT NULL,
  `packageDescription` longtext NOT NULL,
  `packageDescriptionSidebar` longtext NOT NULL,
  `packageImage` longtext,
  `packageDescriptionFooter` longtext NOT NULL,
  `deprecated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Indizes für die Tabelle `package`
ALTER TABLE `package`
 ADD PRIMARY KEY (`package_id`), ADD KEY `brand_id` (`brand_id`);
-- AUTO_INCREMENT für Tabelle `package`
ALTER TABLE `package`
 MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT;

-- Tabellenstruktur für Tabelle `package_course`
DROP TABLE IF EXISTS `package_course`;
CREATE TABLE IF NOT EXISTS `package_course` (
  `package_course_id` int(11) NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- Indizes für die Tabelle `package_course`
ALTER TABLE `package_course`
 ADD PRIMARY KEY (`package_course_id`), ADD KEY `course_id` (`course_id`), ADD KEY `package_id` (`package_id`),
 MODIFY `package_course_id` int(11) NOT NULL AUTO_INCREMENT;

-- Struktur des Views `v_packagecourse_notdepercatedlevelnotzero`
DROP VIEW IF EXISTS `v_packagecourse_notdepercatedlevelnotzero`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_packagecourse_notdepercatedlevelnotzero` AS select 
`package_course`.`package_course_id` AS `package_course_id`, `package_course`.`package_id` AS `package_id`,
`package`.`package_discount` AS `package_discount`, `package`.`packageName` AS `packageName`, `package`.`packageHeadline` AS `packageHeadline`, 
`package`.`packageDescription` AS `packageDescription`, `package`.`packageDescriptionSidebar` AS `packageDescriptionSidebar`, 
`package`.`packageImage` AS `packageImage`, `package`.`packageDescriptionFooter` AS `packageDescriptionFooter`, 
`package_course`.`course_id` AS `course_id`, `package`.`brand_id` AS `brand_id`, 
( select COUNT(`package_id`) from `package_course` pc where pc.`package_id` = `package_course`.`package_id`) AS `package_course_amount`, 
`course`.`course_name` AS `course_name`, `package_course`.`level` AS `level`, `package_course`.`rank` AS `rank` 
from (
	(`bpmspace_edums_v5`.`package_course` `package_course` 
		left join `bpmspace_edums_v5`.`course` `course` 
		on((`package_course`.`course_id` = `course`.`course_id`))
	) 
	left join `bpmspace_edums_v5`.`package` `package` 
		on((`package_course`.`package_id` = `package`.`package_id`))
)
where ((`course`.`deprecated` <> '1') and (`package_course`.`level` <> '0'));



-- Demodata
INSERT INTO `package` (`deprecated`) VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0);
UPDATE `package` SET `brand_id` = str_random('[1|2|3]');
UPDATE `package` SET `package_discount` = concat(str_random('D'),'.',str_random('D'),str_random('D'));
UPDATE `package` SET `packageName` = concat('packageName - ',`package_id`,' ',str_random_lipsum(1,1,NULL));
UPDATE `package` SET `packageHeadline` = concat('packageHeadline - ',`package_id`,' ',str_random_lipsum(1,1,NULL));
UPDATE `package` SET `packageDescription` = concat('<p>packageDescription - ',`package_id`,' ',str_random_lipsum(1,1,NULL),'</p>');
UPDATE `package` SET `packageDescriptionSidebar` = concat('<p>packageDescriptionSidebar - ',`package_id`,' ',str_random_lipsum(1,1,NULL),'</p>');
UPDATE `package` SET `packageImage` = concat('packageImage - noImg.');
UPDATE `package` SET `packageDescriptionFooter` = concat('<p>packageDescriptionFooter - ',`package_id`,' ',str_random_lipsum(1,1,NULL),'</p>');

INSERT INTO `package_course` ( `level`, `rank`) VALUES (1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1),(1,1);
UPDATE `package_course` SET `package_id` = str_random('[1|2|3|4|5]');
UPDATE `package_course` SET `course_id` = (SELECT `course_id` FROM `v_eventcourselocation_futurepublicnotdepercatednotstornonotnew` where `test` != 1 order by rand() limit 1);
