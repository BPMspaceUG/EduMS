<script type="text/javascript">
app.controller('compileCtrl', ['$scope','$http', function ($scope, $http) {
	$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getCourses').then(function(response) {
		//console.log($scope.resdata = response.data)
		a=Object.keys(response.data)
		$scope.elementz = []
		for (var i = 0; i < a.length-2; i++) {
			b=response.data[a[i]]
			//console.log(b=response.data[a[i]])
			for (var l= 0; l< b.length;l++) {
				
				$scope.elementz.push(angular.element(b[l].course_description))
				if(l<2){console.log($scope.elementz[$scope.elementz.length-1])}
			};
		};		
	},function(response) {$scope.nextEvents = 'Fehler in compileCtrl-$http: '+response}
	)
}]);
app.directive('compileDirective', ['$scope','$compile', function($compile, $scope){
	return{
		restrict:'E',
		controller:'compileCtrl',
		controllerAs: 'ctrl',
    	template: 't{{elementz[1]}}',
		scope: '=',
		link: function(scope, elm, attrs){
			console.log(scope)
			console.log(elm)
			console.log(attrs)
			var compileIt = $compile(scope.elementz[1]);
			var content = compileIt(scope)
			elm.append(content)
		}
	}
}]);









app.controller('cppCtrl', function($scope){
	$scope.lName = "Knopf"
	$scope.nElement = angular.element('<div class="btn btn-default">'+$scope.lName+'</div>')
})
app.controller('monitorCtrl', ['$scope','$http','$location', '$log', '$sce', function ($scope, $http, $location, $log, $sce) {
	//$log.info($location.path())
	$scope.tabellen=[];
	for (var i = 0; i < 3; i++) {//dummys
		$scope.tabellen[i]={name:'tbl'+i,info:'info'+i,header:'H'+i,rows:[['a','b','c'],['ä','ö','ü'],['x','y','z']]}
	};

	$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getMonitor')
	.then(function(response) {
		//console.log($scope.resdata = response.data)
		a=Object.keys(response.data)
		if (a.length>3) {			
			

			$scope.htmElem=$sce.trustAsHtml('I am an <code>HTML</code>string with <a href="#" ng-mouseover="removeExp()">\
     links!</a> and other <em>stuff</em>');
			for (var i = 0; i < a.length-2; i++) {
				//console.log(Object.keys(response.data[a[i]][0]));
				$scope.tabellen[i]={
					name:a[i],
					info:'info'+i,
					header:Object.keys(response.data[a[i]][0]),
					rows:response.data[a[i]]
				}
				

			};
		};
		
	},function(response) {$scope.nextEvents = 'Fehler in eventCtrl-$http: '+response}
	)
}])

// .directive('cppDirective', function(){
// 	return{
// 		restrict:'E',
// 		template: '<div>Hier ist ein neuer Knopf</div>',
// 		controller:'monitorCtrl',
// 		scope: '=',
// 		compile: function (tElem, tAttrs){
// 			//console.log('Original comiled DOM')
// 			return{
// 				pre: function preLink(scope, iElement, iAttrs){
// 					//console.log('pre')
// 				},
// 				post: function postLink(scope, iElement, iAttrs){
// 					//console.log(scope.htmElem)
// 					iElement.append(scope.htmElem)
// 					/*for (var i = 0; i < scope.b.length; i++) {
// 						new iElement.html(scope.b[i])
						
// 					};*/
// 				}
// 			}
// 		}
// 	}
// })


// app.directive('defaultTable', function() { //Solo Template
// 	//console.log('\ndefaultTable');
// 	return{
// 		template:'<h4>defaultTable</h4><hr/>'}
// });

// app.directive('defaultMinTable', function() { //Minimum Example
//  return function(scope, element){
//  	/*console.log('\ndefaultMinTable [scope,element]:');
//  	console.log(scope);
//  	console.log(element);*/
//  }			
// });

// app.directive('defaultTableElement', function() { //Element Example
// 	return{
// 		restrict:'E',
// 		transclude:true,
// 		link: function(scope, element, attrs)
// 		{
// 			/*console.log('\ndefaultTableElement [scope,element,attrs]:')
// 			console.log(scope)
// 			console.log(element)
// 			console.log(attrs)*/

// 		}
// 	}
// });



// app.controller('armorCtrl',function($scope){
// 	$scope.armorNames=[];
// 	this.addRegins = function(){
// 		$scope.armorNames.push("Roman Reign:Juggernaut")
// 	}
// 	this.addRainbows = function(){
// 		$scope.armorNames.push("flox:box")
// 	}
// })
// .directive('armor', function() {
// 	return{
// 		restrict:'E',
// 		controller: 'armorCtrl',
// 		link: function(scope,element,attrs){
// 			element.bind('mouseenter',function(){
// 				//console.log(scope.armorNames)
// 			})
// 		}
// 	}
// })
// .directive('reigns', function(){
// 	return{
// 		require: 'armor',
// 		link: function(scope, element, attrs, armorCtrl){
// 			armorCtrl.addRegins();
// 		}
// 	}
// })
// .directive('rainbows', function(){
// 	return{
// 		require: 'armor',
// 		link: function(scope,element,attrs, armorCtrl){
// 			armorCtrl.addRainbows();
// 		}
// 	}
// })






</script>