<script  type="text/javascript">

/*
Eng: The controller navCtrl uses the $http-service to get JSON-datasets from DB-Views and reorganize them in $scope.
He defines all models and functions

Deu/Ger: Der Controller navCtrl fordert über den $http-service JSON-Datensätze DB-Views und reorganisiert sie in $scope.
Er definiert alle Models und funktionen.
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------
*/ 


//meta topic: https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection
app.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
app.run(function ($rootScope) {
   $rootScope._ = window._;
});

/*Controllers define and handle an Angular area
Ein controller wird für einen bestimmten Sinnabschnitt innerhalb von Angular definiert*/

app.controller('navCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
 //https://docs.angularjs.org/api/ngSanitize/service/$sanitize
$scope.Math = window.Math, reservefinal=false
$scope.sidebarselect = 'start'
// log(Object.keys(_))


  orderbranddata = function(response) {
  // console.log(response)
  //brandinfo RAW (veraltet 10/06):
  /*accesstoken: "5b35793a3",brandDescription: "<h2>description</p>",brandDescriptionFooter: "<h2>FOOTices proin.</p>",brandDescriptionSidebar: "<h2>SIDt felis</p>",
  brandHeadline: "Brand with ID 9",brandImage: "<img class="" src="http://dummyimage.com/200x200/91B561/3D7B6B.jpg&text=Eqpajbuu ID 9",brand_id: "9",brand_name: "Eqpajbuu ID 9",
  branddeprecated: "0",css-style: "<style> body {background-color: ;}</style>",discount: "7.00",event_partner_id: "1",login: "EqpajbuuID9"*/
  $scope.brandinfo = response.brandinfo
  log('\n $scope: response.brandinfo:')
  log($scope.brandinfo[0].protection_of_data_privacy)

  brandinfoprops =['brandDescription', 'brandDescriptionFooter', 'brandDescriptionSidebar', 'brandImage', 'imprint',
   'protection_of_data_privacy', 'terms_and_conditions', 'mail_text_pre', 'mail_text_post', 
   'after_reservation_text_pre', 'after_reservation_text_post', 'registration_acceptance_text']
  _.each(brandinfoprops, function(property){
    if ($scope.brandinfo[0][property]) {

      // log('\n'+property)
      // log($scope.brandinfo[0][property])

      $scope[property] = $sce.trustAsHtml('<div class="edums-'+property+'">'+$scope.brandinfo[0][property+'']+'</div>')
      // log($scope[property])
    }else{$scope.brandinfo[property]=false}
  })
  // log(brandinfo.protection_of_data_privacy)
  // log($scope.brandinfo.protection_of_data_privacy)
  //   // $scope.brandinfo.protection_of_data_privacy = $sce.trustAsHtml('<div>'+$scope.brandinfo[0].protection_of_data_privacy+'</div>')
  // log('$scope.brandinfo.protection_of_data_privacy:')
  // log($scope.brandinfo.protection_of_data_privacy)

  $scope.rinfo={contactpersonemail : '', courses:[], brand:response.brandinfo[0].login, mTeilnehmerZahl:1}

  //topiclist RAW: 
  /*$$hashKey: "object:953", deprecated: "0", topicDescriptionFooter: "<h2>FOOTER Topic ligula. At.</p>", responsibleTrainer_id: "14", topicDescription: "<h2>Topic with ID 1</h2>", 
  topicDescriptionSidebar: "<h2>with ID 1</h2>", topicHeadline: "TOPIC with ID 1", topicImage: "data:image/svg+xml;charset=utf-8,<svg><%2Fsvg>", topicName: "Pkhhoaged", topic_id: "1"*/
  $scope.topics = response.topiclist
   for (var i = 0; i < $scope.topics.length; i++) {
    $scope.topics[i].topicDescriptionFooter = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionFooter+'</div>')
    $scope.topics[i].topicDescription = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescription+'</div>')
    $scope.topics[i].topicDescriptionSidebar = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionSidebar+'</div>')
    $scope.topics[i].topicImage = $sce.trustAsHtml('<div>'+$scope.topics[i].topicImage+'</div>')
   }



  //topiccourselist RAW:
  /*course_id: "43", course_name: "Training 43 in Topic 1 - Level-Rank 1-1", level: "1", rank: "1", topicName: "Pkhhoaged", topic_course_id: "43", topic_id: "1"*/
  $scope.topiccourseCourse = response.topiccourselist 

  

  //courselist RAW:
  /*courseDescription: "<p>Posuere mus.</p>", courseDescriptionCertificate: "<h2>adfadf</ul>", courseDescriptionMail: "<h2>Course description from conec.</p>"
  courseHeadline: "Training 43 in Topic 1 - Level-Rank 1-1", coursePrice: "1075", course_id: "43",  course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
  internet_course_article_id: "14",min_participants: "3", number_of_days: "3"*/
  $scope.courses = response.courselist;
  for (var i = 0; i < $scope.courses.length; i++) {
    $scope.courses[i].courseDescription = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescription+'</div>')
    $scope.courses[i].courseDescriptionCertificate = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionCertificate+'</div>')
    $scope.courses[i].courseDescriptionMail = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionMail+'</div>')
    $scope.courses[i].coursePrice=$scope.courses[i].coursePrice*1
    $scope.courses[i].course_id=$scope.courses[i].course_id*1
    $scope.courses[i].min_participants=$scope.courses[i].min_participants*1
    $scope.courses[i].number_of_days=$scope.courses[i].number_of_days*1
    if ($scope.courses[i].courseHeadline.length<2) {
     $scope.courses[i].courseHeadline=$scope.courses[i].course_name
     
    };
   }

  //coursetotestlist RAW:
  /*v_testcourse - course_id:1, test_id:44*/
  $scope.courseToTest = response.coursetotestlist;


  //eventlist RAW:
  /*courseMaxParticipants: "16", course_id: "74", course_name: "Training 74 in Topic 1 - Level-Rank 2-4", coursedeprecated: "0", event_id: "3873", event_status_id: "2"
  eventguaranteestatus: "2", eventinhouse: "0", finish_date: "2016-03-11", finish_time: "17:00:00", internet_location_name: "Koqlg", locationMaxParticipants: "16"
  location_description: "<h2>Location description from Locatos.</p>", location_id: "177", location_name: "Koqlg", start_date: "2016-03-09", start_time: "13:30:00", test: "0"*/ 
  $scope.eventlist = response.eventlist
  for (var i = 0; i < response.eventlist.length; i++) {
    $scope.eventlist[i].location_description = $sce.trustAsHtml('<div>'+response.eventlist[i].location_description+'</div>')
   }
  $scope.eventlist = $scope.eventlist.sort(function(x,y){return new Date(x.start_date) - new Date(y.start_date)})
        // _.each($scope.eventlist, function(e) {log(e.start_date)} )
  $scope.allNextEvents = response.eventlist //Termine & Anmeldung Modal

  $scope.location=[]
  for (var i = 0; i < response.eventlist.length; i++) {
    var push=true;
    for (var j = 0; j < $scope.location.length; j++) {
      $scope.location[j].width= Math.round((100*j)/$scope.location.length)
      if (response.eventlist[i].location_name == $scope.location[j].name) {
        push=false
      };
    };

    if (push) {
     $scope.location.push(
      {id : response.eventlist[i].location_id, 
      name : response.eventlist[i].location_name,
      description : response.eventlist[i].location_description, 
      locationMaxPart : response.eventlist[i].locationMaxParticipants,
     })      
    };
  }


//stateinfo RAW:
//states of a event - Object[0] {ID:"2", eventguaranteestatus:"guaranteed"}
  response.stateinfo.guaranteed = _.find(response.stateinfo, function(state){
    if (state.eventguaranteestatus.match(/g|G\w+nt/)) {
      return true
    };
  })
  $scope.stateinfo = response.stateinfo


    

//cleanflag var getTest = function(id, courseToTest, courses) {
//    // log(id);  log(courseToTest);  log(courses)
//   _.each(courseToTest, function(cttRef){
//     // log(id)
//     // log(cttRef.course_id)
//     if (id == cttRef.course_id) {   
//       res = _.find(courses, function(course){ return course.course_id == cttRef.test_id }); 
//       // log('res') ; log(res)
//     };

//   })
//   return 
// }


var getTestID = function(id, courseToTest) {
  _.each(courseToTest, function(cttRef){
    // log('id: '+id+' cttRefCourse:'+cttRef.course_id+' ctttest:'+cttRef.test_id)
    if (id == cttRef.course_id) {return cttRef.test_id};
  })
  return false
}
 pl=[], priceListBase=[];
 ta=[], TundA=[], termineAnmeldung=[];

var getDateSortedEventsToCourse = function(id){
  var events = _.filter($scope.eventlist, function(event){ return event.course_id == id });
  var events = _.sortBy(events, 'start_date');
  return events
}


/* Expect: 
*topic as Number

*topiccourseCourse as [{course_id, course_name, level, topicName, topic_course_id, topic_id}] 
  from $scope.topiccourseCourse

*courses as           [{courseDescription, courseDescriptionCertificate, courseDescriptionMail, courseHeadline, coursePrice, 
*                       course_id, course_name, internet_course_article_id, min_participants, number_of_days}] 
  from $scope.courses

*courseToTest as      [{course_id, test_id}] 
  from $scope.courseToTest

**Description:
** Search to a given topic all topic-to-course entrys, define their propertys, search in courses for test/exam,
** define propertys for TundA.

* return courselist Array[course-Object 1-n]
*/
var defineCourseList = function(topic, topiccourseCourse, courses, courseToTest){
  var courselist = []
  // log('topic:');  // log(topic);
  _.each(topiccourseCourse, function(mntopiccourse){
      // log('mntopiccourse:');      // log(mntopiccourse);      // log(mntopiccourse.topic_id+' - '+topic.topic_id);
    if (mntopiccourse.topic_id == topic.topic_id) {
      _.each(courses, function(course){
        if (course.course_id == mntopiccourse.course_id) {
          // log('topic '+topic.topic_id+' course '+course.course_id+' L:'+mntopiccourse.level+' R:'+mntopiccourse.rank)

          course.level = mntopiccourse.level //Anzeigereihenfolge in Panel
          course.rank = mntopiccourse.rank
          course.brutto = course.coursePrice*1.19
          course.sysName = course.course_name.replace(/\W+/g,''); //PanelIds

          course.test_id= getTestID(course.course_id, courseToTest)
// var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => 2
          course.examRef = _.find(courseToTest,function(ref){return ref.course_id == course.course_id})//courseToTest.find(function(ref){return ref.course_id == course.course_id})

          if (course.examRef) {
            course.exam = _.find(courses,function(c){return c.course_id == course.examRef.test_id})//courses.find(function(c){return c.course_id == course.examRef.test_id})
            if (course.exam) {
              tmpevent = _.find($scope.eventlist,function(e){return course.exam.course_id == e.course_id && e.start_date >= course.start_date})//$scope.eventlist.find(function(e){return course.exam.course_id == e.course_id && e.start_date >= course.start_date})
              if (tmpevent) {
                course.exam.event_id = tmpevent.event_id
              };
            };

            // course.exam.courseDescription = $sce.trustAsHtml('<div>'+course.exam.courseDescription+'</div>')            
          }else{course.exam=0;}
          // if (course.examRef) {log('course['+course.course_id+'].exam:');log(course.examRef);log(course.exam);};

          course.events=getDateSortedEventsToCourse(course.course_id)
          if(course.events[0]){course.duration = _.isDate(course.events[0].start_date)}//-course.events[0].finish_date}


          TundA.push({name: topic.topicName+' - '+course.course_name,
          sysname: course.sysName,
          course_id: course.course_id,
          exam: course.exam,
          examRef: course.examRef,
          price: course.coursePrice,
          location: course.location_name,
          start: course.start_date,
          finish: course.finish_date,
          topic: i})
 
          // if (course.exam) { //wenn kein exam existiert ist es ein exam und hat in der liste nix zu suchen
            courselist.push(course)
          // };
        };
      })
    }; 
  })
  return courselist
}


/*The primary sortfunction adds to the topicobject its courses and define its test-status.
It also define pl for createPrizeList, ta for createModalList & finishEventlist as referenceobjects*/

var setCourseList = function (topics, topiccourseCourse, courses, courseToTest){
  _.each(topics, function(topic){
    topic.courseList = defineCourseList(topic, topiccourseCourse, courses, courseToTest)
    // log('topic.courseList:');
    // _.each(topic.courseList, function(course){log(course.level+' | '+course.rank)})
    // log(topic.courseList);
    // log('aftersort:');                                   topic.courseList, 'level' )
    topic.courseList =  _(topic.courseList).chain().sortBy(function(course) {
        return course.rank;
    }).sortBy(function(course) {
        return course.level;
    }).value();
    topic.courseToggle

    // _.each(topic.courseList, function(course){log(course.level+' | '+course.rank)})
    // log(topic.courseList);
  })
}
setCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)







/*search matches in course- and eventlist and push them to the Topic*/
var cereateEventList = function(top, eve){
 for (var i = 0; i < top.length; i++) {
  top[i].eventList=[]
   for (var j = 0; j < top[i].courseList.length; j++) {
     for (var k = 0; k < eve.length; k++) {
       if (eve[k].course_id == top[i].courseList[j].course_id) {
         top[i].eventList.push(eve[k])
       };
     };
   };
 };
}
cereateEventList($scope.topics, $scope.eventlist)











/*underscore-copy of finishEventlist*/
function setEventList(TundA) {
  res = []
  _.each($scope.topics, function(topic) {
    _.each(topic.eventList, function(event){
      _.each(TundA, function(tableEntry){
        if (tableEntry.course_id == event.course_id) {
          event.price = tableEntry.price
          //clenflag event.test = tableEntry.test
          event.exam = tableEntry.exam
          event.test_id = tableEntry.test_id
          
          // cleanflag: ersetzt durch underscore wegen abwärtskompatibilität
          // event.guaranteelabel = $scope.stateinfo.find(
          //                               function(state){
          //                                 return state.ID ==event.eventguaranteestatus})
          //                               .eventguaranteestatus
          event.guaranteelabel = _.find($scope.stateinfo,function(state){return state.ID ==event.eventguaranteestatus}).eventguaranteestatus

          //trainerinfo nicht vorhanden
          // cleanflag event.trainer = topic.responsibleTrainer_id
          //model for checkboxes
          event.checked = false
          if (event.exam) {
            event.exam.checked = false
          };
          //value for panel-click-serachfield interaction
          event.namefortable = event.course_name +' ('+ topic.topicName+')'          

        };
      })
      res.push(event) 
    })
  })
return res;
}


$scope.extendedEventlist =  setEventList(TundA);
// log($scope.extendedEventlist)
// $scope.extendedEventlist = $scope.extendedEventlist.filter((event) =>{log(typeof event.exam); return typeof event.exam != 'Object'})
// log($scope.extendedEventlist)




 
  //HTML5 3.2.3.1: Das id-Attribut darf kein Leerzeichen enthalten deshalb wird der topicName nach name_raw kopiert u. anschließend die Leerzeichen entfernt
  for (var i = 0; i < $scope.topics.length; i++) {
   $scope.topics[i].topic_name_raw = $scope.topics[i].topicName;   
   $scope.topics[i].topic_nr = i;   
   $scope.topics[i].topic_name = $scope.topics[i].topicName.replace(/\s+/g,'');//löscht alle Leerzeichen   
  }
  /*Suche Kurse und weise sie den Topics zu. Suche events zu den Kursen der Topics und weise sie den Topics zu*/
  // var aNE=$scope.allNextEvents
  for (var i = 0; i < $scope.topics.length; i++) { //für alle topics
   // console.log('$scope.topics.length: '+$scope.topics.length)
   var t=$scope.topics[i]
   if (!$scope.topics[i].sideBarCourses){$scope.topics[i].sideBarCourses=[]}//lege sidebarArray für topic an

   //filter events to the topic
   var courseZuTopic = _.filter($scope.topiccourseCourse, function(x){return t.topic_id == x.topic_id})
   var eventZuCourse = _.filter($scope.eventlist, function(x){
                      var isInList = false
                      _.each(courseZuTopic, function(c){if(c.course_id == x.course_id && x.test != 1){
                        isInList=true}})
                    return isInList})
   _.each(eventZuCourse, function(e){e.sysName = e.course_name.replace(/\W+/g,'')})
   $scope.topics[i].sideBarCourses = eventZuCourse;
  };
  $scope.sideBarCoursesStart = _.filter($scope.eventlist, function(x){return x.test != 1})
  console.log('fertiges $scope.topics: ', $scope.topics); 

        /*//On topic-tab or course-accordion click -> change URL-field: window.history.replaceState('Object', 'Title', '/another-new-url');
        $scope.panelList = {}
        // log('asdf')

          // console.log('fertiges $scope.topics: ', $scope.topics); 
        $scope.topics.forEach(
          function(topic){
            $scope.panelList[topic.topic_name] = { name : topic.topic_name, visible:false }
          }
        )
        $scope.openPanel = function(element) {  
          var panelElement = $scope.topics.find(function(entry){return element==entry.name} )
          _.each($scope.panelList, function(panel){ panel.visible = false })
          panelElement.visible = true
          log(panelElement)
        }
        $scope.modifyURL = function(element) {
          var element = element||''
            window.history.replaceState('Object', 'Title', '/'+element);
          if (element) {
          };
        }
        */
  }

//If Navbar get clicked, the value in the modal-search-bar becomes the name of the Navbarelement
$scope.tablesearchchange = function(name){

  $scope.tablesearch = name
  $scope.sidebarselect = name
  // name= name.replace(/\s+/g,'')
  // openPanel(name)
}


/*ng-models for imputs*/
//cleanflag $scope.rinfo={contactpersonemail : '', courses:[], brand:$scope.brandinfo.login}
$scope.teilnehmerZahlcountDown = function() {
  if ($scope.rinfo.mTeilnehmerZahl>1) {$scope.rinfo.mTeilnehmerZahl = $scope.rinfo.mTeilnehmerZahl-1};
}


$scope.sortType = 'start_date'
$scope.sortReverse = false


/*On click a ckeckbox from the TAModal:
-> Handle 'Picked' list*/
$scope.reservationlistupdate = function(c) { //c = course/event thats picked
  var reslist = $scope.rinfo.courses, oneIsChecked = false, sum = 0
  // var isInList = reslist.find(function(p){return c.event_id==p.event_id})
  var isInList = _.find(reslist,function(p){return c.event_id==p.event_id})
  if (c.checked || c.exam.checked) {oneIsChecked=true};
  if (oneIsChecked) {
    if (!isInList) {
      if (c.exam) {c.exam.checked=true};
      reslist.push(c)
    };
  }else{
    for (var i = 0; i < reslist.length; i++) {
      if (reslist[i].event_id == c.event_id) {reslist.splice(i,1)};    
    };
  }
  // log('reslist: ')
  // log(reslist)
}

/*On click 'btnreserve' from a sidebar-element:
-> set event and exam checked, update reservationlist, hide button */
$scope.btnRegFkt = function(e) { //c = event
  e.checked = true
  if (e.exam != 0) {e.exam.checked=true};
  $scope.rinfo.courses.push(e)
  e.btnRegister=!e.btnRegister
  // log('btnRegFkt -> $scope.rinfo.courses push:')
  // log($scope.rinfo.courses)
}





/*On click btn reservate from siderbar-element or Modal:
-> create a final reservationobject from selections and send it to the api-server*/

$scope.reservate = function(e) {
 // $scope.rinfo.reserveparticipants = $scope.reserveparticipants
 // console.log('reservepush: ')

 $scope.rinfo.eventIds=[]
 $scope.send = {eventIds:[]} 

 _.each($scope.rinfo.courses, function(c){

    if (c.checked) {
      $scope.send.eventIds.push(c.event_id)
    };

    if (c.exam.checked) {
      $scope.send.eventIds.push(c.exam.events[0].event_id)
    };
  })

 console.log('rinfo: ',$scope.rinfo)
 $scope.send.contactpersonemail = $scope.rinfo.contactpersonemail, $scope.send.brandid = $scope.brandinfo[0].brand_id, $scope.send.mTeilnehmerZahl = $scope.rinfo.mTeilnehmerZahl
 

 log('POST: '); 
 log($scope.send);
 /*send send-data to api-svr*/
 $scope.rinfo.finish = false;
 if ($scope.send.eventIds.length > 0 && $scope.send.contactpersonemail.match(/@/)) {
   $http({
        method: 'POST',
        url: apisvr+'/'+$scope.brandinfo[0].login+'/'+$scope.brandinfo[0].accesstoken+'/reserve',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, //json
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(JSON.stringify(obj[p])));
            return str.join("&");
        },
        data:  $scope.send
    })
   .then(function(response) {
      //expect origin error, ignore.
      $scope.rinfo.finish = true;
      }, function(response) {

        //expect origin error, ignore.
        $scope.rinfo.finish = true;
        log('$scope.rinfo.finish = '+$scope.rinfo.finish);

        $scope.data = response || "Request failed";
        $scope.status = response.status;
      });
 };
}






//Bootstrap by default dont support nested modals. This jQuery-functions get called on click various 'btnclose'
//->http://getbootstrap.com/javascript/#modals
$scope.dismissInnerModalA = function(){ $("#modal-container-3").modal("hide") }
$scope.dismissInnerModalB = function(){ $("#modal-container-4").modal("hide") }
$scope.dismissInnerModalC = function(){ $("#modal-container-2").modal("hide") }
$scope.dismissInnerModalD = function(){ $("#modal-container-5").modal("hide") }
$scope.dismissInnerModalE = function(){ 
  $("#modal-container-1").modal("hide") 
  $("#modal-container-2").modal("hide") 
  $("#modal-container-3").modal("hide") 
  $("#modal-container-4").modal("hide") 
  $("#modal-container-5").modal("hide") 
}

/*

$scope.dismissInnerModalA = function(){

 $("#modal-container-3").modal("hide") 
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
}
$scope.dismissInnerModalB = function(){

 $("#modal-container-4").modal("hide") 
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
}
$scope.dismissInnerModalC = function(){

 $("#modal-container-2").modal("hide") 
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
}
$scope.dismissInnerModalD = function(){

 $("#modal-container-5").modal("hide") 
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
}
$scope.dismissInnerModalE = function(){ 
  $("#modal-container-1").modal("hide") 
  $("#modal-container-2").modal("hide") 
  $("#modal-container-3").modal("hide") 
  $("#modal-container-4").modal("hide") 
  $("#modal-container-5").modal("hide") 
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
}


*/



$scope.getClass = function(topicName){ 
 if (topicName == '') {
  return 'active' 
 }else{
  return ''
 }
}
orderbranddata(response);
}]);




function log(a){console.log(a)}
</script>