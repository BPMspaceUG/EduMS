-- Tabellenstruktur für Tabelle `package`
DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
`package_id` int(11) NOT NULL,
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
 ADD PRIMARY KEY (`package_id`);
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
`package_course`.`course_id` AS `course_id`, 
( select COUNT(`package_id`) from `package_course` pc where pc.`package_id` = `package_course`.`package_id`) AS `package_course_amount`, 
`course`.`course_name` AS `course_name`, `package_course`.`level` AS `level`, `package_course`.`rank` AS `rank` 
from (
	(`bpmspace_edums_v4`.`package_course` `package_course` 
		left join `bpmspace_edums_v4`.`course` `course` 
		on((`package_course`.`course_id` = `course`.`course_id`))
	) 
	left join `bpmspace_edums_v4`.`package` `package` 
		on((`package_course`.`package_id` = `package`.`package_id`))
)
where ((`course`.`deprecated` <> '1') and (`package_course`.`level` <> '0'));


-- Demodata for package and package_course
INSERT INTO `package` (`package_discount`, `packageName`, `packageHeadline`, `packageDescription`, 
	`packageDescriptionSidebar`, `packageImage`, `packageDescriptionFooter`, `deprecated`) 
VALUES
(7.75, 'Foundation', 'package Foundation ID 1', '<p>package description: A package of all Foundation courses from different topics.</p>', 
	'<p>package description sidebar: A package of all Foundation courses from different topics.</p>', 'no img.',
	 '<p>package description footer: A package of all Foundation courses from different topics.</p>', 0),
(7.75, 'Whole Topic', 'package Whole Topic ID 2', '<p>package description: A package of all courses from a topic.</p>', 
	'<p>package description sidebar: A package of all courses from a topic.</p>', 'no img.',
	 '<p>package description footer: A package of all courses from a topic.</p>', 0),
(7.75, 'Three in Location', 'package three in Location ID 3', '<p>package description: A package of three couses at a location.</p>', 
	'<p>package description sidebar A package of three couses at a location.</p>', 'no img.',
	 '<p>package description footer: A package of three couses at a location.</p>', 0);

INSERT INTO `package_course` ( `package_id`, `course_id`, `level`, `rank`) VALUES
(1, 11, 1, 1), (1, 12, 1, 1), (1, 13, 1, 1),
(2, 26, 1, 1), (2, 27, 2, 1), (2, 28, 3, 1),
(3, 1, 1, 1), (3, 4, 2, 1), (3, 9, 2, 2), (3, 2, 3, 1);
