CREATE USER 'bpmspace_edums'@'localhost' IDENTIFIED BY 'PASSWORTinLASTPASS';
CREATE USER 'bpmspace_eduapi'@'localhost' IDENTIFIED BY 'PASSWORTinLASTPASS';
GRANT SELECT, INSERT, UPDATE ON `bpmspace_edums_v4`.* TO 'bpmspace_edums'@'localhost';
GRANT SELECT ON `bpmspace_edums_v4`.* TO 'bpmspace_eduapi'@'localhost';

