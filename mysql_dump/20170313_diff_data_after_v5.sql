-- Demodata for package and package_course
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
