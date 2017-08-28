  
         var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    //create form data
    //final json

    $scope.userDataInfo = {
        name: '', password: '', emailid: '', city: '',
        comment: '', address: '', stdCourse: [],ContentList:[],
    };


    //checkbox value
    //$scope.course =
    //    [
    //    { Name: "java" },
    //    { Name: "c" },
    //    { Name: "Oracle" },
    //    { Name: ".Net" },
    //    { Name: "Pascal" },
    //    { Name: "DB2" },
          
    //    ];x.Name in ng-repeat
    //or
    $scope.course = ["java", "c", "Oracle", ".Net", "Pascal", "DB2"];
    //drop down data
    $scope.cities = ["parbhani", "nanded", "aurnagbad", "pune", "mumbai", "nagpur"];
    //
    //form text data 
    $scope.stdData = [];
    $scope.createOrUpdateFormData = function (stdData) {
        $scope.userDataInfo = stdData;
        $scope.userDataInfo.stdCourse = $scope.stdCourse;
        $scope.userDataInfo.city = $scope.city;
        $scope.userDataInfo.ContentList = $scope.ContentList;
        $scope.stdInfoPass = $scope.userDataInfo;//final values pass to service side
        $http.post(api + "/IBG/CreateNewCappBundle", stdInfoPass).then(function successCallback(response) {
                CommonService.showSuccess('record Created successfully.');
        }, function errorCallback(response) {
            CommonService.showSuccess('Create new record  Server error');
        });

        $scope.clearformdata();

    }
    //not working small mistick
    $scope.clearformdata = function () {
        $scope.data = {
            name: '',
            password: '',
            emailid: '',
            city: '',
            comment: '',
            address: '',
        }
     //   $scope.stdData = {};
     //   $scope.stdCourse = [];
      //  $scope.ContentList = [];
        angular.forEach($scope.course, function (value, key) {
            value.active = false;
        })
    }

    //check box data
    $scope.stdCourse = [];
    var courseListInfo = { Course: 0, Discount: 0, IsAcitve: false};
    $scope.checkboxValueFun = function (checkedValue, active) {
        if (active == true) {
            courseListInfo.Course = checkedValue;
            courseListInfo.Discount = 5000;
            courseListInfo.IsAcitve = active;
            $scope.stdCourse.push(courseListInfo)
           // $scope.stdCourse.push(checkedValue);
           courseListInfo = { Course: 0, Discount: 0, IsAcitve: false };
        }
        else {
            $scope.stdCourse.splice($scope.stdCourse.indexOf(checkedValue), 1);
        }
    }
    //gender radio button data pending functinality

    //select box value data
    $scope.city = '';
    $scope.selectedBox = function (selectedvalue) {
        $scope.city = selectedvalue;
    }
    //

            $scope.loader = true;
            $scope.limit = 5;
            $scope.loadmoreRecords = function () {
              
                $http({
                    method: "GET",
                    url: "https://jsonplaceholder.typicode.com/todos"
                }).then(function mySuccess(response) {
                    $scope.Info = response.data;
                    //angular.forEach($scope.Info, function (value, key) {

                    //});

                    var increamented = $scope.limit + 4;
                    $scope.limit = increamented > $scope.Info.length ? $scope.Info.length : increamented;
                   // $scope.loader = false;
                }, function myError(response) {
                    $scope.Info = response.statusText;
                });
            }
            $scope.loadmoreRecords();
            $scope.inituserInfo = function (data) {
                $scope.title1 = data[0].title;
                $scope.completed1 = data[0].completed;
            }
            $scope.currentInfo = function (currentInfo) {
                $scope.title1 = currentInfo.title;
                $scope.completed1 = currentInfo.completed;
              //  $scope.update(currentInfo);
                //input box
                $scope.info = {
                    title: currentInfo.title,
                    completed: currentInfo.completed,
                }
            }

            $scope.updateInfo = function (data) {
                data.Activity = true;
                $scope.userData = data;
                
               
                $scope.info = {
                    title: '',
                    completed: '',
                }
              
            }
       //another data
            $scope.loadmoreRecords2 = function () {
                $http({
                    method: "GET",
                    url: "https://jsonplaceholder.typicode.com/comments"
                }).then(function mySuccess(response) {
                    $scope.ProfileData = response.data;
                }, function myError(response) {
                    $scope.ProfileData = response.statusText;
                });

                $scope.initprofileBody = function (profiledatainit) {
                    $scope.value = 1;
                    $scope.fun($scope.value);
                    $scope.getInfo($scope.value);
                    $scope.id = profiledatainit[0].id;
                    $scope.body = profiledatainit[0].body;
                }
                $scope.currentProfileData = function (currentData) {
                    $scope.id = currentData.id;
                    $scope.body = currentData.body;
                }
            }
            $scope.loadmoreRecords2();

            //third operation
            //dropdwon
            $scope.names = ["1", "2", "3","4","5","6","8","9","10"];
            $scope.changeValue = function (selectedName) {
                $scope.value = selectedName;
                $scope.fun($scope.value);
            }
            //
          
            $scope.pageData = [];
            $scope.fun = function (val) {
                $http({
                    method: "GET",
                    url: "https://reqres.in/api/users/"+val
                }).then(function mySuccess(response) {
                    $scope.pageData = response.data;
                   
                
                }, function myError(response) {
                    $scope.pageData = response.statusText;
                });

            }
            $scope.fun();
            //3 part

            $scope.currentUser = function (datauser) {
                $scope.id = datauser.id;
                $scope.getInfo($scope.id);
            }

            //get info
            $scope.getInfo = function (id) {
               
                $http({
                    method: "GET",
                    url: "https://reqres.in/api/unknown/" +id
                }).then(function mySuccess(response) {
                    $scope.InfoUser = response.data;


                }, function myError(response) {
                    $scope.InfoUser = response.statusText;
                });
            }

          //checkbox functionality
           $scope.ContentList = [];
            var getselectedItem = { completed: '', title: '', userId:'' };
            $scope.checkboxFunction = function (x, active) {
                if (active == true) {
                    getselectedItem = x;
                    $scope.ContentList.push(getselectedItem);
                    var getselectedItem = { completed: '', title: '', userId: '' };
                }
                else {
                    $scope.ContentList.splice($scope.ContentList.indexOf(x), 1);
                }
            }
            //order property
            $scope.setOrderProperty = function (propertyName) {
                if ($scope.orderProperty === propertyName) {
                    $scope.orderProperty = '-' + propertyName;
                } else if ($scope.orderProperty === '-' + propertyName) {
                    $scope.orderProperty = propertyName;
                } else {
                    $scope.orderProperty = propertyName;
                }
            }
         });
  