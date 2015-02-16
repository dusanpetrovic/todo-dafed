/********** Datepicker View ********************/
App.DatePickerView = Ember.TextField.extend({
	format: 'dd-mm-yyyy',
	/**
     * Nakon podešavanja vrednosti, poziva se Ember.run.sync(), kako bi se ručno
     * ažurirali bindings sa value.
     * Ovo se radi, jer se binding ažurira tek na kraju.
     * @param date {string}
     */
	afterSelect: function(date){
		this.set('value', date);
	},

	didInsertElement: function(){
		var self = this;
		
		this.$("#test").datepicker({
			format: self.get('format'),
			autoclose: true,
			onSelect: function(date) {
				self.afterSelect(date);
			}
		});
	},
	willDestroyElement: function(){
        this.$().datepicker( "remove" );
        this._super();
    }
});

/*************** Components *************************/
App.TagPickerComponent = Ember.Component.extend({
	layout: Ember.computed(function(){
        return Ember.Handlebars.compile(
            '{{input type="text" class="form-control todo-taskbody-tags" placeholder="Tags..." value=selectedTags}}'
        );
    }),

    selectedTagsDidChange: Ember.observer('selectedTags', function(){
    	this.$('.todo-taskbody-tags').val(this.get('selectedTags')).trigger("change");
    }),

	didInsertElement: function(){
		this.$(".todo-taskbody-tags").select2({
            tags: Database.tag
        });
	},
	willDestroyElement: function(){
        this.$().select2( "destroy" );
        this._super();
    }
});

App.UserAvatarComponent = Ember.Component.extend({
	id_user: null,
	avatar: "",
	path: "assets/admin/layout/img/",
	width: "27px",
	height: "27px",
	src: Ember.computed("id_user", "avatar", function(){
		var path = this.get('path'),
			id_user = this.get('id_user'),
			avatar = this.get('avatar'),
			user;
		if(avatar){
			return path.concat(avatar);
		}
		if(id_user){
			user = Database.user.findBy('id_user', id_user);
			if(user){
				return path.concat(user.avatar);
			}
		}	
		return path.concat("avatar.png");
	}),

	layout: Ember.computed(function(){
        return Ember.Handlebars.compile(
            '<img class="todo-userpic pull-left" {{bind-attr src=src width=width height=height}}>'
        );
    })
});




/***************Notify**********************/
var notify = Ember.Object.create({
	alert: function(message){
		this.show(message, "Warning", "ruby");
	},
	success: function(message){
		this.show(message, "Success", "lime");
	},
	show: function(message, heading, theme){
		$.notific8(String(message), {
			theme: theme,
			heading: heading,
            life: 1500
        });
	}
});