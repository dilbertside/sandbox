Ext.define("Starter.model.User",
{
  extend : "Ext.data.Model",
  fields : [ {
    name : "id",
    type : "string"
  }, {
    name : "firstName",
    type : "string",
    convert : null
  }, {
    name : "lastName",
    type : "string",
    convert : null
  }, {
    name : "email",
    type : "string",
    convert : null
  }, {
    name : "department",
    type : "string",
    convert : null
  } ],
  validations : [ {
    type : "presence",
    field : "lastName"
  }, {
    type : "email",
    field : "email"
  } ],
  proxy : {
    type : "direct",
    api : {
      read : storeService.read,
      create : storeService.create,
      update : storeService.update,
      destroy : storeService.destroy
    },
    reader : {
      root : "records"
    }
  }
});