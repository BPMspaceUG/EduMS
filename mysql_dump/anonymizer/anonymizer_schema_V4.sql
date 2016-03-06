UPDATE `brand` SET `brand_name`='BPMspace' WHERE `brand_id`='1';
UPDATE `brand` SET `brand_name`=str_random('Cccccc(4)') WHERE `brand_id`!='1';
UPDATE `brand` SET `brand_name`=CONCAT( `brand_name`," ID ", `brand_id`,"");
UPDATE brand SET `accesstoken`=(SELECT uuid());
UPDATE brand SET `accesstoken`=(md5(accesstoken));
UPDATE brand SET `login` = TRIM(Replace(Replace(Replace(brand_name,'\t',''),'\n',''),'\r',''));
UPDATE brand SET `login` = Replace(login,' ','');
UPDATE brand SET `css-style`='<style> body {background-color: ;} h1 { color:';
UPDATE brand SET `css-style`=CONCAT(`css-style`,str_random("[AliceBlue|Aqua|Bisque|BlueViolet|Chocolate|DarkBlue|DarkKhaki|DarkOrchid|DarkSlateGray|DeepPink|DeepSkyBlue|Fuchsia|Gold|GreenYellow]"));
UPDATE brand SET `css-style`=CONCAT(`css-style`,';} h2 { color:');
UPDATE brand SET `css-style`=CONCAT(`css-style`,str_random("[AliceBlue|Aqua|Bisque|BlueViolet|Chocolate|DarkBlue|DarkKhaki|DarkOrchid|DarkSlateGray|DeepPink|DeepSkyBlue|Fuchsia|Gold|GreenYellow]"));
UPDATE brand SET `css-style`=CONCAT(`css-style`,'; margin-left: ;} </style>');
UPDATE brand SET `brandHeadline`= CONCAT("Brand with ID ",`brand_id`);
UPDATE brand SET `brandDescription`= CONCAT("<h2>brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(20,10,NULL),"</p><p>",str_random_lipsum(30,5,NULL),"</p><p>",str_random_lipsum(25,16,NULL),"</p>");
UPDATE brand SET `brandDescriptionFooter`= CONCAT("<h2>FOOTER brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(10,5,NULL),"</p>");
UPDATE brand SET `brandDescriptionSidebar`= CONCAT("<h2>SIDEBAR brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(12,10,NULL),"</p>");
UPDATE brand SET discount=str_random('bD') WHERE brand_id!=event_partner_id;
UPDATE brand SET brandImage='<img class="" src="http://dummyimage.com/200x200/';
UPDATE brand SET brandImage=CONCAT(`brandImage`,str_random('XXXXXX'),"/",str_random('XXXXXX'),".jpg&text=",`brand_name`);


UPDATE `contact_channel` SET contact_name= CONCAT("contact channel with ID ", `contact_channel_id`);
UPDATE `contact_channel` SET contact_description= CONCAT("<p>",str_random_lipsum(20,10,NULL),"</p>");


UPDATE topic SET topicName=str_random('Cccccc(5)');
UPDATE topic SET `topicHeadline`= CONCAT("TOPIC with ID ",`topic_id`);
UPDATE topic SET `topicDescription`= CONCAT("<h2>Topic description from topic with ID ", topic_id, "</h2><p>",str_random_lipsum(19,12,NULL),"</p><p>",str_random_lipsum(30,13,NULL),"</p><p>",str_random_lipsum(7,3,NULL),"</p>");
UPDATE topic SET `topicDescriptionFooter`= CONCAT("<h2>FOOTER Topic description from topic with ID ", topic_id, "</h2><p>",str_random_lipsum(11,6,NULL),"</p>");
UPDATE topic SET `topicDescriptionSidebar`= CONCAT("<h2>SIDEBAR Topic description from topic with ID ", topic_id, "</h2><p>",str_random_lipsum(13,9,NULL),"</p>");
UPDATE topic SET topicImage="data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'800'%20height%3D'800'><rect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'grey'%2F><text%20x%3D'400'%20y%3D'155'%20font-size%3D'20'%20font%3D'Verdana%2C%20sans-serif'%20fill%3D'white'%20text-anchor%3D'middle'>training%20scheme%20800%20x%20800<%2Ftext><%2Fsvg>";


UPDATE course SET course_name=concat('Training ',course_id) where test!='1' AND deprecated='1';
UPDATE course SET course_name=concat('Exam ',course_id) where test='1' AND deprecated='1';

UPDATE course c
    JOIN topic_course tc ON tc.course_id = c.course_id
    JOIN topic t ON tc.topic_id = t.topic_id
SET c.course_name = CONCAT('Training ',c.course_id,' in Topic ',t.topic_id,' - Level-Rank ',tc.level,'-',tc.rank) where test!='1' AND c.deprecated!='1' ;

UPDATE course c
    JOIN `course_test` ct ON ct.test_id = c.course_id
SET c.course_name = CONCAT('Exam with ID ', ct.test_id, ' for training ', ct.course_id ) where test!='0' AND c.deprecated!='1';

UPDATE course SET courseHeadline=course_name;
UPDATE course SET courseDescription=CONCAT("<h2>Course description from course with ID ", Course_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p><p>",str_random_lipsum(5,1,NULL),"</p>");
UPDATE course SET courseDescriptionMail=CONCAT("<h2>Course description from course with ID ", Course_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p>");
UPDATE course SET courseDescriptionCertificate=CONCAT("<h2><strong>[$FIRSTNAME] [$NAME]</strong></h2> <p>has visisted the course ",course_name," from [STARTDATE] to [FINISh DATE] with the following agenda:</p> <ul>	<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>		<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>	<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>	<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>	<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>	<li>&nbsp;",str_random_lipsum(3,1,NULL),"</li></ul>") where test!='1';
UPDATE course SET courseDescriptionCertificate="" where test='1';

UPDATE course SET courseImage='<img class="" src="http://dummyimage.com/200x200/';
UPDATE course SET courseImage=CONCAT(`courseImage`,str_random('XXXXXX'),"/",str_random('XXXXXX'),".png&text=",`course_name`);

UPDATE course SET coursePrice=str_random('[07|08|09|10|11|12|13]dd') where test!='1';
UPDATE course SET coursePrice=str_random('[1|1][5|6|7|8]d') where test='1';

UPDATE event SET URL_Teilnehmerfeedback=str_random('[http|https]://www.c{4}c(15).[com|de|org|net]');
UPDATE event SET URL_Trainerfeedback=str_random('[http|https]://www.c{4}c(15).[com|de|org|net]');
UPDATE event SET URL_invoice=str_random('[http|https]://www.c{4}c(15).[com|de|org|net]');
UPDATE event SET note=Replace(str_random_lipsum(3,0,NULL),'.','');
UPDATE event SET invoice_info=Replace(str_random_lipsum(3,0,NULL),'.','');

UPDATE `gender` SET `gender`='Mrs' WHERE `gender_id`='1';
UPDATE `gender` SET `gender`='Mr.' WHERE `gender_id`='2';

UPDATE location SET location_name=str_random('Cccccc(5)');
UPDATE location SET internet_location_name=location_name; 
UPDATE location SET internet_location_article_id="1";
UPDATE location SET location_description=CONCAT("<h2>Location description from Location with ID ", location_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p>");
UPDATE location SET location_mail_desc=CONCAT("<h2>MAIL Location description from Location with ID ", location_id, "</h2><p>",str_random_lipsum(12,5,NULL),"</p><p>",str_random_lipsum(14,3,NULL),"</p>");

UPDATE organization SET organization_name=CONCAT(str_random('Cccccc(5)')," ",organization_id);
UPDATE organization SET contact_url=str_random('[http|https]://www.');
UPDATE organization SET contact_url=CONCAT(contact_url,Replace(organization_name,' ',''));
UPDATE organization SET contact_url=CONCAT(contact_url,str_random('.[com|de|org|net]'));

UPDATE organization SET address_line_1=str_random('Cc{5}[street|lane|road|park] d{1}d(2)'); 
UPDATE organization SET address_line_2=Replace(str_random_lipsum(3,0,NULL),'.','');
UPDATE organization SET city=str_random('Cccccc(5)');
UPDATE organization SET state=Replace(str_random_lipsum(2,1,NULL),'.','');
UPDATE organization SET zip=str_random('d{5}-d{4}');
UPDATE organization SET country=str_random('[Austria|Germany|Germany|Germany|Switzerland]');

UPDATE participant SET date_of_birth="";
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]D-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|2|2]D');
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]D-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|2|2]D') WHERE date_of_birth='0000-00-00';
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]D-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|2|2]D') WHERE date_of_birth='0000-00-00';

UPDATE participant SET titel=str_random('Cc(3)') where titel!="";
UPDATE participant SET last_name=str_random('Cc{5}c(6)');
UPDATE participant SET first_name=str_random('Cc{3}c(4)');
UPDATE participant SET email_address=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"');
UPDATE participant SET email_address_2=str_random('c{3}c(5)[.|_]c{8}c(8)@c{4}c(3).[com|de|co.uk|fr|org|net]') where email_address_2!="";
UPDATE participant SET phone_business=str_random('[+49|+49|+43|+49|+41] d{8}');
UPDATE participant SET phone_private=str_random('[0011|+49|+43|+49|+41] d{8}');
UPDATE participant SET phone_mobile=str_random('[0011|+49||+49|+41] d{8}');
UPDATE participant SET phone_fax=str_random('[0011|+49|+43|+49|+41] d{8}');
UPDATE participant SET address_line_1=str_random('Cc{5}[street|lane|road|park] d{1}d(2)'); 
UPDATE participant SET address_line_2=Replace(str_random_lipsum(3,0,NULL),'.','');
UPDATE participant SET city=str_random('Cccccc(5)');
UPDATE participant SET state=Replace(str_random_lipsum(2,1,NULL),'.','');
UPDATE participant SET zip=str_random('d{5}-d{4}');
UPDATE participant SET country=str_random('[Austria|Germany|Germany|Germany|Switzerland]');

UPDATE participant SET place_of_birth=str_random('Cccccc(5)');
UPDATE participant SET contact_channel_data='';
UPDATE participant SET sales_history='';
UPDATE participant SET data_history='';
UPDATE participant SET joomla_id=str_random('Ddddd');
UPDATE participant SET joomla_email=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"');
UPDATE participant SET joomla_sync_history='';
UPDATE participant SET mail_history='';
UPDATE participant SET history_data='';
