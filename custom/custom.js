'use strict';

var module = angular.module('phonecatApp', ['ngSanitize', 'xeditable', 'ui.bootstrap', 'ui.tinymce'])

// Needed for inline editing
module.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // needed for inline editing
});

// Controller of Modal Window
module.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, cmd, element) {
  
  // Initial settings  
  $scope.object = {
    command: cmd,
    data: {}
  };
  $scope.object.data = element;
  
  $scope.ok = function () {
    $uibModalInstance.close($scope.object); // Return result
  };  
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

// Main Controller
module.controller('PhoneListCtrl', ['$scope', '$http', '$sce', '$uibModal', function($scope, $http, $sce, $uibModal) {

	$scope.setSelectedCourse = function (el) {
    $scope.actCourse = el;
  };

	//------------------------------- Courses
	
  $scope.courses = false;
  $scope.actCourse = false;
  
  // ------ Modal forms

  $scope.open = function (TemplateName, command) {
    var modalInstance = $uibModal.open({
      animation: false,
      templateUrl: TemplateName,
      controller: 'ModalInstanceCtrl',
      resolve: {
        cmd: function () {
          return command;
        },
        element: function () {
          return $scope.actCourse;
        }
      }
    });
    modalInstance.result.then(function (result) {
      console.log(result);
      // Send result to server
      $scope.writeData(result.command, result.data);
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.editcourse = function(el) {
    $scope.setSelectedCourse(el);
    $scope.open('modalEditCourse.html', 'update_course');
  }

  $scope.getCourses = function() {
    return $scope.courses.length ? null : $http.get('getjson.php?c=courses').success(function(data) {
      $scope.courses = data.courselist;
    });
  };

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
  
	//---- Initial functions
	$scope.getCourses();
}]);