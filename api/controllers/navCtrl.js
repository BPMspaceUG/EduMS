<script  type="text/javascript">

/*
Eng: The controller navCtrl uses the $http-service to get JSON-datasets from DB-Views and reorganize them in $scope.
The templates rightBar-X show the next courses in context of the selected topic. Also there is a lorem fuction for dummytext.

Deu/Ger: Der Controller navCtrl fordert über den $http-service JSON-Datensätze DB-Views und reorganisiert sie in $scope.
Die Templates rightBarCourseByTopic und rightBarCourseAll zeigen die nächsten courses in Abhängigkeit des ausgewählten Topics an.
Die lorem function erzeugt Dummytext.
------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------
*/

/*Controllers define and handle an Angular area
Ein controller wird für einen bestimmten Sinnabschnitt innerhalb von Angular definiert*/

app.controller('navCtrl', ['$scope','$http', '$sce', function ($scope, $http, $sce) {
 //https://docs.angularjs.org/api/ngSanitize/service/$sanitize
$http.get('/EduMS/api/index.php/'+bname+'/'+pw+'/getBrandInfo')
 .then(function(response) {
  console.log(response)
  //brandinfo:
  /*accesstoken: "5b35793a3",brandDescription: "<h2>description</p>",brandDescriptionFooter: "<h2>FOOTices proin.</p>",brandDescriptionSidebar: "<h2>SIDt felis</p>",
  brandHeadline: "Brand with ID 9",brandImage: "<img class="" src="http://dummyimage.com/200x200/91B561/3D7B6B.jpg&text=Eqpajbuu ID 9",brand_id: "9",brand_name: "Eqpajbuu ID 9",
  branddeprecated: "0",css-style: "<style> body {background-color: ;}</style>",discount: "7.00",event_partner_id: "1",login: "EqpajbuuID9"*/
  $scope.brandinfo = response.data.brandinfo
  $scope.brandinfo.brandDescription = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescription+'</div>')
  $scope.brandinfo.brandDescriptionFooter = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescriptionFooter+'</div>')
  $scope.brandinfo.brandDescriptionSidebar = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandDescriptionSidebar+'</div>')
  $scope.brandinfo.brandImage = $sce.trustAsHtml('<div>'+response.data.brandinfo[0].brandImage+'</div>')


  //topiclist: 
  /*$$hashKey: "object:953", deprecated: "0", footer: "<h2>FOOTER Topic ligula. At.</p>", responsibleTrainer_id: "14", topicDescription: "<h2>Topic with ID 1</h2>", 
  topicDescriptionSidebar: "<h2>with ID 1</h2>", topicHeadline: "TOPIC with ID 1", topicImage: "data:image/svg+xml;charset=utf-8,<svg><%2Fsvg>", topicName: "Pkhhoaged", topic_id: "1"*/
  $scope.topics = response.data.topiclist
   for (var i = 0; i < $scope.topics.length; i++) {
    $scope.topics[i].footer = $sce.trustAsHtml('<div>'+$scope.topics[i].topicFooter+'</div>')
    $scope.topics[i].topicDescription = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescription+'</div>')
    $scope.topics[i].topicDescriptionSidebar = $sce.trustAsHtml('<div>'+$scope.topics[i].topicDescriptionSidebar+'</div>')
    $scope.topics[i].topicImage = $sce.trustAsHtml('<div>'+$scope.topics[i].topicImage+'</div>')
   }



  //topiccourselist:
  /*course_id: "43", course_name: "Training 43 in Topic 1 - Level-Rank 1-1", level: "1", rank: "1", topicName: "Pkhhoaged", topic_course_id: "43", topic_id: "1"*/
  $scope.topiccourseCourse = response.data.topiccourselist 

  

  //courselist:
  /*courseDescription: "<p>Posuere mus.</p>", courseDescriptionCertificate: "<h2>adfadf</ul>", courseDescriptionMail: "<h2>Course description from conec.</p>"
  courseHeadline: "Training 43 in Topic 1 - Level-Rank 1-1", coursePrice: "1075", course_id: "43",  course_name: "Training 43 in Topic 1 - Level-Rank 1-1"
  internet_course_article_id: "14",min_participants: "3", number_of_days: "3"*/
  $scope.courses = response.data.courselist;
  for (var i = 0; i < $scope.courses.length; i++) {
    $scope.courses[i].courseDescription = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescription+'</div>')
    $scope.courses[i].courseDescriptionCertificate = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionCertificate+'</div>')
    $scope.courses[i].courseDescriptionMail = $sce.trustAsHtml('<div>'+$scope.courses[i].courseDescriptionMail+'</div>')
    
    if ($scope.courses[i].courseHeadline.length<2) {
     $scope.courses[i].courseHeadline=$scope.courses[i].course_name
     
    };
   }

  //coursetotestlist:
  /*v_testcourse - course_id:1, test_id:44*/
  $scope.courseToTest = response.data.coursetotestlist;



  //eventlist:
  /*courseMaxParticipants: "16", course_id: "74", course_name: "Training 74 in Topic 1 - Level-Rank 2-4", coursedeprecated: "0", event_id: "3873", event_status_id: "2"
  eventguaranteestatus: "2", eventinhouse: "0", finish_date: "2016-03-11", finish_time: "17:00:00", internet_location_name: "Koqlg", locationMaxParticipants: "16"
  location_description: "<h2>Location description from Locatos.</p>", location_id: "177", location_name: "Koqlg", start_date: "2016-03-09", start_time: "13:30:00", test: "0"*/ 
  $scope.eventlist = response.data.eventlist
  for (var i = 0; i < response.data.eventlist.length; i++) {
    $scope.eventlist[i].location_description = $sce.trustAsHtml('<div>'+response.data.eventlist[i].location_description+'</div>')
   }

  $scope.allNextEvents = response.data.eventlist //Termine & Anmeldung Modal
  $scope.nextEvents =  Object.keys(response.data.eventlist)
  .map(function (key) {return response.data.eventlist[key]});
  $scope.nextEvents = $scope.nextEvents.slice(0,4) //Sidebar-next 'x' Events

  for (var i = 0; i < $scope.nextEvents.length; i++) { //directive: 'rightBarCourseAll' -> helpVariables init
   $scope.nextEvents[i].btnInfo=false; //Show
   $scope.nextEvents[i].btnRegister=false; //Show
   if (i==1) {$scope.nextEvents[i].btnInfo=true}; //Sample
   $scope.nextEvents[i].sysName=$scope.nextEvents[i].course_name.replace(/\W+/g,'');
   //console.log('nextEvents['+i+']:');console.log($scope.nextEvents[i]); console.log('')
  };

  $scope.location=[]
  for (var i = 0; i < response.data.eventlist.length; i++) {
   $scope.location.push({id : response.data.eventlist[i].location_id, 
    name : response.data.eventlist[i].location_name,
    description : response.data.eventlist[i].location_description, 
    locationMaxPart : response.data.eventlist[i].locationMaxParticipants,
    width: (function(){return Math.round((100*i)/response.data.eventlist.length)})()
   })
  }














 pl=[];
 ta=[];
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
               cou[k].sysName = cou[k].course_name.replace(/\W+/g,''); //PanelIds
               cou[k].test=(function() {for (var m = 0; m < mnctt.length; m++) { if (cou[k].course_id==mnctt[m].test_id) {return 1}} return 0})()
               cou[k].test_id=(function() {
                for (var m = 0; m < mnctt.length; m++) {
                 /*Ausgabe für darunterliegendes if.. console.log('cou['+k+'].course_id: '+cou[k].course_id+', mnctt['+m+'].course_id: '+ mnctt[m].course_id);*/ 
                 if (cou[k].course_id==mnctt[m].course_id) {return mnctt[m].test_id}} return false})()

// console.log('\nt'+i+' tcc'+j+' k'+k+'.test:'+cou[k].test)
// console.log('test: '+cou[k].test+', testID: '+cou[k].test_id)



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
                 // verwendet in createanotherlist 
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
               /*if (cou[k].test != '0'){
               }else{
               }*/
              }
            };
          };
        };
        // console.log(top[i].testblock)
        return courseList})()
  };
}
createCourseList($scope.topics, $scope.topiccourseCourse, $scope.courses, $scope.courseToTest)





   $scope.datesandreserve=[]
   //deprecated (ersetzt durch createanotherlist) -> cleanflag
   var createModalList = function(eventlist){
 //ta = Termine und Anmeldung
 // console.log('\neventlist:')
 // console.log(eventlist[k])
    for (var i = 0; i < eventlist.length; i++) {
     // console.log('\nta.length:')
  // console.log(ta.length)
     for (var j = 0; j < eventlist.length; j++) {//first search the course 

      //If a event for the course exist
      if (eventlist[i].course_id==eventlist[j].course_id) {

       //If event is not a test
       if(eventlist[i].test!=1){
        //add course
        $scope.datesandreserve.push(eventlist[j])
        // console.log('eventlist[j]')
        // console.log(eventlist[j])

        //find next test for event
        for (var k = 0; k < eventlist.length; k++) {
         if(eventlist[j].test_id == eventlist[k].course_id){
          //add test after course
          $scope.datesandreserve.push(eventlist[k])
          // console.log('eventlist[k]')
          // console.log(eventlist[k])

          //calc sum of course-test-group
          var summe = 0
          for (var l = $scope.datesandreserve.length; l >0; l--) {
           if ($scope.datesandreserve[l].name != 'Summe') {
            summe = summe + $scope.datesandreserve[l].price
           }else{l=0}//stopp          
          }
          //add sum if exist
          if (summe > 0) {
           $scope.datesandreserve.push({start : '',finish : '',name : 'Summe',location : '',trainer : '',price : summe})
           // console.log($scope.datesandreserve[$scope.datesandreserve.length-1])
          }
         }
        }        
       }
      }
     }
    }
    // console.log($scope.datesandreserve)
   }
  createModalList(ta)







//
   $scope.pricelist=[]
   var createPrizeList = function(pl){
    for (var coursenr = 0; coursenr < pl.length; coursenr++) {
      if(!$scope.pricelist[pl[coursenr].topic]){$scope.pricelist[pl[coursenr].topic]=[]}

      var coursenow = pl[coursenr]

      if(!$scope.pricelist[ coursenow.topic ][ coursenow.level ]){$scope.pricelist[ coursenow.topic ][ coursenow.level ]=[]}

      if (coursenow.test==0) {
       $scope.pricelist[ coursenow.topic ][ coursenow.level ].push(coursenow)
      };
    };
    // console.log($scope.pricelist)

    for (var topicnr = 0; topicnr < $scope.pricelist.length; topicnr++) {
     // console.log('a')
     // console.log( $scope.pricelist.length)
     for (var level = 0; level < $scope.pricelist[topicnr].length; level++) {
     //  console.log('b')
     // console.log( $scope.pricelist[topicnr].length)
     // console.log( level)
     // console.log( $scope.pricelist[topicnr][level])
     var price = 0
     if (level>0) {
      for (var coursenow = 0; coursenow < $scope.pricelist[topicnr][level].length; coursenow++) {
       price = price + $scope.pricelist[topicnr][level][coursenow].price*1
      };      
     $scope.pricelist[topicnr][level].price = price 
     };
     };
    };  

    // console.log('pricelist')  
    // console.log($scope.pricelist)  
   } 
   createPrizeList(pl)




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
    // console.log('\nel: ')
    // console.log($scope.topics[1].eventList)











function createanotherlist(ta){
  thelist=[]
  for (var i = 0; i < $scope.topics.length; i++) {
    var elist = $scope.topics[i].eventList

    //first complete the Eventlistinfos
    for (var i = 0; i < elist.length; i++) {
      for (var o = 0; o < ta.length; o++) {
        if (ta[o].course_id==elist[i].course_id) {
          elist[i].price = ta[o].price
          elist[i].test = ta[o].test
          elist[i].test_id = ta[o].test_id
          elist[i].trainer = 'Anonym'
          elist[i].checked = false
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
              thelist.push({start : '',finish : '',name : 'Summe',location : '',trainer : '',price : summe})
              console.log(thelist[thelist.length-1])
            }
          }
        }
      }
    }
  }
  return thelist 
}
$scope.xlist =  createanotherlist(ta);




















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
        $scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1]//Definiere ID-name ohne Leerzeichen
        .sysName=$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,'');
        // console.log('sysName: '+$scope.topics[i].sideBarCourses[$scope.topics[i].sideBarCourses.length-1].course_name.replace(/\W+/g,''))
       };        
      };
     };
    };     
   };
  };

  //};
  console.log('fertiges $scope.topics: (Auskommentiert)');console.log($scope.topics); 
  },function(response) {$scope.topics = 'Fehler in topicCtrl-$http: '+response}
 )




/*ng-models for imputs*/
$scope.rinfo={organisation : '', contactname : '', contactsname : '', 
	contactpersonemail : '', street : '', housenr : '', city : '',
    zip : '', country : '', courses:[]}
/*add and remove Partitioner namefields*/
$scope.reserveparticipants = [{name:'', sname:'', email:'', certificate:''}];
$scope.addInput = function(){
    $scope.reserveparticipants.push({name:'', sname:'', email:'', certificate:''});
}
$scope.removeInput = function(index){
    $scope.reserveparticipants.splice(index,1);
}


/*A reservation sends an E-Mail to the reservating person with some description and an other E-Mail to 
the responsible person in the Brand (DB-change -> registermail)*/
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
 $http.post('/EduMS/api/index.php/'+bname+'/'+pw+'/reserve', $scope.rinfo)
 $http.post('http://localhost:4041', $scope.rinfo)
}


}])







</script>