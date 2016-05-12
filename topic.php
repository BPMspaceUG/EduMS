<?php
  include_once '_dbconfig.inc.php';
  include_once '_header.inc.php';
?>
<div class="clearfix"></div>
<div class="container">
  <!-- Table -->
  <table class="table table-condensed table-striped">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>ID</th>
        <th>Name</th>
        <th>Responsible Trainer</th>
        <th>Deprecated</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="t in topics">
        <td style="width: 100px;">
          <span class="btn pull-left" ng-click="setSelectedCourse(t)">
            <i ng-class="{'fa fa-fw fa-check-square-o': t.ID === actTopic.ID, 'fa fa-fw fa-square-o': t.ID != actTopic.ID}"></i>
          </span>
          <a class="btn pull-left" ng-click="edittopic(t)"><i class="fa fa-fw fa-pencil"></i></a>
        </td>
        <td>{{t.ID}}</td>
        <td style="width: 350px;">{{t.topicName}}</td>
        <td>{{t.responsibleTrainer_id}}</td>
        <td>{{t.deprecated}}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Custom -->
<script src="./custom/custom.js"></script>
<?php
  include_once '_footer.inc.php';
?>
 
 