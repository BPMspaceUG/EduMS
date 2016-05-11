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
    actEl.Name = data; // only here
		return $http.post('getjson.php?c='+cmd, JSON.stringify(actEl)); // send new model
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