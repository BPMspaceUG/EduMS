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
      <td>{{c.ID}}</td>
      <td>{{c.Name}}</td>
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
 
 