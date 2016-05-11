<?php
  include_once '_dbconfig.inc.php';
  include_once '_header.inc.php';
?>
<div class="clearfix"></div>
<div class="container">

<!-- Debugging
<pre ng-show="debugMode">{{courses}}</pre>
-->

<table class="table table-condensed table-striped">
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>ID</th>
      <th>Name</th>
      <th>Topic</th>
      <th>Min. Participants</th>
      <th>Deprecated</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="c in courses">
      <td style="width: 100px;">
        <a class="btn pull-left"><i ng-class="{'fa fa-fw fa-check-square-o': s.ID === actSyllabus.ID, 'fa fa-fw fa-square-o': s.ID != actSyllabus.ID}"></i></a>
        <a class="btn pull-left" ng-click="editsyllabus(s)"><i class="fa fa-fw fa-pencil"></i></a>
      </td>
      <td>{{c.ID}}</td>
      <td style="width: 350px;"><a href="#" onbeforesave="saveEl(s, $data, 'u_course_n')" editable-text="c.Name">{{c.Name || "empty"}}</a></td>
      <td>{{c.Topic}}</td>
      <td>{{c.MinPart}}</td>
      <td>{{c.Depr}}</td>
      <td>{{c.Price}}</td>
    </tr>
  </tbody>
</table>
</div>
<script src="./custom/custom.js"></script>
<?php
  include_once '_footer.inc.php';
?>
 
 