<script  type="text/javascript">
/* 
Angular Controller EduMS_Ctrl description:

------------------------------------------------------------------------------------------------------------------------------
Eng:
Definition, sorting and combining of all receaved content-data to integrate in Angular models.  

funcitons overview: 
  orderbranddata  - sorting of receaved Infos for brand and $sce validating
  getTestID - find test/exam-ID to a course-ID
  eventonly - define pageconstellation for events
  descriptiononly - define pageconstellation for descriptions
  getDateSortedEventsToCourse - find events to courses for sidebar
  defineCourseList -  preparte courselist
  setCourseList -   sort courselist
  cereateEventList - assign events to topics 
  setEventList -  sort events and expand list with additional models
  tablesearchchange - automatic change of the modal searchfield
  teilnehmerZahlcountDown - coutner for partitionerarrow 
  reservationlistupdate - handling changes of the reservationlist
  btnRegFkt - handling for initialbuttons of sidebarelements
  reservate - define and send reservation
  dismissInnerModalA-D -  handling for closebehavior of (overlayed) modals
-------------------------------------------------------------------------------------------------------------------------------

-------------------------------------------------------------------------------------------------------------------------------
Deu/Ger:  
Definition, Sortierung und Verflechtung aller empfangener Content-Daten zur Eingliederung in Angular Models.  

Funktionenübersicht: 
  orderbranddata  -  Sortieren der emfapngenen Infos zu Brand und $sce validierung
  eventonly - definiere den Seitenaufbau für Events
  descriptiononly - definiere den Seitenaufbau für Beschreibungen (descriptions)
  getTestID -   TestID zu einer KursID finden
  getDateSortedEventsToCourse -   Events zu Kursen für Sidebar finden
  defineCourseList -  Kursliste vorbereiten
  setCourseList -   Kursliste sortieren 
  cereateEventList -  Events den Topics zuordnen 
  setEventList -  Events sortieren und Liste um Models ergänzen
  tablesearchchange -   Automatische änderung des Suchfeldes im Modal
  teilnehmerZahlcountDown -   Couter für Teilnehmerzahl 
  reservationlistupdate -   Handling für Änderungen in der Reservierungsauswahlliste
  btnRegFkt -   Handling für Initialbuttons der Sidebarelemente
  reservate -   Reservierung definieren und senden
  dismissInnerModalA-D -  Handling für das Schließverhalten der (sich überlagernden) Modale
------------------------------------------------------------------------------------------------------------------------------
*/
/* 
Integrate the underscorejs script to Angular
meta topic: https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection
*/
app.constant('_', window._)
app.run(function ($rootScope) {
   $rootScope._ = window._;
});

/*
Controllers define and handle an Angular area
Ein controller wird für einen bestimmten Sinnabschnitt innerhalb von Angular definiert
*/
app.controller('navCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
 //https://docs.angularjs.org/api/ngSanitize/service/$sanitize
$scope.Math = window.Math, reservefinal=false
$scope.sidebarselect = 'start'
$scope.show = {ct:false, eventOnly:false}


  /*
  Pass every submitted HTML section through $sce.trustAsHtml. 
  After this process, HTML-content can be injected with 'ng-bind-html'
  */
  orderbranddata = function(response) {
  $scope.brandinfo = response.brandinfo
  brandInfoKeys =['brandDescription', 'brandDescriptionFooter', 'brandDescriptionSidebar', 'brandImage', 'imprint',
   'protection_of_data_privacy', 'terms_and_conditions', 'mail_text_pre', 'mail_text_post', 
   'after_reservation_text_pre', 'after_reservation_text_post', 'registration_acceptance_text']
  _.each(brandInfoKeys, function(property){
    if ($scope.brandinfo[0][property]) {
      $scope[property] = $sce.trustAsHtml('<div class="edums-'+property+'">'+$scope.brandinfo[0][property+'']+'</div>')
    }else{$scope.brandinfo[property]=false}
  })
  $scope.rinfo={contactpersonemail : '', courses:[], brand:response.brandinfo[0].login, mTeilnehmerZahl:1}

  $scope.topics = response.topiclist
   for (var i = 0; i < $scope.topics.length; i++) {
    $scope.topics[i].topicDescriptionFooter = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionFooter+'</div>')
    $scope.topics[i].topicDescription = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescription+'</div>')
    $scope.topics[i].topicDescriptionSidebar = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionSidebar+'</div>')
    $scope.topics[i].topicImage = $sce.trustAsHtml('<div>'+$scope.topics[i].topicImage+'</div>')
   }

   $scope.topiccourseCourse = response.topiccourselist 

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

  $scope.courseToTest = response.coursetotestlist;

  $scope.eventlist = response.eventlist
  for (var i = 0; i < response.eventlist.length; i++) {
    $scope.eventlist[i].location_description = $sce.trustAsHtml('<div>'+response.eventlist[i].location_description+'</div>')
   }
  $scope.eventlist = $scope.eventlist.sort(function(x,y){return new Date(x.start_date) - new Date(y.start_date)})


  /*
  If the initial url gets the parameter "eventonly=true":
  - create a list
  - show it and hide the rest

  Additional prameter dependencies cases:
  1. topic (optional course)
  2. location (optional topic OR-AND course)
  3. course but no topic
  4. just eventonly
  */
  var errHead = 'ERROR: requested ', errTail = ' not found or is not associeted with your organisation.'
  eventonly = function(){
    var get = response.url_GET, course = get.course || false, location = get.location || false,
     topic = get.topic || false
    // Initial check if event only mode is selected
    if (get.eventonly == 'true') {
      log('eventonly:')
      $scope.show.ct = false, $scope.show.eventOnly = true 
      $scope.soloevent = {list:[], count: get.count || 5}

      //case 1: only topic and optional course
      if (topic && !location) {
        var matchTopic = _.filter($scope.topics, function(T){ return T.topic_name_raw == topic})
        if (matchTopic[0]) {
          $scope.soloevent.list = matchTopic[0].eventList

          if (course) {
            $scope.soloevent.list = _.filter($scope.soloevent.list, function(E){return E.course_name == course})
          };
        }else{            
            $scope.soloevent.error = errHead+'topic("'+topic+'")'+errTail 
        }
      }

      //case 2: location and optional topic and course
      else if(location){
        $scope.soloevent.list = _.filter($scope.eventlist, function(E){
          var res = E.internet_location_name == location
          if (topic && res) {res = E.topic_name_raw == topic};
          if (course && res) {res = E.course_name == course};
          return res
        })
        if ($scope.soloevent.list.length < 1) {
            $scope.soloevent.error = errHead+'location("'+location+'") topic("'+topic+'") course("'+course+'")'+errTail 
        };
      }

      //case 3: course but no topic
      else if(course && !topic){
        $scope.soloevent.list = _.filter($scope.eventlist, function(E){
          var res = (E.course_name == course)
          return res
        })
        if ($scope.soloevent.list.length < 1) {
            $scope.soloevent.error = errHead+'location("'+location+'") topic("'+topic+'") course("'+course+'")'+errTail 
        };
      }

      //case 4: just eventonly
      else{
        $scope.soloevent.list = $scope.eventlist
      };
    }    
  }
  /*
  If the initial url gets the parameter "descriptiononly=true":
  - extract and show description(s)
  - hide the rest

  Additional prameter dependencies cases:
  brand, topic, course, location
  */
  descriptiononly = function(){
    var get = response.url_GET, brand=get.brand, course = get.course || false, location = get.location || false,
     topic = get.topic || false, res = {}
     if (get.descriptiononly) {
        $scope.show.ct = false, $scope.show.descriptionOnly = true

        if (brand) {
          res.brandDescription = $scope.brandinfo[0].brandDescription };
        
        if (topic) {
          res.topic = _.filter(response.topiclist, function(T){ return T.topic_name_raw == topic})
          if (res.topic[0]) {
            res.topic = res.topic[0].topicDescription
          }else{            
            res.topic = errHead+'topic('+topic+')'+errTail 
          }
        };

        if (course) {
          res.course = _.filter(response.courselist, function(C){ return C.course_name == course}) 
          if (res.course[0]) {
            res.course = res.course[0].courseDescription 
          } else{            
            res.course = errHead+'course('+course+')'+errTail 
          }
        };

        if (location) {
          res.location = _.filter($scope.eventlist, function(E){ return E.internet_location_name == location})
          if (res.location[0]) {
            res.location = res.location[0].location_description 
          }else{            
            res.location = errHead+'location('+location+')'+errTail 
          }
        };

        if (!brand && !topic && !course && !location) {
          res.brandDescription = $scope.brandinfo[0].brandDescription
        };
     };
     $scope.solodescription = res
  }


  response.stateinfo.guaranteed = _.find(response.stateinfo, function(state){
    if (state.eventguaranteestatus.match(/g|G\w+nt/)) {
      return true
    };
  })
  $scope.stateinfo = response.stateinfo

/*
Return the test-Id if exits in the reference table to a commited course-Id. If not return false.
*/
var getTestID = function(id, courseToTest) {
  _.each(courseToTest, function(cttRef){
    if (id == cttRef.course_id) {return cttRef.test_id};
  })
  return false
}
 pl=[], priceListBase=[];
 ta=[], eventRegistration=[], termineAnmeldung=[];

/*
Return a sorted Array of events to a commited course-Id
*/
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
** define propertys for eventRegistration.

* return courselist Array[course-Object 1-n]
*/
var defineCourseList = function(topic, topiccourseCourse, courses, courseToTest){
  var courselist = []
  _.each(topiccourseCourse, function(mntopiccourse){
    if (mntopiccourse.topic_id == topic.topic_id) {
      _.each(courses, function(course){
        if (course.course_id == mntopiccourse.course_id) {

          course.level = mntopiccourse.level //Anzeigereihenfolge in Panel
          course.rank = mntopiccourse.rank
          course.brutto = course.coursePrice*1.19
          course.sysName = course.course_name.replace(/\W+/g,''); //PanelIds

          course.test_id= getTestID(course.course_id, courseToTest)

          course.examRef = _.find(courseToTest,function(ref){return ref.course_id == course.course_id})

          if (course.examRef) {
            course.exam = _.find(courses,function(c){return c.course_id == course.examRef.test_id})
            if (course.exam) {
              tmpevent = _.find($scope.eventlist,function(e){return course.exam.course_id == e.course_id && e.start_date >= course.start_date})
              if (tmpevent) {
                course.exam.event_id = tmpevent.event_id
              };
            };
           
          }else{course.exam=0;}

          course.events=getDateSortedEventsToCourse(course.course_id)
          if(course.events[0]){course.duration = _.isDate(course.events[0].start_date)}

          eventRegistration.push({name: topic.topicName+' - '+course.course_name,
          sysname: course.sysName,
          course_id: course.course_id,
          exam: course.exam,
          examRef: course.examRef,
          price: course.coursePrice,
          location: course.location_name,
          start: course.start_date,
          finish: course.finish_date,
          topic: i})
          courselist.push(course)

        };
      })
    }; 
  })
  return courselist
}

/*
The primary sortfunction adds to a topicobject its courses and define its test-status.
It also define pl for createPrizeList, ta for createModalList & finishEventlist as referenceobjects
*/
var setCourseList = function (topics, topiccourseCourse, courses, courseToTest){
  _.each(topics, function(topic){
    topic.courseList = defineCourseList(topic, topiccourseCourse, courses, courseToTest)

    //inner-sort the courses like level(1, 2, 3[rank{1, 2, 3, ...}], ...)
    topic.courseList =  _(topic.courseList).chain().sortBy(function(course) {
        return course.rank;
    }).sortBy(function(course) {
        return course.level;
    }).value();
    topic.courseToggle
  })
}
setCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)

/*
search matches in course- and eventlist and push them to the Topic
*/
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

/*
Return an Array of all events for the main-modal. 
Assign price, exams, guaranteelabels and models for checkboxes
*/
function setEventList(eventRegistration) {
  res = []
  _.each($scope.topics, function(topic) {
    _.each(topic.eventList, function(event){
      _.each(eventRegistration, function(tableEntry){
        if (tableEntry.course_id == event.course_id) {
          event.price = tableEntry.price
          event.exam = tableEntry.exam
          event.test_id = tableEntry.test_id
          event.guaranteelabel = _.find($scope.stateinfo,function(state){return state.ID ==event.eventguaranteestatus}).eventguaranteestatus

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
$scope.extendedEventlist =  setEventList(eventRegistration);

//HTML5 3.2.3.1: Das id-Attribut darf kein Leerzeichen enthalten deshalb wird der topicName nach name_raw kopiert u. anschließend die Leerzeichen entfernt
/*
Generate from the topicname an HTML-valid Id-Attribute string.
*/
for (var i = 0; i < $scope.topics.length; i++) {
 $scope.topics[i].topic_name_raw = $scope.topics[i].topicName;   
 $scope.topics[i].topic_nr = i;   
 $scope.topics[i].topic_name = $scope.topics[i].topicName.replace(/\s+/g,'');//deletes every space-char   
}

/*
Define sidebarreference-arrays for every topic. 
Search events to the courses in the topics and assign this list to the topics.
*/
for (var i = 0; i < $scope.topics.length; i++) { //für alle topics
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
  eventonly()
  descriptiononly()
}

/*
If Navbar get clicked, the value in the modal-search-bar becomes the name of the Navbarelement
and the Browser-URL-field get updated with ?topic= name of the Navbarelement
*/
$scope.tablesearchchange = function(name){
  $scope.tablesearch = name
  $scope.sidebarselect = name
  //only update the state if topics are selectable
  if (!$scope.show.ct == false) {
    window.history.replaceState('','','index.php?topic='+name)
  };
  // name= name.replace(/\s+/g,'')
  // openPanel(name)
}

/*
Handlefunction for clickevents -> click arrow-down next to partitioners
*/
$scope.teilnehmerZahlcountDown = function() {
  if ($scope.rinfo.mTeilnehmerZahl>1) {$scope.rinfo.mTeilnehmerZahl = $scope.rinfo.mTeilnehmerZahl-1};
}

$scope.sortType = 'start_date'
$scope.sortReverse = false

/*
On click a ckeckbox from the main-modal:
If either a course and/or its exam is selected handle/update the reservation list.
*/
$scope.reservationlistupdate = function(c) { //c = course/event thats picked
  var reslist = $scope.rinfo.courses, oneIsChecked = false, sum = 0
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
}

/*
On click 'btnreserve' from a sidebar-element:
-> set event and exam checked, update reservationlist, hide button 
*/
$scope.btnRegFkt = function(e) { //c = event
  e.checked = true
  if (e.exam != 0) {e.exam.checked=true};
  $scope.rinfo.courses.push(e)
  e.btnRegister=!e.btnRegister
}

/*
On click btn reservate from siderbar-element or Modal:
-> create a final reservationobject from selections and send it to the api-server
*/
$scope.reservate = function(e) {
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

/*
Functions to handle the behavior on closing overlayed modals
Bootstrap by default dont support nested modals. This jQuery-functions get called on click various 'btnclose'
->http://getbootstrap.com/javascript/#modals
*/
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

$scope.getClass = function(topicName){ 
 if (topicName == '') {
  return 'active' 
 }else{
  return ''
 }
}
orderbranddata(response);
if (!($scope.show.eventOnly || $scope.show.descriptionOnly)) {$scope.show.ct = true};

/*After a complete loading, select the in the URL preselectet topic */
$( document ).ready(function() {
    var selector = 'nav-'+response.preselectedTopic.replace(/\s+/g,'')
    $( '#'+selector ).click()
  });
}]);

function log(a){console.log(a)}
</script>