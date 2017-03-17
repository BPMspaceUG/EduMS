USE `bpmspace_edums_v5`;


SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES';

DELIMITER //
DROP FUNCTION IF EXISTS str_random_lipsum;
//

CREATE FUNCTION str_random_lipsum(p_max_words SMALLINT
                                 ,p_min_words SMALLINT
                                 ,p_start_with_lipsum TINYINT(1)
                                 )
    RETURNS VARCHAR(10000)
    NO SQL
    BEGIN
    /**
    * String function. Returns a random Lorum Ipsum string of nn words
    * <br>
    * %author Ronald Speelman
    * %version 1.0
    * Example usage:
    * SELECT str_random_lipsum(5,NULL,NULL) AS fiveWordsExactly;
    * SELECT str_random_lipsum(10,5,0) AS five-tenWords;
    * SELECT str_random_lipsum(50,10,1) AS startWithLorumIpsum;
    * See more complex examples and a description on www.moinne.com/blog/ronald
    *
    * %param p_max_words         Number: the maximum amount of words, if no
    *                                    min_words are provided this will be the
    *                                    exaxt amount of words in the result
    *                                    Default = 50
    * %param p_min_words         Number: the minimum amount of words in the
    *                                    result, By providing the parameter, you provide a range
    *                                    Default = 0
    * %param p_start_with_lipsum Boolean:if "1" the string will start with
    *                                    'Lorum ipsum dolor sit amet.', Default = 0
    * %return String
    */

        DECLARE v_max_words SMALLINT DEFAULT 50;
        DECLARE v_random_item SMALLINT DEFAULT 0;
        DECLARE v_random_word VARCHAR(25) DEFAULT '';
        DECLARE v_start_with_lipsum TINYINT DEFAULT 0;
        DECLARE v_result VARCHAR(10000) DEFAULT '';
        DECLARE v_iter INT DEFAULT 1;
        DECLARE v_text_lipsum VARCHAR(1500) DEFAULT 'a ac accumsan ad adipiscing aenean aliquam aliquet amet ante aptent arcu at auctor augue bibendum blandit class commodo condimentum congue consectetuer consequat conubia convallis cras cubilia cum curabitur curae; cursus dapibus diam dictum dignissim dis dolor donec dui duis egestas eget eleifend elementum elit enim erat eros est et etiam eu euismod facilisi facilisis fames faucibus felis fermentum feugiat fringilla fusce gravida habitant hendrerit hymenaeos iaculis id imperdiet in inceptos integer interdum ipsum justo lacinia lacus laoreet lectus leo libero ligula litora lobortis lorem luctus maecenas magna magnis malesuada massa mattis mauris metus mi molestie mollis montes morbi mus nam nascetur natoque nec neque netus nibh nisi nisl non nonummy nostra nulla nullam nunc odio orci ornare parturient pede pellentesque penatibus per pharetra phasellus placerat porta porttitor posuere praesent pretium primis proin pulvinar purus quam quis quisque rhoncus ridiculus risus rutrum sagittis sapien scelerisque sed sem semper senectus sit sociis sociosqu sodales sollicitudin suscipit suspendisse taciti tellus tempor tempus tincidunt torquent tortor tristique turpis ullamcorper ultrices ultricies urna ut varius vehicula vel velit venenatis vestibulum vitae vivamus viverra volutpat vulputate';
        DECLARE v_text_lipsum_wordcount INT DEFAULT 180;
        DECLARE v_sentence_wordcount INT DEFAULT 0;
        DECLARE v_sentence_start BOOLEAN DEFAULT 1;
        DECLARE v_sentence_end BOOLEAN DEFAULT 0;
        DECLARE v_sentence_lenght TINYINT DEFAULT 9;

        SET v_max_words := COALESCE(p_max_words, v_max_words);
        SET v_start_with_lipsum := COALESCE(p_start_with_lipsum , v_start_with_lipsum);

        IF p_min_words IS NOT NULL THEN
            SET v_max_words := FLOOR(p_min_words + (RAND() * (v_max_words - p_min_words)));
        END IF;

        IF v_max_words < v_sentence_lenght THEN
            SET v_sentence_lenght := v_max_words;
        END IF;

        IF p_start_with_lipsum = 1 THEN
            SET v_result := CONCAT(v_result,'Lorem ipsum dolor sit amet.');
            SET v_max_words := v_max_words - 5;
        END IF;

        WHILE v_iter <= v_max_words DO
            SET v_random_item := FLOOR(1 + (RAND() * v_text_lipsum_wordcount));
            SET v_random_word := REPLACE(SUBSTRING(SUBSTRING_INDEX(v_text_lipsum, ' ' ,v_random_item),
                                           CHAR_LENGTH(SUBSTRING_INDEX(v_text_lipsum,' ', v_random_item -1)) + 1),
                                           ' ', '');

            SET v_sentence_wordcount := v_sentence_wordcount + 1;
            IF v_sentence_wordcount = v_sentence_lenght THEN
                SET v_sentence_end := 1 ;
            END IF;

            IF v_sentence_start = 1 THEN
                SET v_random_word := CONCAT(UPPER(SUBSTRING(v_random_word, 1, 1))
                                            ,LOWER(SUBSTRING(v_random_word FROM 2)));
                SET v_sentence_start := 0 ;
            END IF;

            IF v_sentence_end = 1 THEN
                IF v_iter <> v_max_words THEN
                    SET v_random_word := CONCAT(v_random_word, '.');
                END IF;
                SET v_sentence_lenght := FLOOR(9 + (RAND() * 7));
                SET v_sentence_end := 0 ;
                SET v_sentence_start := 1 ;
                SET v_sentence_wordcount := 0 ;
            END IF;

            SET v_result := CONCAT(v_result,' ', v_random_word);
            SET v_iter := v_iter + 1;
        END WHILE;

        RETURN TRIM(CONCAT(v_result,'.'));
END;
//
DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;


SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES';

DELIMITER //
DROP FUNCTION IF EXISTS str_random_character;
//

CREATE FUNCTION str_random_character(p_char VARCHAR(1))
    RETURNS VARCHAR(1)
    NO SQL
    BEGIN
    /**
    * String function. Returns random character based on a mask
    * <br>
    * %author Ronald Speelman
    * %version 1.5
    * Example usage:
    * SELECT str_random_character('d') AS digit;
    * SELECT str_random_character('C') AS UPPER;
    * See more examples and a description on www.moinne.com/blog/ronald
    *
    * %param p_pattern String: the pattern describing the random values
    *                          c returns lower-case character [a-z]
    *                          C returns upper-case character [A-Z]
    *                          A returns either upper or lower-case character [a-z A-Z]
    *                          d returns a digit [0-9]
    *                          D returns a digit without a zero [1-9]
    *                          b returns a bit [0-1]
    *                          X returns hexedecimal character [0-F]
    *                          * returns characters, decimals and special characters [a-z A-Z 0-9 !?-_@$#]
    *                          All other characters are taken literally
    * %return VARCHAR(1)
    */

    DECLARE v_result   VARCHAR(1) DEFAULT '';

        CASE p_char
            WHEN BINARY '*' THEN SET v_result := ELT(1 + FLOOR(RAND() * 69),'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                                                                                 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                                                                                 '!','?','-','_','@','$','#',
                                                                                 0,1,2,3,4,5,6,7,8,9);
            WHEN BINARY 'A' THEN SET v_result := ELT(1 + FLOOR(RAND() * 52),'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                                                                                 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
            WHEN BINARY 'c' THEN SET v_result := ELT(1 + FLOOR(RAND() * 26),'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
            WHEN BINARY 'C' THEN SET v_result := ELT(1 + FLOOR(RAND() * 26),'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
            WHEN BINARY 'd' THEN SET v_result := ELT(1 + FLOOR(RAND() * 10), 0,1,2,3,4,5,6,7,8,9);
            WHEN BINARY 'D' THEN SET v_result := ELT(1 + FLOOR(RAND() * 9), 1,2,3,4,5,6,7,8,9);
            WHEN BINARY 'X' THEN SET v_result := ELT(1 + FLOOR(RAND() * 16), 0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F');
            WHEN BINARY 'b' THEN SET v_result := ELT(1 + FLOOR(RAND() * 2), 0,1);
            ELSE
                SET v_result := p_char;
        END CASE;

   RETURN v_result;
END;
//
DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;

SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES';

DELIMITER //
DROP FUNCTION IF EXISTS str_random;
//

CREATE FUNCTION str_random(p_pattern VARCHAR(200))
    RETURNS VARCHAR(2000)
    NO SQL
    BEGIN
    /**
    * String function. Returns a random string based on a mask
    * <br>
    * %author Ronald Speelman
    * %version 2.3
    * Example usage:
    * SELECT str_random('dddd CC') AS DutchZipCode;
    * SELECT str_random('d{4} C{2}') AS DutchZipCode;
    * SELECT str_random('*{5}*(4)') AS password;
    * select str_random('Cccc(4)') as name;
    * SELECT str_random('#X{6}') AS htmlColorCode;
    * See more complex examples and a description on www.moinne.com/blog/ronald
    *
    * %param p_pattern String: the pattern describing the random values
    *                          MASKS:
    *                          c returns lower-case character [a-z]
    *                          C returns upper-case character [A-Z]
    *                          A returns either upper or lower-case character [a-z A-Z]
    *                          d returns a digit [0-9]
    *                          D returns a digit without a zero [1-9]
    *                          b returns a bit [0-1]
    *                          X returns hexadecimal character [0-F]
    *                          * returns characters, decimals and special characters [a-z A-Z 0-9 !?-_@$#]
    *                          DIRECTIVES
    *                          "text"      : text is taken literally
    *                          {nn}        : repeat the last mask nn times
    *                          (nn)        : repeat random, but max nn times
    *                          [item|item] : pick a random item from this list, items are separated by a pipe symbol
    *                          All other characters are taken literally
    * %return String
    */

    DECLARE v_iter              SMALLINT DEFAULT 1;
    DECLARE v_char              VARCHAR(1) DEFAULT '';
    DECLARE v_next_char         VARCHAR(1) DEFAULT '';
    DECLARE v_list              VARCHAR(200) DEFAULT '';
    DECLARE v_text              VARCHAR(200) DEFAULT '';
    DECLARE v_result            VARCHAR(2000) DEFAULT '';
    DECLARE v_count             SMALLINT DEFAULT 0;
    DECLARE v_jump_characters   TINYINT DEFAULT 0;
    DECLARE v_end_position      SMALLINT DEFAULT 0;
    DECLARE v_list_count        TINYINT DEFAULT 0;
    DECLARE v_random_item       TINYINT DEFAULT 0;

    WHILE v_iter <= CHAR_LENGTH(p_pattern) DO

        SET v_char := BINARY SUBSTRING(p_pattern,v_iter,1);
        SET v_next_char := BINARY SUBSTRING(p_pattern,(v_iter + 1),1);

        -- check if text is a fixed text
        IF (v_char = '"') THEN
            -- get the text
            SET v_end_position := LOCATE('"', p_pattern, v_iter + 1);
            SET v_text := SUBSTRING(p_pattern,v_iter + 1,(v_end_position - v_iter) - 1);
            -- add the text to the result
            SET v_result := CONCAT(v_result, v_text);
            SET v_iter := v_iter + CHAR_LENGTH(v_text) + 2;
        -- if character has a count specified: repeat it
        ELSEIF (v_next_char = '{') OR (v_next_char = '(') THEN
            -- find out what the count is (max 999)...
            IF (SUBSTRING(p_pattern,(v_iter + 3),1) = '}') OR
               (SUBSTRING(p_pattern,(v_iter + 3),1) = ')') THEN
                SET v_count := SUBSTRING(p_pattern,(v_iter + 2),1);
                SET v_jump_characters := 4;
            ELSEIF (SUBSTRING(p_pattern,(v_iter + 4),1) = '}') OR
                   (SUBSTRING(p_pattern,(v_iter + 4),1) = ')')THEN
                SET v_count := SUBSTRING(p_pattern,(v_iter + 2),2);
                SET v_jump_characters := 5;
            ELSEIF (SUBSTRING(p_pattern,(v_iter + 5),1) = '}') OR
                   (SUBSTRING(p_pattern,(v_iter + 5),1) = ')')THEN
                SET v_count := SUBSTRING(p_pattern,(v_iter + 2),3);
                SET v_jump_characters := 6;
            ELSE
                SET v_count := 0;
                SET v_jump_characters := 3;
            END IF;
            -- if random count: make it random with a max of count
            IF (v_next_char = '(') THEN
                SET v_count := FLOOR((RAND() * v_count));
            END IF;
            -- repeat the characters
            WHILE v_count > 0 DO
                SET v_result := CONCAT(v_result,str_random_character(v_char));
                SET v_count := v_count - 1;
            END WHILE;
            SET v_iter := v_iter + v_jump_characters;
        -- check if there is a list in the pattern
        ELSEIF (v_char = '[') THEN
            -- get the list
            SET v_end_position := LOCATE(']', p_pattern, v_iter + 1);
            SET v_list := SUBSTRING(p_pattern,v_iter + 1,(v_end_position - v_iter) - 1);
            -- find out how many items are in the list, items are seperated by a pipe
            SET v_list_count := (LENGTH(v_list) - LENGTH(REPLACE(v_list, '|', '')) + 1);
            -- pick a random item from the list
            SET v_random_item := FLOOR(1 + (RAND() * v_list_count));
            -- add the item from the list
            SET v_result := CONCAT(v_result,
                                   REPLACE(SUBSTRING(SUBSTRING_INDEX(v_list, '|' ,v_random_item),
                                           CHAR_LENGTH(SUBSTRING_INDEX(v_list,'|', v_random_item -1)) + 1),
                                           '|', '')
                                  );
            SET v_iter := v_iter + CHAR_LENGTH(v_list) + 2;
        -- no directives: just get a random character
        ELSE
            SET v_result := CONCAT(v_result, str_random_character(v_char));
            SET v_iter := v_iter + 1;
        END IF;

   END WHILE;

   RETURN v_result;
END;
//
DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;

SET @dcs := '[das|den|der|die|ein|eit|end|ere|ers|ese|gen|ige|ine|ist|men|mit|nde|nen|nge|nte|ren|vok|vel|vit|van]';
SET @zcs := '[de|di|ei|el|en|er|es|ge|he|ht|ic|ie|it|le|li|nd|ne|ng|re|sc|se|si|st|te|un|bi|fa|tu|ra|ke]';
SET @strt := '[A|E|I|O|U|L|K|P|R]';



UPDATE `brand` SET `brand_name`=concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs)," ID ", `brand_id` )  WHERE `brand_id` != 1;
UPDATE `brand` SET `brand_name`='BPMspace' WHERE `brand_id`='1';

UPDATE brand SET `accesstoken`=(SELECT uuid());
UPDATE brand SET `accesstoken`=(md5(accesstoken));

UPDATE brand SET `login` = LOWER(REPLACE(brand_name,' ',''));

UPDATE brand SET `css-style`=CONCAT('<style> h1 { color:#',str_random('XXXXXX'),';} h2 { color:#',str_random('XXXXXX'),';}</style>');

UPDATE brand SET `brandHeadline`= CONCAT("Brand with ID ",`brand_id`);

UPDATE brand SET `brandDescription`= CONCAT("<h2>brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(20,10,NULL),"</p><p>",str_random_lipsum(30,5,NULL),"</p><p>",str_random_lipsum(25,16,NULL),"</p>");
UPDATE brand SET `brandDescriptionFooter`= CONCAT("<h2>FOOTER brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(10,5,NULL),"</p>");
UPDATE brand SET `brandDescriptionSidebar`= CONCAT("<h2>SIDEBAR brand description from brand with ID ", brand_id, "</h2><p>",str_random_lipsum(12,10,NULL),"</p>");

UPDATE brand SET discount=str_random('bD') WHERE brand_id!=event_partner_id;
UPDATE brand SET brandImage='<img class="" src="http://dummyimage.com/200x200/';
UPDATE brand SET brandImage=CONCAT(`brandImage`,str_random('XXXXXX'),"/",str_random('XXXXXX'),".jpg&text=",`brand_name`);

UPDATE `contact_channel` SET contact_name= CONCAT("contact channel with ID ", `contact_channel_id`);
UPDATE `contact_channel` SET contact_description= CONCAT("<p>",str_random_lipsum(20,10,NULL),"</p>");

UPDATE topic SET topicName=concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs));
UPDATE topic SET `topicHeadline`= CONCAT("TOPIC with ID ",`topic_id`);
UPDATE topic SET topicDescription=concat('<p>Topic description ',str_random_lipsum(30,7,NULL), '</p>');
UPDATE topic SET topicDescriptionSidebar=concat('<p>Topic description sidebar ',str_random_lipsum(30,7,NULL), '</p>');
UPDATE topic SET topicDescriptionFooter=concat('<p>Topic description footer ',str_random_lipsum(30,7,NULL), '</p>');

UPDATE topic SET topicImage="data:image/svg+xml;charset=utf-8,<svg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'800'%20height%3D'800'><rect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'grey'%2F><text%20x%3D'400'%20y%3D'155'%20font-size%3D'20'%20font%3D'Verdana%2C%20sans-serif'%20fill%3D'white'%20text-anchor%3D'middle'>training%20scheme%20800%20x%20800<%2Ftext><%2Fsvg>";


UPDATE course SET courseHeadline=course_name;
UPDATE course SET courseDescriptionCertificate=CONCAT("<h2><strong>[$FIRSTNAME] [$NAME]</strong></h2> <p>has visisted the course ",course_name," from [STARTDATE] to [FINISh DATE] with the following agenda:</p> <ul>  <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>      <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>  <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>  <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>  <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li>  <li>&nbsp;",str_random_lipsum(3,1,NULL),"</li></ul>") where test!='1';
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


UPDATE course SET course_name=concat('Course with ID: ', course_id) where test!='1';
UPDATE course SET course_name=concat('Exam with ID: ',course_id) where test='1';

UPDATE course c
    JOIN topic_course tc ON tc.course_id = c.course_id
    JOIN topic t ON tc.topic_id = t.topic_id
SET c.course_name = CONCAT('Course with ID ',c.course_id,' in Topic ',t.topic_id,', Level: ',tc.level,', Rank: ',tc.rank) where test!='1';

UPDATE course c
    JOIN `course_test` ct ON ct.test_id = c.course_id
SET c.course_name = CONCAT('Exam with ID ', ct.test_id, ' for Course with ID ', ct.course_id ) where test!='0';

UPDATE course SET courseDescription=CONCAT("<h2>Course description from course with ID ", Course_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p><p>",str_random_lipsum(5,1,NULL),"</p>");
UPDATE course SET courseDescriptionMail=CONCAT("<h2>Course description from course with ID ", Course_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p>");




UPDATE `gender` SET `gender`='Mrs' WHERE `gender_id`='1';
UPDATE `gender` SET `gender`='Mr.' WHERE `gender_id`='2';

UPDATE location SET location_name=concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random('c'), str_random(@zcs), str_random('c{4}'), str_random('c(2)'));
UPDATE location SET internet_location_name=concat(location_name,'(I)');
UPDATE location SET internet_location_article_id="-1";
UPDATE location SET location_description=CONCAT("<h2>Location description from Location with ID ", location_id, "</h2><p>",str_random_lipsum(24,14,NULL),"</p><p>",str_random_lipsum(24,17,NULL),"</p>") where location_description !='';
UPDATE location SET location_mail_desc=CONCAT("<h2>MAIL Location description from Location with ID ", location_id, "</h2><p>",str_random_lipsum(12,5,NULL),"</p><p>",str_random_lipsum(14,3,NULL),"</p>") where location_mail_desc !='';



UPDATE organization SET contact_url=str_random('[http|https]://www.') where  contact_url !='';
UPDATE organization SET contact_url=CONCAT(contact_url,Replace(organization_name,' ','')) where contact_url  !='';
UPDATE organization SET contact_url=CONCAT(contact_url,str_random('.[com|de|org|net]')) where contact_url  !='';
UPDATE organization SET country=str_random('[Austria|Germany|Germany|Germany|Switzerland]') where country !='';



UPDATE organization SET `organization_name`= concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random('c'), str_random(@zcs), str_random('c{8}'), str_random('c(8)'));
UPDATE organization SET `address_line_1`= CONCAT(str_random(@zcs), str_random(@dcs), '-street');
UPDATE organization SET `address_line_2`= CONCAT(str_random('Dd(2)'), str_random('[a|b|c|d|e]'));
UPDATE organization SET `city`= concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs), str_random('c(4)'));
UPDATE organization SET `state`= concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs), str_random('c(4)'));
UPDATE organization SET `zip`= str_random('DdDdD');



UPDATE participant SET date_of_birth="";
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]d-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|1|2]d');
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]d-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|1|2]d') WHERE date_of_birth='0000-00-00';
UPDATE participant SET date_of_birth=str_random('19[6|7|8|9]d-[1|2|3|4|5|6|7|8|9|10|11|12]-[0|1|2]d') WHERE date_of_birth='0000-00-00';
UPDATE participant SET titel=str_random('Cc(3)') where titel!="";
UPDATE participant SET email_address=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"') where email_address !='';
UPDATE participant SET phone_business=str_random('[+49|+49|+43|+49|+41] d{8}') where  phone_business!="";
UPDATE participant SET phone_private=str_random('[+491|+49|+43|+49|+41] d{8}') where   phone_private!="";
UPDATE participant SET phone_mobile=str_random('[+49|+49||+49|+41] d{8}') where   phone_mobile!="";
UPDATE participant SET address_line_1=str_random('Cc{5}[street|lane|road|park] d{1}d(2)');
UPDATE participant SET country=str_random('[Austria|Germany|Germany|Germany|Switzerland]') where country !='';
UPDATE participant SET contact_channel_data='';
UPDATE participant SET sales_history='';
UPDATE participant SET data_history='';
UPDATE participant SET joomla_id=str_random('Ddddd') where joomla_id !='';
UPDATE participant SET joomla_email=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"') where joomla_email !='';
UPDATE participant SET joomla_sync_history='';
UPDATE participant SET mail_history='';
UPDATE participant SET history_data='';



UPDATE participant SET last_name=concat('lastname ', participant_id);
UPDATE participant SET first_name=concat('firstname ', participant_id);

UPDATE participant SET `email_address_2`=  str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"');
UPDATE participant SET `phone_fax`= concat(str_random('DdDdD'),' - ',str_random('DdDdD'));

UPDATE participant SET `address_line_2` = CONCAT(str_random('Dd(2)'), str_random('[a|b|c|d|e]'));
UPDATE participant SET `city` = concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs), str_random('c(4)'));
UPDATE participant SET `state` = concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs), str_random('c(4)'));
UPDATE participant SET `zip` = str_random('DdDdD');
UPDATE participant SET `place_of_birth` = concat(str_random(@strt), str_random(@zcs), str_random(@dcs), str_random(@zcs), str_random('c(4)'));






UPDATE `participation` SET reason_for_cancel=Replace(str_random_lipsum(5,3,NULL),'.','') where reason_for_cancel!='';
UPDATE `participation` SET comment=Replace(str_random_lipsum(10,7,NULL),'.','') where comment!='';
UPDATE `participation` SET URL_invoice=str_random('[http|https]://www.c{4}c(15).[com|de|org|net]') where URL_invoice !='';
UPDATE `participation` SET invoice_info=Replace(str_random_lipsum(10,7,NULL),'.','') where invoice_info!='';

UPDATE `registration` SET customer_id=str_random('Ddd[3]') where customer_id !='';
UPDATE `registration` SET contact_person=str_random('Cc{5}c(6)') where contact_person !='';
UPDATE `registration` SET email_contact_person=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"') where email_contact_person !='';
UPDATE `registration` SET company=str_random('Cccccc(5)') where company !='';
UPDATE `registration` SET street=str_random('Cc{5}[street|lane|road|park] d{1}d(2)') where street !='';
UPDATE `registration` SET city=str_random('Cccccc(5)') where city !='';
UPDATE `registration` SET country=str_random('[Austria|Germany|Germany|Germany|Switzerland]') where  country !='';
UPDATE `registration` SET phone_day=str_random('[+49|+49|+43|+49|+41] d{8}') where  phone_day !='';
UPDATE `registration` SET phone_mobile=str_random('[+49|+49|+43|+49|+41] d{8}') where  phone_mobile !='';
UPDATE `registration` SET participant1_name=str_random('Cc{5}c(6)') where  participant1_name !='';
UPDATE `registration` SET participant1_email=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"') where participant1_email !='';
UPDATE `registration` SET participant2_name=str_random('Cc{5}c(6)') where  participant2_name !='';
UPDATE `registration` SET participant2_email=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"') where  participant2_email !='';
UPDATE `registration` SET participant3_name=str_random('Cc{5}c(6)') where  participant3_name  !='' ;
UPDATE `registration` SET participant3_email=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"')where  participant3_email !='';
UPDATE `registration` SET additional_information=Replace(str_random_lipsum(10,7,NULL),'.','') where additional_information!='';
UPDATE `registration` SET postcode=str_random('d{5}') where postcode !='';
UPDATE `registration` SET package=str_random('[package I|package II|package III|package IV|package V]') where package!='';


UPDATE `trainer` SET trainer_name=str_random('Cc{3}c(3) Cc{4}c(5)');
UPDATE `trainer` SET email_address=str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"');
UPDATE `trainer` SET phone_number=str_random('[+49|+49|+43|+49|+41] d{8}');
UPDATE `trainer` SET trainer_hash=(SELECT uuid());
UPDATE `trainer` SET trainer_hash=(md5(trainer_hash));


UPDATE `status_billing` SET `status_billing`='paid' WHERE `status_billing_id`='4';
UPDATE `status_billing` SET `status_billing`='payable' WHERE `status_billing_id`='3';
UPDATE `status_billing` SET `status_billing`='billed' WHERE `status_billing_id`='2';
UPDATE `status_billing` SET `status_billing`='controlled' WHERE `status_billing_id`='6';
UPDATE `status_billing` SET `status_billing`='to be billed' WHERE `status_billing_id`='1';
UPDATE `status_billing` SET `status_billing`='to be controlled' WHERE `status_billing_id`='5';

UPDATE `status_event` SET `status_event`='completed' WHERE `status_event_id`='5';
UPDATE `status_event` SET `status_event`='offered' WHERE `status_event_id`='7';
UPDATE `status_event` SET `status_event`='finished' WHERE `status_event_id`='4';
UPDATE `status_event` SET `status_event`='planned' WHERE `status_event_id`='2';
UPDATE `status_event` SET `status_event`='new' WHERE `status_event_id`='1';
UPDATE `status_event` SET `status_event`='canceled' WHERE `status_event_id`='6';
UPDATE `status_event` SET `status_event`='unknown' WHERE `status_event_id`='8';
UPDATE `status_event` SET `status_event`='prepared' WHERE `status_event_id`='3';

UPDATE `status_eventguarantee` SET `eventguaranteestatus`='none' WHERE `ID`='1';
UPDATE `status_eventguarantee` SET `eventguaranteestatus`='only 1 place free' WHERE `ID`='4';
UPDATE `status_eventguarantee` SET `eventguaranteestatus`='only 3 places free' WHERE `ID`='3';
UPDATE `status_eventguarantee` SET `eventguaranteestatus`='guaranteed' WHERE `ID`='2';
UPDATE `status_eventguarantee` SET `eventguaranteestatus`='waiting list' WHERE `ID`='5';

UPDATE `status_participation` SET `status_participation`='accepted' WHERE `status_participation_id`='3';
UPDATE `status_participation` SET `status_participation`='participated successfully' WHERE `status_participation_id`='4';
UPDATE `status_participation` SET `status_participation`='participated not successfully' WHERE `status_participation_id`='5';
UPDATE `status_participation` SET `status_participation`='new' WHERE `status_participation_id`='1';
UPDATE `status_participation` SET `status_participation`='registered' WHERE `status_participation_id`='2';
UPDATE `status_participation` SET `status_participation`='reserved' WHERE `status_participation_id`='7';
UPDATE `status_participation` SET `status_participation`='canceled' WHERE `status_participation_id`='6';
UPDATE `status_participation` SET `status_participation`='waiting list' WHERE `status_participation_id`='8';

UPDATE `status_sales` SET `status_sales`='Major customer' WHERE `status_sales_id`='7';
UPDATE `status_sales` SET `status_sales`='Interested participant' WHERE `status_sales_id`='1';
UPDATE `status_sales` SET `status_sales`='Pipeline major customer' WHERE `status_sales_id`='5';
UPDATE `status_sales` SET `status_sales`='Pipeline participant' WHERE `status_sales_id`='3';
UPDATE `status_sales` SET `status_sales`='participant' WHERE `status_sales_id`='2';
UPDATE `status_sales` SET `status_sales`='Transition major customer' WHERE `status_sales_id`='6';
UPDATE `status_sales` SET `status_sales`='Transition participant' WHERE `status_sales_id`='4';
UPDATE `status_sales` SET `status_sales`='Partner' WHERE `status_sales_id`='9';

UPDATE `status_trainer` SET `status_trainer`='invited' WHERE `status_trainer_id`='1';
UPDATE `status_trainer` SET `status_trainer`='informed' WHERE `status_trainer_id`='3';
UPDATE `status_trainer` SET `status_trainer`='accepted' WHERE `status_trainer_id`='2';
UPDATE `status_trainer` SET `status_trainer`='disinvited' WHERE `status_trainer_id`='5';

UPDATE brand SET `imprint` = concat('<p>imprint', str_random_lipsum(100,200,0), '</p>');
UPDATE brand SET `protection_of_data_privacy` = concat('<p>Protection of data privacy ', str_random_lipsum(100,200,0), '</p>');
UPDATE brand SET `terms_and_conditions` = concat('<p>terms ', str_random_lipsum(100,200,0), '</p>');
UPDATE brand SET `email` = str_random('c{3}c(5)[.|_]c{8}c(8)@[google|yahoo|live|mail]".com"');
UPDATE brand SET `after_reservation_text_pre` = '<p>Thank you for reservation</p>';
UPDATE brand SET `after_reservation_text_post` = concat('<p>After reservation Modal post-text</p>');
UPDATE brand SET `mail_text_pre` = concat('<p>E-Mail reservation pre-text ', str_random_lipsum(5,5,0), '</p>');
UPDATE brand SET `mail_text_post` = concat('<p>E-Mail reservation post-text ', str_random_lipsum(5,5,0), '</p>');
UPDATE brand SET `registration_acceptance_text` = concat('<p>reservation acceptance-text ', str_random_lipsum(5,15,0), '</p>');