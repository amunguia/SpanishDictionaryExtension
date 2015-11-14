angular.module("translateApp").
    factory("reviewService", ['storageService', function(storageService) {
        var data  = {};
        var terms = [];
        var count = 0;
        var index = 0;
        var f = false;
 
        function loadTerms() {
            storageService.getData().then(function(result) {
                data  = result[storageService.storageArea()];
                terms = Object.getOwnPropertyNames(data);
                count = terms.length;
                index = 0;
            });
        }
        loadTerms();


        return {
            nextItem: function() {
                var term = terms[index++];
                var next = data[term];
                if (index >= count) {
                    if (count < storageService.numItems()) {
                        loadTerms();
                    } else {
                        index = 0;
                    }
                }

                return {term: term, definition: next};
            }

        };
    }]);