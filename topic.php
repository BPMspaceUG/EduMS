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
          <span class="btn pull-left" ng-click="setSelectedTopic(t)">
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

<!-- Template Modal "Edit Topic" -->
<script type="text/ng-template" id="modalEditTopic.html">
	<div class="modal-header">
		<h3 class="modal-title">Edit topic</h3>
	</div>
	<div class="modal-body">
	  <form class="form-horizontal">
	  <fieldset>
      <legend>Edit topic</legend>
      <div class="form-group">
        <label class="col-sm-2 control-label">Topic ID</label>
        <div class="col-sm-4"><input ng-model="object.data.ID" class="form-control" type="text" disabled/></div>
        <label class="col-sm-2 control-label">Topic Name</label>
        <div class="col-sm-4"><input ng-model="object.data.topicName" class="form-control" type="text" /></div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Topic Headline</label>
        <div class="col-sm-4"><input ng-model="object.data.topicHeadline" class="form-control" type="text" /></div>
        <label class="col-sm-2 control-label">Deprecated</label>
        <div class="col-sm-4"><input ng-model="object.data.deprecated" class="form-control" type="text" /></div>
      </div> 
      <div class="form-group">
        <label class="col-sm-2 control-label">Description</label>
        <div class="col-sm-10"><textarea data-ui-tinymce="tinymceOptions" ng-model="object.data.topicDescription"></textarea></div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label ">Sidebar Description</label>
        <div class="col-sm-10"><textarea data-ui-tinymce="tinymceOptions" ng-model="object.data.topicDescriptionSidebar"></textarea></div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Image</label>
        <div class="col-sm-10"><textarea class="form-control" ng-model="object.data.topicImage"></textarea></div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label ">Description Footer</label>
        <div class="col-sm-10"><textarea data-ui-tinymce="tinymceOptions" ng-model="object.data.topicDescriptionFooter"></textarea></div>
      </div>    
    </div>
	</fieldset>
	</form>
	</div>
	<div class="modal-footer">
		<button class="btn btn-primary" type="button" ng-click="ok()"><i class="fa fa-floppy-o"></i> Save</button>
		<button class="btn btn-warning" type="button" ng-click="cancel()"><i class="fa fa-times"></i> Cancel</button>
	</div>
</script>

<!-- Custom -->
<script src="./custom/custom.js"></script>
<?php
  include_once '_footer.inc.php';
?>
 
 