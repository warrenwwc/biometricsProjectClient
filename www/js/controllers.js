angular.module('app.controllers', [])
  
.controller('3DFaceAuthSimulationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
    $scope.currStaff = {};
    $scope.currSid;
	var database = firebase.database();
	database.ref("/staffs/").on('value', function(data) {
        $scope.staffs = data.val();
        if ($scope.currSid != null){
            $scope.currStaff = $scope.staffs[$scope.currSid];
        }
		if(!$scope.$$phase) {
		  $scope.$digest();
		}
	});
    
    $scope.ChangeStaff = function(sid) {
        $scope.currSid = sid;
        $scope.currStaff = $scope.staffs[sid];
    }
    
    $scope.Login = function() {
			firebase.database().ref('staffs/' + $scope.currSid).update({
			  "isWorking": true,
			  "last": Date()
			});
    }
    
    $scope.Logout = function() {
        var last = new Date($scope.currStaff.last);
        var diff = Math.round(Math.abs((new Date()-last)/(3600*1000)));
        firebase.database().ref('staffs/' + $scope.currSid).update({
            "isWorking": false,
            "last": Date(),
            "whours": $scope.currStaff.whours + diff
        });
    }
    
    

}])
 