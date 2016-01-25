var EmployeeSample = EmployeeSample || {};

(function (EmployeeSample) {

    var Views = {};

    Views.Employee = Backbone.View.extend({
        el:'body',
        events:{
            'click #deletebutton': 'deleteMethod',
            'click #AddEmp': 'AddMethod'
       },
        initialize: function () {
            this.model = new EmployeeSample.EmployeeModel.EmployeeModel();
            this.collection = new EmployeeSample.Collection.EployeeCollection();
            this.LoadEmployeeTable();
        },
        LoadEmployeeTable: function () {
            this.collection.fetch({
                'success': function (data) {
                    $.each(data.toJSON(), function (key, val) {
                        $('.table-striped tbody')
                            .append("<tr data-val=" + val.EmployeeID + "><td>" + val.EmployeeID +
                            "</td><td>" + val.FirstName +
                            "</td><td>" + val.SecondName +
                            "</td><td>" + val.Email
                            + "</td><td>" + val.Salary +
                            "</td><td><a id='deletebutton' href='#' class='glyphicon glyphicon-trash'></td></tr>")


                    });
                }
            });
        },

        AddMethod : function(){

         
            var FirstName= $('#FirstName').val();
            var SecondName = $('#SecondName').val();
            var Email= $('#Email').val();
             var   Salary= $('#Salary').val()
            
             this.model.url = this.model.uriRoot + "AddEmployee?&FirstName=" + FirstName + "&SecondName=" + SecondName + "&Email=" + Email + "&Salary=" + Salary;

           

             this.model.save( {},{
                
                success:function(data)
                {
                   
                        $('.table-striped tbody')
                            .append("<tr data-val=" + data.get('EmployeeID') + "><td>" + data.get('EmployeeID') +
                            "</td><td>" + data.get('FirstName') +
                            "</td><td>" + data.get('SecondName') +
                            "</td><td>" + data.get('Email')
                            + "</td><td>" + data.get('Salary') +
                            "</td><td><a id='deletebutton' href='#' class='glyphicon glyphicon-trash'></td></tr>")


                    
                },
                error: function () {
                    console.log("Error occured while saving");
                }
            })

        },

        deleteMethod:function(e){
            var id = Number(e.currentTarget.parentElement.parentElement.getAttribute('data-val'));
            this.model.url = this.model.uriRoot + "DeleteEmployee?id="+id
            //this.model.set('id', '');
            this.model.destroy({
                success:function(model,data)
                {
                    $("tr[data-val='" + id + "']").remove();
                },
                error:function()
                {
                    console.log("deletion failed")
                }
            })
        }
    });
    EmployeeSample.View = Views;
    new EmployeeSample.View.Employee();

})(EmployeeSample)