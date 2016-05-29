'use strict';

var module = angular.module('phonecatApp', ['ngSanitize', 'xeditable', 'ui.bootstrap', 'ui.tinymce'])

// Needed for inline editing
module.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // needed for inline editing
});

// Controller of Modal Window
module.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, cmd, element) {
  
    $scope.tinymceOptions = {
      //resize: false,
      //width: 400,
      height: 500,
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
      ],
      toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      toolbar2: 'print preview media | forecolor backcolor emoticons',
      image_advtab: true,
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ]
      /*content_css: [
        '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
        '//www.tinymce.com/css/codepen.min.css'
      ]*/
      /*plugins: 'print textcolor',
      toolbar: "undo redo styleselect bold italic print forecolor backcolor"*/
    };
  
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

	$scope.setSelectedCourse = function (el) {$scope.actCourse = el;};
	$scope.setSelectedTopic = function (el) {$scope.actTopic = el;};
	$scope.setSelectedBrand = function (el) {$scope.actBrand = el;};

	//------------------------------- Courses
	
  $scope.courses = false;
  $scope.topics = false;
  $scope.brands = false;
  
  $scope.actCourse = false;
  $scope.actTopic = false;
  $scope.actBrand = false;
  
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
          if (command == 'update_course')
            return $scope.actCourse;
          else if (command == 'update_topic')
            return $scope.actTopic;
          else if (command == 'update_brand')
            return $scope.actBrand;
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

  /********************************************* Edit */
  $scope.editcourse = function(el) {
    $scope.setSelectedCourse(el);
    $scope.open('modalEditCourse.html', 'update_course');
  }
  $scope.edittopic = function(el) {
    $scope.setSelectedTopic(el);
    $scope.open('modalEditTopic.html', 'update_topic');
  }
  $scope.editbrand = function(el) {
    $scope.setSelectedBrand(el);
    $scope.open('modalEditBrand.html', 'update_brand');
  }
  /********************************************* Read */
  $scope.getCourses = function() {
    return $scope.courses.length ? null : $http.get('getjson.php?c=courses').success(function(data) {
      $scope.courses = data.courselist;
    });
  };
  $scope.getTopics = function() {
    return $scope.topics.length ? null : $http.get('getjson.php?c=topics').success(function(data) {
      $scope.topics = data.topiclist;
    });
  };
  $scope.getBrands = function() {
    return $scope.brands.length ? null : $http.get('getjson.php?c=brands').success(function(data) {
      $scope.brands = data.brandlist;
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
	$scope.getTopics();
	$scope.getBrands();
}]);