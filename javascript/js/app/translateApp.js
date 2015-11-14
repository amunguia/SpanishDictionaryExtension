angular.module('translateApp', ['ui.bootstrap']).
    controller('translateController', ['$scope', 'translateService', 
                                       'storageService', 'reviewService',
    function($scope, translateService, storageService, reviewService){
        $scope.translate   = {};
        $scope.translate.canSave       = false;
        $scope.translate.definitions   = [];
        $scope.translate.error         = undefined;
        $scope.translate.nextStack     = [];
        $scope.translate.previousStack = [];
        $scope.translate.review        = false; 
        $scope.translate.reviewDef     = {};
        $scope.translate.reviewText    = "Review";
        $scope.translate.term          = "";

        $scope.translate.isCollapsed = true;

        $scope.beginReview = function() {
            $scope.translate.review = !$scope.translate.review;
            $scope.translate.reviewText = $scope.translate.review ? "Search" : "Review";
            if ($scope.translate.review) {
                $scope.translate.reviewDef = reviewService.nextItem();
                $scope.translate.isCollaped = true;
                $scope.translate.canSave = false;
            } else {
                $scope.translate.definitions = [];
                $scope.translate.error = undefined;
                $scope.translate.term = "";
            }
        };

        $scope.isEnter = function(event) {
            if (event.charCode == 13) {
                lookup();
            } else {
                $scope.translate.definitions = [];
            }
        }

        $scope.nextTerm = function() {
            $scope.translate.previousStack.push($scope.translate.reviewDef);
            $scope.translate.isCollapsed = true;
            
            if ($scope.translate.nextStack.length > 0) {
                $scope.translate.reviewDef = $scope.translate.nextStack.pop();
            } else {
                $scope.translate.reviewDef = reviewService.nextItem();
            }
        }

        $scope.numItems = function() {
            return storageService.numItems();
        }

        $scope.previousTerm = function() {
            $scope.translate.nextStack.push($scope.translate.reviewDef)
            $scope.translate.reviewDef = $scope.translate.previousStack.pop();
        }

        $scope.save = function () {
            if ($scope.translate.definitions.length > 0) {
                storageService.addTerm($scope.translate.term, $scope.translate.definitions);
                $scope.translate.term        = "";
                $scope.translate.definitions = [];
                $scope.translate.canSave     = false;
            }
        };

        function lookup() {
            if ($scope.translate.term.length < 1) {
                $scope.translate.error = "Please enter a term to translate.";
                $scope.translate.definitions = [];
                return;
            }
            $scope.translate.error = undefined;
            translateService.lookup($scope.translate.term).then(lookupCallback);
        }

        function lookupCallback(response) {
            if (response.error == undefined && response.length != 0) {
                $scope.translate.definitions = response;
                $scope.translate.canSave = true;
            } else if (!$scope.keypressLookup) {
                $scope.translate.error = response["error"];
                if ($scope.translate.error == undefined) {
                    $scope.translate.error = "Sorry, could not find "+$scope.translate.term+".";
                }
                $scope.translate.definitions = [];
            }
        }

    }]);
