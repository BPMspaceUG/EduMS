<script type="text/javascript">

app.controller('monitorCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
	$scope.tabellen=[];

	for (var i = 0; i < 3; i++) {//dummys
		$scope.tabellen[i]={name:'tbl'+i,info:'info'+i,header:'H'+i,rows:[['a','b','c'],['ä','ö','ü'],['x','y','z']]}
	};

	$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getMonitor')
	.then(function(response) {
		//console.log($scope.resdata = response.data)
		a=Object.keys(response.data)
		if (a.length>3) {			
			for (var i = 0; i < a.length-2; i++) {
				//console.log(Object.keys(response.data[a[i]][0]));
				$scope.tabellen[i]={
					name:a[i],
					info:'info'+i,
					header:Object.keys(response.data[a[i]][0]),
					rows:response.data[a[i]]
				}				
				//console.log(response.data[a[i]])
				for (var j = 0; j < $scope.tabellen[i].rows.length; j++) {
					if (typeof $scope.tabellen[i].rows[j] == 'string') {						
						if ($sce.trustAsHtml($scope.tabellen[i].rows[j])) {
							$scope.tabellen[i].rows[j] = $sce.trustAsHtml($scope.tabellen[i].rows[j])
						};
					};
				};
			};
		};		
	},function(response) {$scope.nextEvents = 'Fehler in eventCtrl-$http: '+response}
	)
}])
</script>