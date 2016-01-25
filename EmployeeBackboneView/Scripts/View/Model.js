var EmployeeSample = EmployeeSample || {};

(function () {
    var Model = {};

    Model.EmployeeModel = Backbone.Model.extend({
        //defaults:{
        //    id:''
        //},
        uriRoot: "http://localhost:1976/api/EmployeeCrud/"
    });

    EmployeeSample.EmployeeModel = Model;
})();