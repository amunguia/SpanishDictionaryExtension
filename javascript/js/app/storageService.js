angular.module("translateApp").
    factory("storageService", ["$q", function($q) {
        var STORAGE_AREA = "DICTIONARY_STORAGE";
        var count        = 0;

        (function init() {
            chrome.storage.local.get(STORAGE_AREA, function(result) {
                if (result[STORAGE_AREA] == undefined) {
                    result = {};
                    result[STORAGE_AREA] = {};
                    chrome.storage.local.set(result);
                }
                count = Object.getOwnPropertyNames(result[STORAGE_AREA]).length;
            })
        })();

        function addTerm(term, definition) {
            getData().then(function(storage) {
                storage[STORAGE_AREA][term] = definition;
                count = Object.getOwnPropertyNames(storage[STORAGE_AREA]).length;
                save(storage);
            });
        }

        function getData() {
            var deferred = $q.defer();
            chrome.storage.local.get(STORAGE_AREA, function(result) {
                if (result[STORAGE_AREA] == undefined) {
                    result[STORAGE_AREA] = {};
                }
                deferred.resolve(result);
            });
            return deferred.promise;
        };

        function save(data) {
            chrome.storage.local.set(data);
        };

        return {
            addTerm: addTerm,
            numItems: function() { return count; },
            getData: getData,
            storageArea: function() { return STORAGE_AREA; }
        };
    }]);