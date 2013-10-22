Ext.define("Starter.model.Form",
{
  extend : "Ext.data.Model",
  fields : [ {
    name : "osName",
    type : "string"
  }, {
    name : "osVersion",
    type : "string"
  }, {
    name : "availableProcessors",
    type : "int"
  }, {
    name : "remarks",
    type : "string"
  }, {
    name : "date",
    type : "date"
  } ],
  validations : [ {
    type : "presence",
    field : "osVersion"
  } ],
  proxy : {
    type : "direct",
    api : {
      load: formLoadService.getFormData,
	  submit: formSubmitService.handleFormSubmit
    }/*,
    reader : {
      root : "data"
    }*/
  }
});