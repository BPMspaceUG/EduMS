ALTER TABLE `package` CHANGE `package_description` `package_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `footer` `footer` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `topic_description` `topic_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_descrition` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE `topic` CHANGE `sidebar_descrition` `sidebar_description` LONGTEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;