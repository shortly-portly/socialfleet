
angular.module('app').controller('Post', function($scope, $http, $location, toastr) {

  var id = $location.search().id;

  $scope.minDate = new Date();
  $scope.time = new Date();

  $scope.opened = false;

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = !$scope.opened;
  }

  $scope.delete = deletePost;

  function getPost() {
    $http.get('/api/post/' + id).then(function(post) {
      $scope.message = post.data.message;
      $scope.date = post.data.datetime;

      var datetime = new Date(post.data.scheduledFor);
      $scope.date = datetime;
      $scope.time = datetime;
    })
  }

  if (isEditingPost()) {
    $scope.isEditing = true;
    getPost();
    $scope.save = editPost;
  } else {
    $scope.save = newPost
  }

  function newPost() {

    var datetime = new Date (
      $scope.date.getFullYear(),
      $scope.date.getMonth(),
      $scope.date.getDate(),
      $scope.time.getHours(),
      $scope.time.getMinutes()
    );

    $http.post('/api/post/tweet', {
      message: $scope.message,
      scheduledFor: datetime
    }).then(function() {
        toastr.success("new post created");
    });
  }

  function editPost() {
    console.log("date", $scope.date);
    var datetime = new Date (
      $scope.date.getFullYear(),
      $scope.date.getMonth(),
      $scope.date.getDate(),
      $scope.time.getHours(),
      $scope.time.getMinutes()
    );

    $http.post('/api/post/update/' + id, {
      message: $scope.message,
      scheduledFor: datetime
    }).then(function() {
      toastr.success("post updated");
    });
  };

  function deletePost() {
    $http.post('/api/post/destroy/' + id).then(function() {
      toastr.info("post deleted");
    });
  }

  function isEditingPost() {
    return id;
  }
});


angular.module('app').directive('datepickerPopup', function(){
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, element, attr, controller){
            controller.$formatters.shift();
        }
    };
});
