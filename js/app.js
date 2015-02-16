var App = Ember.Application.create();

App.Router.map(function(){
  this.resource("task", {path: "/:id_project"}, function(){
    this.route("new", {path: "/"});
    this.route("edit", {path: "/edit/:id_task"});
  });
});

App.ApplicationRoute = Ember.Route.extend();

App.ApplicationView = Ember.View.extend({
  didInsertElement: function(){
    console.log("ApplicationView");
  }
});

App.ApplicationController = Ember.ObjectController.extend();

App.ProjectListView = Ember.View.extend({
  willInsertElement: function(){
    this.set('controller.model', Database.project);
  }
});

App.ProjectListController = Ember.ArrayController.extend();

App.TaskRoute = Ember.Route.extend({
  model: function(param){
    var id_project = Number(param.id_project);
    return {
      tasks: Database.task.filterBy("id_project", id_project),
      id_project: id_project
    };
  },

  setupController: function(controller, model){
    controller.set('model', model);
  }
});

//App.TaskController = Ember.ObjectController.extend();

App.TaskNewRoute = Ember.Route.extend({
  controllerName: "taskForm",
  model: function(){
    return {
      users: Database.user.map(function(user){
        return App.UserModel.create(user)
      }),
      task: App.TaskModel.create()
    }
  },

  setupController: function(controller, model){
    controller.setModel(model);
  },

  renderTemplate: function(controller){
    this.render("task/form", {
      controller: controller,
      into: "task"
    });
  }
});

App.TaskEditRoute = Ember.Route.extend({
  controllerName: "taskForm",
  model: function(param){
    var id_task = Number(param.id_task),
        task = Database.task.findBy("id_task", id_task);
        console.log(task);
    return {
      users: Database.user.map(function(user){
        return App.UserModel.create(user)
      }),
      task: App.TaskModel.create(task)
    }
  },

  setupController: function(controller, model){
    controller.setModel(model);
  },

  renderTemplate: function(controller){
    this.render("task/form", {
      controller: controller,
      into: "task"
    });
  }
});

App.TaskFormController = Ember.ObjectController.extend({
  needs: ["task"],
  selectedUser: null,

  setModel: function(model){
    var id_project, id_user;
    if(!model.task.get('id_task')){
      id_project = Number(this.get('controllers.task.model.id_project'));
      model.task.set('id_project', id_project);
    } else {
      id_user = Number(model.task.get('id_user'));
      console.log(id_user, model.users.findBy('id_user', id_user));
      this.set('selectedUser', model.users.findBy('id_user', id_user));
    }
    
    this.set('model', model);
  },

  save: function(){
    var task = this.get('model.task'), object;

    if(!task.get('title')){
      notify.alert("Molimo Vas unesite naslov!");
      return false;
    }
    if(!task.get('description')){
      notify.alert("Molimo Vas unesite opis!");
      return false;
    }

    object = task.serialize();
    object.id_user = this.get('selectedUser.id_user');

    Database.task.pushObject(object);
    this.get('controllers.task.model.tasks').pushObject(object);
    console.log(object);
    notify.success("Uspešno ste formirali objekat!");
    return true;
  },

  actions: {
    save: function(){
      this.save();
    }
  }
});

/////// Get object properties /////////////
Ember.Object.prototype.getOwnProperties = function(){
  var props = {}, prop;
  for(prop in this){
    if( this.hasOwnProperty(prop) 
        && prop.indexOf('__ember') < 0
        && prop.indexOf('_super') < 0
        && Ember.typeOf(this.get(prop)) !== 'function'
    ){
      props[prop] = this[prop];
    }
  }
  return props;
};

App.Object = Ember.Object.extend({
  serialize: function(all) {
        if(all === true){
            return this.getOwnProperties();
        }
        
        var propertyNames = this.get('propertyNames') || [];
        return this.getProperties(propertyNames);
    },

    deserialize: function(hash) {
        this.setProperties(hash);
    }
});

App.TaskModel = App.Object.extend({
  propertyNames: "id_task id_project id_user title description due_date tags status".w(),
  id_task: null, 
  id_project: null, 
  id_user: null, 
  title: "Default title", 
  description: "DEfault description", 
  due_date: "14-01-2015", 
  tags: "test, template", 
  status: "pending"
});

App.UserModel = Ember.Object.extend({
  id_user: null, 
  firstname: "", 
  lastname: "", 
  avatar: "",
  fullname: Ember.computed(function(){
    return this.get('firstname') + " " + this.get('lastname');
  })
});



