<?php
  include_once '_dbconfig.inc.php';
  include_once '_header.inc.php';
?>
<div class="clearfix"></div>
<div class="container">
 TABELLE course
<pre style="display: none;">
SELECT 
    c.course_id AS 'ID',
    course_name AS 'Name',
    aa.topicName AS 'Topic',
    min_participants AS 'Min. Part.',
    c.deprecated AS 'Depr.',
    coursePrice AS 'Price'
FROM
    (SELECT 
        course_id, topicName
    FROM
        topic_course AS a
    INNER JOIN topic AS b ON a.topic_id = b.topic_id) AS aa
        INNER JOIN
    course AS c ON aa.course_id = c.course_id;
</pre>
<div ng-app="">
  <p>Name : <input type="text" ng-model="name"></p>
  <h1>Hello {{name}}</h1>
</div>
<table class="table table-condensed table-striped">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Topic</th>
      <th>Min. Participants</th>
      <th>Deprecated</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-show="test">
      <td>1</td>
      <td>Test</td>
      <td>Test</td>
      <td>23</td>
      <td>NO</td>
      <td>123</td>
    </tr>
  </tbody>
</table>
</div>
<?php
  include_once '_footer.inc.php';
?>
 
 