var EmployeeSample = EmployeeSample || {};

(function (EmployeeSample) {

    var Views = {};

    Views.Employee = Backbone.View.extend({
        el: 'body',
        events: {
            'click #deletebutton': 'deleteModalPopUP',
            'click #AddEmp': 'AddMethod',
            'click #delDelete': 'comfirmDelteMethod',
            'click #delClose': 'closePopUp',
            'click #updatebutton': 'updateModalPopUP',
            'click #updatebtn':'confirmUpdate'
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
                            "</td><td><a id='deletebutton' href='#' class='glyphicon glyphicon-trash'></td><td><a id='updatebutton' href='#' class='glyphicon glyphicon-pencil'></td></tr>")


                    });
                }
            });
        },

        AddMethod: function () {


            //var FirstName = $('#FirstName').val();
            //var SecondName = $('#SecondName').val();
            //var Email = $('#Email').val();
            //var Salary = $('#Salary').val()

            //this.model.url = this.model.uriRoot + "AddEmployee?FirstName=" + FirstName + "&SecondName=" + SecondName + "&Email=" + Email + "&Salary=" + Salary;
            this.model = new EmployeeSample.EmployeeModel.EmployeeModel({
                 FirstName : $('#FirstName').val(),
                 SecondName : $('#SecondName').val(),
                 Email : $('#Email').val(),
                Salary : $('#Salary').val()
            });
            this.model.url = this.model.uriRoot + "AddEmployee";
            //this.model.
            this.model.save({},
                
                {

                'success': function (data) {

                    $('.table-striped tbody')
                        .append("<tr data-val=" + data.get('EmployeeID') + "><td>" + data.get('EmployeeID') +
                        "</td><td>" + data.get('FirstName') +
                        "</td><td>" + data.get('SecondName') +
                        "</td><td>" + data.get('Email')
                        + "</td><td>" + data.get('Salary') +
                        "</td><td><a id='deletebutton' href='#' class='glyphicon glyphicon-trash'></td><td><a id='updatebutton' href='#' class='glyphicon glyphicon-pencil'></tr>")

                    $('#FirstName').val("");
                   $('#SecondName').val("");
                    $('#Email').val("");
                    $('#Salary').val("");


                },
                'error': function () {
                    console.log("Error occured while saving");
                }
            })

        },

        deleteModalPopUP: function (e) {
            var id = Number(e.currentTarget.parentElement.parentElement.getAttribute('data-val'));
            var popFirstName = $("tr[data-val='" + id + "']").children()[1].innerHTML;
            var popLastName = $("tr[data-val='" + id + "']").children()[2].innerHTML;
            var popEmail = $("tr[data-val='" + id + "']").children()[3].innerHTML;
            var popSalary = $("tr[data-val='" + id + "']").children()[4].innerHTML
            var EditTemplate = "<form class='form-horizontal'>\
                                   <span id='recordToDeleteid' style='display:none'>"+id+"</span>\
                                   <div class='form-group'>\
                                       <label for='ModalFirstNme' class='col-lg-5 control-label'>First Name</label>\
                                        <div class='col-lg-7'>\
                                         <label id='ModalFirstNme' class='col-lg-2 control-label'>'"+ popFirstName + "'</label>\
                                        </div>\
                                   </div>\
                                   <div class='form-group'>\
                                       <label for='ModalSecondName' class='col-lg-5 control-label'>Last Name</label>\
                                        <div class='col-lg-7'>\
                                          <label id='ModalSecondName' class='col-lg-2 control-label'>'" + popLastName + "'</label>\
                                        </div>\
                                   </div>\
                                  <div class='form-group'>\
                                       <label for='ModalEmail' class='col-lg-5 control-label'>Email</label>\
                                        <div class='col-lg-7'>\
                                         <label id='ModalEmail' class='col-lg-2 control-label'>'" + popEmail + "'</label>\
                                        </div>\
                                   </div>\
                                   <div class='form-group'>\
                                       <label for='ModalSalary' class='col-lg-5 control-label'>Salary</label>\
                                        <div class='col-lg-7'>\
                                          <label id='ModalSalary' class='col-lg-2 control-label'>'" + popSalary + "'</label>\
                                        </div>\
                                   </div>\
                                </form>";
            var FooterTemplate = " <button type='button' id='delClose' class='btn btn-default' data-dismiss='modal'>Close</button>\
                                    <button type='button' id='delDelete' class='btn btn-primary'>Delete</button>";

            var HeaderTemplate = "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\
               <h4 class='modal-title' id='exampleModalLabel'>Dlelete Confimration</h4>";

            $(".modal-body").html(EditTemplate);
            $(".modal-footer").html(FooterTemplate);
            $(".modal-header").html(HeaderTemplate);
            

            $(".bs-example-modal-lg").modal('show');

            //$("#ModalFirstNme").tex($("tr[data-val='" + id + "']")[0]);
            //$("#ModalSecondName").text( $("tr[data-val='" + id + "']")[1]) ;
            //$("#ModalEmail").text($("tr[data-val='" + id + "']")[2]) 
            //$("#ModalSalary").text($("tr[data-val='" + id + "']")[3]);

           
            //this.model.url = this.model.uriRoot + "DeleteEmployee?id=" + id;
            //this.model.set('id', '');
            //this.model.destroy({
            //    success: function (data) {
            //        $("tr[data-val='" + id + "']").remove();
            //    },
            //    error: function () {
            //        console.log("deletion failed")
            //    }
            //})
        },
        comfirmDelteMethod: function () {
            var id = Number($("#recordToDeleteid").text());
            this.model.url = this.model.uriRoot + "DeleteEmployee?id=" + id;
            this.model.set('EmployeeID', id);
            this.model.destroy({
                success: function (data) {
                    $("tr[data-val='" + id + "']").remove();
                    $(".bs-example-modal-lg").modal('hide');
                },
                error: function () {
                    console.log("deletion failed")
                }
            })
        },
        closePopUp: function () {
            $(".bs-example-modal-lg").modal('hide');
        },
        updateModalPopUP: function (e) {
            var id = Number(e.currentTarget.parentElement.parentElement.getAttribute('data-val'));
            var popFirstName = $("tr[data-val='" + id + "']").children()[1].innerHTML;
            var popLastName = $("tr[data-val='" + id + "']").children()[2].innerHTML;
            var popEmail = $("tr[data-val='" + id + "']").children()[3].innerHTML;
            var popSalary = $("tr[data-val='" + id + "']").children()[4].innerHTML
            var EditTemplate = "<form class='form-horizontal'>\
                                   <span id='recordToDeleteid' style='display:none'>"+ id + "</span>\
                                   <div class='form-group'>\
                                       <label for='ModalFirstName' class='col-lg-5 control-label'>First Name</label>\
                                        <div class='col-lg-7'>\
                                         <input class='form-control' id='ModalFirstName' type='text' value="+popFirstName+">\
                                        </div>\
                                   </div>\
                                   <div class='form-group'>\
                                       <label for='ModalSecondName' class='col-lg-5 control-label'>Last Name</label>\
                                        <div class='col-lg-7'>\
                                         <input class='form-control' id='ModalSecondName' type='text' value=" + popLastName + ">\
                                        </div>\
                                   </div>\
                                  <div class='form-group'>\
                                       <label for='ModalEmail' class='col-lg-5 control-label'>Email</label>\
                                        <div class='col-lg-7'>\
                                         <input class='form-control' id='ModalEmail' type='text' value=" + popEmail + ">\
                                        </div>\
                                   </div>\
                                   <div class='form-group'>\
                                       <label for='ModalSalary' class='col-lg-5 control-label'>Salary</label>\
                                        <div class='col-lg-7'>\
                                          <input class='form-control' id='ModalSalary' type='text'value=" + popSalary + ">\
                                        </div>\
                                   </div>\
                                </form>";
            var FooterTemplate = " <button type='button' id='delClose' class='btn btn-default' data-dismiss='modal'>Close</button>\
                                    <button type='button' id='updatebtn' class='btn btn-primary'>Update</button>";

            var HeaderTemplate = "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>\
               <h4 class='modal-title' id='exampleModalLabel'>Upadate Confimration</h4>";

            $(".modal-body").html(EditTemplate);
            $(".modal-footer").html(FooterTemplate);
            $(".modal-header").html(HeaderTemplate);


            $(".bs-example-modal-lg").modal('show');
        },
        confirmUpdate: function () {
            var id = Number($("#recordToDeleteid").text());
            //emp = {
            //    'EmployeeID':$("#recordToDeleteid").text(),
            //    'FirstName': $('#FirstName').val(),
            //    'SecondName': $('#SecondName').val(),
            //    'Email': $('#Email').val(),
            //    'Salary': $('#Salary').val()
            //};
             this.model = new EmployeeSample.EmployeeModel.EmployeeModel({
                 EmployeeID:$("#recordToDeleteid").text(),
                 FirstName: $('#ModalFirstName').val(),
                 SecondName: $('#ModalSecondName').val(),
                 Email: $('#ModalEmail').val(),
                 Salary: $('#ModalSalary').val()
            });
            this.model.url = this.model.uriRoot + "UpdateEmployee";
            this.model.save({}, {

                success: function (modal, data) {
                    $("tr[data-val='" + id + "']").children()[1].innerHTML = data.FirstName;
                    $("tr[data-val='" + id + "']").children()[2].innerHTML = data.SecondName;
                    $("tr[data-val='" + id + "']").children()[3].innerHTML = data.Email;
                    $("tr[data-val='" + id + "']").children()[4].innerHTML = data.Salary;
                    $(".bs-example-modal-lg").modal('hide');
                },
                error: function () {
                    console.log("Update canceled");
                }

            });
        }
    });
    EmployeeSample.View = Views;
    new EmployeeSample.View.Employee();

})(EmployeeSample)