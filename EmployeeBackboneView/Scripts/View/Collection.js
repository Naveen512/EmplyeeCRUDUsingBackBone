var EmployeeSample = EmployeeSample || {};

(function (EmployeeSample) {

    var Collections = {};

    Collections.EployeeCollection = Backbone.Collection.extend({
        initialize: function () {

        },
        url: "http://localhost:1976/api/EmployeeCrud/GetAll"
    });

    EmployeeSample.Collection = Collections;

})(EmployeeSample)