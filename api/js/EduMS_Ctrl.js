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
  console.log(response)
  //brandinfo RAW:
  /*accesstoken: "5b35793a3",brandDescription: "<h2>description</p>",brandDescriptionFooter: "<h2>FOOTices proin.</p>",brandDescriptionSidebar: "<h2>SIDt felis</p>",
  brandHeadline: "Brand with ID 9",brandImage: "<img class="" src="http://dummyimage.com/200x200/91B561/3D7B6B.jpg&text=Eqpajbuu ID 9",brand_id: "9",brand_name: "Eqpajbuu ID 9",
  branddeprecated: "0",css-style: "<style> body {background-color: ;}</style>",discount: "7.00",event_partner_id: "1",login: "EqpajbuuID9"*/
  $scope.brandinfo = response.brandinfo
  $scope.brandinfo.brandDescription = $sce.trustAsHtml('<div>'+response.brandinfo[0].brandDescription+'</div>')
  $scope.brandinfo.brandDescriptionFooter = $sce.trustAsHtml('<div>'+response.brandinfo[0].brandDescriptionFooter+'</div>')
  $scope.brandinfo.brandDescriptionSidebar = $sce.trustAsHtml('<div>'+response.brandinfo[0].brandDescriptionSidebar+'</div>')
  $scope.brandinfo.brandImage = $sce.trustAsHtml('<div>'+response.brandinfo[0].brandImage+'</div>')


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

  $scope.allNextEvents = response.eventlist //Termine & Anmeldung Modal
  $scope.nextEvents =  Object.keys(response.eventlist)
  .map(function (key) {return response.eventlist[key]});
  $scope.nextEvents = $scope.nextEvents.slice(0,4) //Sidebar-next 'x' Events

  for (var i = 0; i < $scope.nextEvents.length; i++) { //directive: 'rightBarCourseAll' -> helpVariables init
   $scope.nextEvents[i].btnInfo=false; //Show cleanflag
   $scope.nextEvents[i].btnRegister=false; //Show
   if (i==1) {$scope.nextEvents[i].btnInfo=true}; //Sample cleanflag
   $scope.nextEvents[i].sysName=$scope.nextEvents[i].course_name.replace(/\W+/g,'');
   //console.log('nextEvents['+i+']:');console.log($scope.nextEvents[i]); console.log('')
  };

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
  $scope.stateinfo = response.stateinfo


    

var getTest = function(id, courseToTest, courses) {
  _.each(courseToTest, function(cttRef){
    if (id == cttRef.course_id) {
      log( 'cttRef' )         
      log( cttRef )         
      for (var i = 0; i < courses.length; i++) {
        if(courses[i].course_id == cttRef.test_id){
          log( 'courses['+i+']' )         
          log( courses[i] )
          return courses[i]          
        }
      };
    };
  })
  return 0
}

var getTestID = function(id, courseToTest) {
  _.each(courseToTest, function(cttRef){
    if (id == cttRef.course_id) {return cttRef.test_id};
  })
  return false
}
 pl=[], priceListBase=[];
 ta=[], termineAnmeldung=[];
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

var getDateSortedEventsToCourse = function(id){
  var events = _.filter($scope.eventlist, function(event){ return event.course_id == id });
  var events = _.sortBy(events, 'start_date');
  // log('events')
  // log(events)
  // log('endeevents')
  return events
}

var defineCourseList = function(topic, topiccourseCourse, courses, courseToTest){
  var courselist = []
  // log('topic:');
  // log(topic);
  _.each(topiccourseCourse, function(mntopiccourse){
      // log('mntopiccourse:');
      // log(mntopiccourse);
      // log('.');
      // log(mntopiccourse.topic_id+' - '+topic.topic_id);
    if (mntopiccourse.topic_id == topic.topic_id) {
      _.each(courses, function(course){
        if (course.course_id == mntopiccourse.course_id) {
          // log('topic '+topic.topic_id+' course '+course.course_id+' L:'+mntopiccourse.level+' R:'+mntopiccourse.rank)

          course.level = mntopiccourse.level //Anzeigereihenfolge in Panel
          course.rank = mntopiccourse.rank
          course.brutto = Math.round(course.coursePrice*1.19)
          course.sysName = course.course_name.replace(/\W+/g,''); //PanelIds
          course.test= getTest(course.course_id, courseToTest, courses)
          course.test_id=getTestID(course.course_id, courseToTest)
          course.events=getDateSortedEventsToCourse(course.course_id)

          courselist.push(course)
        };
      })
    }; 
  })
  return courselist
}
setCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)


var defineCourseTabs = function(){
  _.each(topics, function(topic){
    topic.courseList = []
  })
  var topicTabs = []
}





















log('__________------------TRENNER')
var createCourseList = function (top,mn,cou, mnctt){
// console.log(mnctt)
  for (var i = 0; i < top.length; i++) {//Jedes Topic bekommt eine Kursliste
    top[i].courseList = (function(){
        var courseList = [];
        for (var j = 0; j < mn.length; j++) {//gehe Topic-Course m:n Tabelle durch
          if (mn[j].topic_id == top[i].topic_id) { //Wenn m:n-Eintrag = dem aktuellen Topic ist
            for (var k = 0; k < cou.length; k++) {//gehe Kurstabelle durch
              if(mn[j].course_id == cou[k].course_id){// Wenn m:n-Eintrag (T-C) = dem aktuellen Kurs ist
               //Zuteilung
               cou[k].level = mn[j].level //Anzeigereihenfolge in Panel
               cou[k].rank = mn[j].rank
               cou[k].brutto = Math.round(cou[k].coursePrice*1.19)
               cou[k].sysName = cou[k].course_name.replace(/\W+/g,''); //PanelIds
               cou[k].test=(function() {for (var m = 0; m < mnctt.length; m++) { if (cou[k].course_id==mnctt[m].test_id) {return 1}} return 0})()
               cou[k].test_id=(function() {
                for (var m = 0; m < mnctt.length; m++) {
                 /*Ausgabe für darunterliegendes if.. console.log('cou['+k+'].course_id: '+cou[k].course_id+', mnctt['+m+'].course_id: '+ mnctt[m].course_id);*/ 
                 if (cou[k].course_id==mnctt[m].course_id) {return mnctt[m].test_id}} return false})()

                // console.log('\nt'+i+' tcc'+j+' k'+k+'.test:'+cou[k].test);  console.log('test: '+cou[k].test+', testID: '+cou[k].test_id)

                 pl.push({name: cou[k].course_name,
                      sysname: cou[k].sysName,
                      level: cou[k].level,
                      rank: cou[k].rank,
                      test: cou[k].test,
                      test_id: cou[k].test_id,
                      price: cou[k].coursePrice,
                      location: cou[k].location_name,
                      start: cou[k].start_date,
                      finish: cou[k].finish_date,
                   topic: i})
              
                   ta.push({name: top[i].topicName+' - '+cou[k].course_name,
                      sysname: cou[k].sysName,
                      course_id: cou[k].course_id,
                      test: cou[k].test,
                      test_id: cou[k].test_id,
                      price: cou[k].coursePrice,
                      location: cou[k].location_name,
                      start: cou[k].start_date,
                      finish: cou[k].finish_date,
                      trainer: 'Anonym',
                   topic: i})

                  courseList.push(cou[k])
              }
            };
          };
        };
        // console.log(top[i].testblock)
        return courseList})()
  };
}
createCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)








// /*Create a Sorted list and add a groupprice to the level*/
//    $scope.pricelist=[], $scope.testlist=[]
//    var createPrizeList = function(pl){
//     for (var coursenr = 0; coursenr < pl.length; coursenr++) {
//       if(!$scope.pricelist[pl[coursenr].topic]){$scope.pricelist[pl[coursenr].topic]=[]}

//       var coursenow = pl[coursenr]

//       if(!$scope.pricelist[ coursenow.topic ][ coursenow.level ]){$scope.pricelist[ coursenow.topic ][ coursenow.level ]=[]}

//       if (coursenow.test==0) {
//        $scope.pricelist[ coursenow.topic ][ coursenow.level ].push(coursenow)
//       }else{
//         $scope.testlist.push(coursenow)
//         console.log($scope.testlist)
//       }
//     };

//     for (var topicnr = 0; topicnr < $scope.pricelist.length; topicnr++) {
//      // console.log( $scope.pricelist.length)
//      for (var level = 0; level < $scope.pricelist[topicnr].length; level++) {
//      // console.log( $scope.pricelist[topicnr].length); console.log( level); console.log( $scope.pricelist[topicnr][level])
//      var price = 0
//      if (level>0) {
//       for (var coursenow = 0; coursenow < $scope.pricelist[topicnr][level].length; coursenow++) {
//        price = price + $scope.pricelist[topicnr][level][coursenow].price*1
//       };      
//      $scope.pricelist[topicnr][level].price = price 
//      };
//      };
//     };  

//     // console.log('pricelist')  
//     // console.log($scope.pricelist)  
//    } 
//    createPrizeList(pl)




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
















/*Fill in the Eventlist all nessesary Infos from other tables and add values for models.
Calculate a sum for all [course(1-n) +  test]-Groups*/
function finishEventlist(ta){
  thelist=[]
  for (var i = 0; i < $scope.topics.length; i++) {
    var elist = $scope.topics[i].eventList

    //first complete the Eventlistinfos
    for (var h = 0; h < elist.length; h++) {
      for (var o = 0; o < ta.length; o++) {
        if (ta[o].course_id==elist[h].course_id) {
          elist[h].price = ta[o].price
          elist[h].test = ta[o].test
          elist[h].test_id = ta[o].test_id
          //trainerinfo nicht vorhanden
          elist[h].trainer = $scope.topics[i].responsibleTrainer_id
          //model for checkboxes
          elist[h].checked = false
          //value for panel-click-serachfield interaction
          elist[h].namefortable = elist[h].course_name +' ('+ $scope.topics[i].topicName+')'          

          //change id-number to status-word
          elist[h].eventguaranteestatus = (function(statusnr) {for (var i = 0; i < $scope.stateinfo.length; i++) {
            if ($scope.stateinfo[i].ID==statusnr) {return $scope.stateinfo[i].eventguaranteestatus};
          };})(elist[h].eventguaranteestatus)

        };
      };
    };

    //second exploid Tests
    for (var j = 0; j < elist.length; j++) {
      eve = elist[j]

      //createModallist -> 
      if(eve.test!=1){
        thelist.push(eve) 

        for (var k = 0; k < elist.length; k++) {
          evex = elist[k]
          if(eve.test_id == evex.course_id){
            thelist.push(evex)
            console.log('evex')
            console.log(evex)
            //calc sum of course-test-group
            var summe = 0
            for (var l = $scope.datesandreserve.length; l >0; l--) {
              if (thelist[l].name != 'Summe') {
                summe = summe + thelist[l].price
              }else{l=0}//stopp          
            }
            //add sum if exist
            if (summe > 0) {
              thelist.push({start : '',finish : '',name : 'Summe', location : '',trainer : '',price : summe})
              console.log(thelist[thelist.length-1])
            }
          }
        }
      }
    }
  }
  return thelist 
}
$scope.xlist =  finishEventlist(ta);







  //HTML5 3.2.3.1: Das id-Attribut darf kein Leerzeichen enthalten deshalb wird der topicName nach name_raw kopiert u. anschließend die Leerzeichen entfernt
  for (var i = 0; i < $scope.topics.length; i++) {
   $scope.topics[i].topic_name_raw = $scope.topics[i].topicName;   
   $scope.topics[i].topic_nr = i;   
   $scope.topics[i].topic_name = $scope.topics[i].topicName.replace(/\s+/g,'');//löscht alle Leerzeichen   
  }
  /*Suche Kurse und weise sie den Topics zu. Suche events zu den Kursen der Topics und weise sie den Topics zu*/
  var aNE=$scope.allNextEvents
  for (var i = 0; i < $scope.topics.length; i++) { //für alle topics
   // console.log('$scope.topics.length: '+$scope.topics.length)
   var t=$scope.topics[i]
   for (var j = 0; j < $scope.topiccourseCourse.length; j++) { //für alle topiccourCourse-Einträge
    var tcC=$scope.topiccourseCourse[j]

    //Wenn die topic_id des Elements aus der Topicliste == der topic_id des Elements aus der m:n-TopicCourses-Liste ist
    //dann lege in der Topicliste ein Array für die Sidebarelemente an. 
    //Vergleiche darauf hin die tc_course_id des TopicCourse Elements mit den course_id's aus der AllNextEvents-Liste.
    //Wenn die id's identisch sind füge dem aktuellen SidebarArray das Event hinzu
    if (t.topic_id == tcC.topic_id) { //wenn ids gleich sind
     if (!$scope.topics[i].sideBarCourses){$scope.topics[i].sideBarCourses=[]}//lege sidebarArray für topic an
      for (var k = 0; k < $scope.eventlist.length; k++) { //für alle allNextEvents-Einträge           
      if ($scope.topics[i].sideBarCourses.length<5) { //sidebar soll 5 elemente haben           
       if (tcC.course_id == $scope.eventlist[k].course_id) { //nur Events die zur aktuellen course_id passen
        $scope.topics[i].sideBarCourses.push($scope.eventlist[k]) //befülle SideBar-Array
        var newentry = $scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1]//Definiere ID-name ohne Leerzeichen
        newentry.sysName=newentry.course_name.replace(/\W+/g,''); 
        newentry.start_time=newentry.start_time.slice(0,5); //cut seconds
        newentry.finish_time=newentry.finish_time.slice(0,5); //cut seconds
        // console.log('sysName: '+$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,''))
       };
      };
     };
    };
   };
  };

  console.log('fertiges $scope.topics: ');console.log($scope.topics); 
  }
 //  ,function(response) {$scope.topics = 'Fehler in topicCtrl-$http: '+response}
 // )


//If Navbar get clicked, the value in the modal-search-bar becomes the name of the Navbarelement
$scope.tablesearchchange = function(name){
  $scope.tablesearch = name
  $scope.sidebarselect = name
}


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
$scope.sortType = 'start_date'
$scope.sortReverse = false


/*A reservation sends an E-Mail to the reservating person with some description and an other E-Mail to 
the responsible person in the Brand (DB-change -> registermail)*/
$scope.reservationlistupdate = function(c) { //c = course
var reslist = $scope.rinfo.courses, xlist = $scope.xlist
  if (c.checked) {
    reslist.push(c)
  }else{
    for (var i = 0; i < reslist.length; i++) {
      if (reslist[i].event_id) {reslist.splice(i,1)};    
    };
  }
}
/*On click 'Weitere Kurse' add course to reservation list and open T&A-Modal for more courseoptions*/
$scope.initreslistfromsidebar = function(c) { //c = course
  c.checked = true
  $scope.reservationlistupdate(c)
}
$scope.reservate = function() {
  for (var i = 0; i < $scope.topics.length; i++) {
      for (var j = 0; j < $scope.topics[i].eventList.length; j++) {
        if ($scope.topics[i].eventList[j].checked) {
          $scope.rinfo.courses.push($scope.topics[i].eventList[j])
        };
      };
  };


 $scope.rinfo.reserveparticipants = $scope.reserveparticipants
 console.log('reservepush: ')
 console.log($scope.rinfo)
 // $http.post('/EduMS/api/index.php/'+bname+'/'+pw+'/reserve', $scope.rinfo).
 
 //        then(function(response) {
 //          console.log(reservefinal='reserveinfo send to:[POST]/EduMS/api/index.php/'+bname+'/'+pw+'/reserve')
 //        }, function(response) {
 //          $scope.data = response || "Request failed";
 //          $scope.status = response.status;
 //      });
        /*Apache Errorlog:

[Tue Apr 05 00:07:18.177996 2016] [:error] [pid 2480:tid 1164] [client ::1:50659] PHP Warning:  mail(): &quot;sendmail_from&quot; not set in php.ini or custom &quot;From:&quot; header missing in C:\\wampstack-7.0.2-0\\apache2\\htdocs\\EduMS\\api\\RequestHandler.inc.php on line 169, referer: http://localhost:4040/EduMS-client/index.php?navdest=brand
[Tue Apr 05 00:07:18.177996 2016] [:error] [pid 2480:tid 1164] [client ::1:50659] PHP Notice:  Array to string conversion in C:\\wampstack-7.0.2-0\\apache2\\htdocs\\EduMS\\api\\RequestHandler.inc.php on line 170, referer: http://localhost:4040/EduMS-client/index.php?navdest=brand
[Tue Apr 05 00:07:18.209223 2016] [:error] [pid 2480:tid 1164] [client ::1:50659] PHP Notice:  Undefined variable: return in C:\\wampstack-7.0.2-0\\apache2\\htdocs\\EduMS\\api\\RequestHandler.inc.php on line 171, referer: http://localhost:4040/EduMS-client/index.php?navdest=brand
        */

//  $http.post('http://localhost:4041', $scope.rinfo).//then(c).error(console.log('nodemail fail'))
 
//         then(function(response) {
//           console.log(reservefinal='reserveinfo send to:[POST] http://localhost:4041 - (nodemail)')
//         }, function(response) {
//           $scope.data = response || "Request failed";
//           $scope.status = response.status;
//       });
// }


}
orderbranddata(response);
}]);






function log(a){console.log(a)}
</script>