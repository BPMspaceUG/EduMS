<script  type="text/javascript">

//meta topic: https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection
app.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
app.run(function ($rootScope) {
   $rootScope._ = window._;
});

app.controller('formCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
//http://localhost:4040/EduMS-client/index.php?navdest=reserveform&brand_id=1&course_id=74,174&participants=2
$scope.Math = window.Math, reservefinal=false
 
var course_id = course_id || false, participants = participants || 1, brand_id = brand_id || 1;
/*ng-models for imputs*/
$scope.rinfo={organisation : '', contactname : '', contactsname : '', 
  contactpersonemail : '', street : '', housenr : '', city : '',
    zip : '', country : '', courses:[]}
/*add and remove Partitioner namefields in the Modal*/
$scope.reserveparticipants = [{name:'', sname:'', email:'', certificate:''}];
$scope.addInput = function(){
    $scope.reserveparticipants.push({name:'', sname:'', email:'', certificate:''});
}
$scope.removeInput = function(index){
    $scope.reserveparticipants.splice(index,1);
}



 $scope.rinfo.reserveparticipants = [{name:'', sname:'', email:'', certificate:''}]
 console.log('reservepush: ')
 console.log($scope.rinfo)
 $http.post('/EduMS/api/index.php/'). //+$scope.brandinfo[0]+'/'+$scope.brandinfo[1]+'/reserve', $scope.rinfo).
 
        then(function(response) {
          // console.log(reservefinal='reserveinfo send to:[POST]/EduMS/api/index.php/'+$scope.brandinfo[0].login+'/'+$scope.brandinfo[0].accesstoken+'/reserve')
        }, function(response) {
          $scope.data = response || "Request failed";
          $scope.status = response.status;
      });

  


}]);






function log(a){console.log(a)}
</script>