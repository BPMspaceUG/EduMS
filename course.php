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
        <th>Topic</th>
        <th>Min. Participants</th>
        <th>Deprecated</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="c in courses">
        <td style="width: 100px;">
          <span class="btn pull-left" ng-click="setSelectedCourse(c)">
            <i ng-class="{'fa fa-fw fa-check-square-o': c.ID === actCourse.ID, 'fa fa-fw fa-square-o': c.ID != actCourse.ID}"></i>
          </span>
          <a class="btn pull-left" ng-click="editcourse(c)"><i class="fa fa-fw fa-pencil"></i></a>
        </td>
        <td>{{c.ID}}</td>
        <td style="width: 350px;">{{c.Name}}</td>
        <td>{{c.Topic}}</td>
        <td>{{c.MinPart}}</td>
        <td>{{c.Depr}}</td>
        <td>{{c.Price}}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Template Modal "Edit Syllabus" -->
<script type="text/ng-template" id="modalEditCourse.html">
	<div class="modal-header">
		<h3 class="modal-title">Edit course</h3>
	</div>
	<div class="modal-body">
	  <form class="form-horizontal">
	  <fieldset>    
      <legend>Edit course</legend>
      <div class="form-group">
        <label>Course ID</label>
        <input ng-model="object.data.ID" placeholder="3" class="form-control" type="text" disabled/>
      </div>
      <div class="form-group">
        <label>Course name</label>
        <input ng-model="object.data.Name" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Topic</label>
        <input ng-model="object.data.Topic" placeholder="IT Sec" class="form-control" type="text" disabled/>
      </div>
      <div class="form-group">
        <label>Course Headline</label>
        <input ng-model="object.data.courseHeadline" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Number of Days</label>
        <input ng-model="object.data.number_of_days" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Number of Trainers</label>
        <input ng-model="object.data.number_of_trainers" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Min. Participants</label>
        <input ng-model="object.data.MinPart" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Deprecated</label>
        <input ng-model="object.data.Depr" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Course Description</label>
        <textarea data-ui-tinymce ng-model="object.data.courseDescription"></textarea>
      </div>
      <div class="form-group">
        <label>Course Image</label>
        <textarea class="form-control" ng-model="object.data.courseImage"></textarea>
      </div>
      <div class="form-group">
        <label>Course Description Mail</label>
        <textarea data-ui-tinymce ng-model="object.data.courseDescriptionMail"></textarea>
      </div>
      <div class="form-group">
        <label>Course Price</label>
         <input ng-model="object.data.Price" placeholder="Training 1" class="form-control" type="text" />
      </div>
      <div class="form-group">
        <label>Course Description Certificate</label>
        <textarea data-ui-tinymce ng-model="object.data.courseDescriptionCertificate"></textarea>
      </div>
	  </fieldset>
	  </form>
	</div>
	<div class="modal-footer">
		<button class="btn btn-primary" type="button" ng-click="ok()">Save</button>
		<button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>
	</div>
</script>

<!-- Custom -->
<script src="./custom/custom.js"></script>
<?php
  include_once '_footer.inc.php';
?>
 
 