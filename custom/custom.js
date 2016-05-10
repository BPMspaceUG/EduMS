'use strict';

var module = angular.module('phonecatApp', ['ngSanitize', 'xeditable', 'ui.bootstrap', 'ui.tinymce'])

// Needed for inline editing
module.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // needed for inline editing
});

// Main Controller
module.controller('PhoneListCtrl', ['$scope', '$http', '$sce', '$uibModal', function($scope, $http, $sce, $uibModal) {

	$scope.setSelectedCourse = function (el) {$scope.actTopic = el;};

	//------------------------------- Courses
	
  $scope.courses = false;
  
  $http.get('getjson.php?c=courses').success(function(data) {
		$scope.courses = data.courselist;
	});
  
  $scope.getCourses = function() {
    return $scope.courses.length ? null : $http.get('getjson.php?c=courses').success(function(data) {
      $scope.courses = data;
    });
  };

	// Selection function
	$scope.displ = function(el){el.showKids = !el.showKids;}

  //********************* Inline editing
	$scope.saveEl = function(actEl, data, cmd) {
		var c;
		switch (cmd) {
			case 'u_answer_t': c = 'update_answer'; actEl.answer = data; break;
			case 'u_answer_c': c = 'update_answer'; actEl.correct = data; break;
			case 'u_syllabel_n': c = 'update_syllabuselement'; actEl.name = data; actEl.ID = actEl.sqms_syllabus_element_id; break;
			case 'u_syllabel_s': c = 'update_syllabuselement'; actEl.severity = data; actEl.ID = actEl.sqms_syllabus_element_id; break;
			case 'u_topic_n': c = 'update_topic'; actEl.name = data; actEl.ID = actEl.id; break;
			case 'u_syllab_n': c = 'update_syllabus_name'; actEl.name = data; break;
			case 'u_syllab_tc': c = 'update_syllabus_topic'; actEl.TopicID = data; break;
			case 'u_question_q': c = 'update_question'; actEl.Question = data; break;
		}
		return $http.post('getjson.php?c='+c, JSON.stringify(actEl)); // send new model
	}

	//********************* WRITE data to server
	$scope.writeData = function (command, data) {
		console.log("Sending command ("+command+") ...");
    console.log(data);
		$http({
			url: 'getjson.php?c=' + command,
			method: "POST",
			data: JSON.stringify(data)
		}).
		success(function(data){
			console.log("Executed command successfully! Return: " + data);
		}).
		error(function(error){
			console.log("Error! " + error);
		});
	}

	//--- Initial values
	$scope.actCourse = false;
  
  /******* D E B U G G I N G *******/  
  $scope.debugMode = true;
  /*********************************/
  
	//---- Initial functions
	$scope.getCourses();
}]);