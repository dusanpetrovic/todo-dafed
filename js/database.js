var Database = {

};

Database.project = [
	{id_project: 1, name: "Email application", description: "Primer Ember email aplikacije", task_number: 3},
	{id_project: 2, name: "Todo application", description: "Primer Ember project aplikacije", task_number: 1},
	{id_project: 3, name: "Survey application", description: "Primer Ember survery aplikacije", task_number: 0},
	{id_project: 4, name: "FSD Scrum", description: "Projekat Scrum", task_number: 0},
	{id_project: 5, name: "FSD Ember community", description: "Projekat Scrum", task_number: 0}
];

Database.task = [
	{id_task: 1, id_project: 1, id_user: 1, title: "Template", description: "Kreirati izgled aplikacije", due_date: "22-11-2014", tags: "test, template", status: "pending"},
	{id_task: 2, id_project: 1, id_user: 2, title: "Plugins", description: "Učitati plugin-ove", due_date: "25-11-2014", tags: "plugins", status: "pending"},
	{id_task: 3, id_project: 1, id_user: 3, title: "Ember application", description: "Definisati rutere i kontrolere", due_date: "30-11-2014", tags: "ember, router, controller", status: "pending"},
	{id_task: 4, id_project: 2, id_user: 4, title: "Template", description: "Kreirati izgled aplikacije", due_date: "05-01-2015", tags: "test, template", status: "pending"}
];

Database.comment = [];

Database.history = [];

Database.user = [
	{id_user: 1, firstname: "Peter", lastname: "Cech", avatar: "avatar1.jpg"},
	{id_user: 2, firstname: "Olivia", lastname: "Wilde", avatar: "avatar2.jpg"},
	{id_user: 3, firstname: "Mark", lastname: "Zuckerberg", avatar: "avatar3.jpg"},
	{id_user: 4, firstname: "Carles", lastname: "Puyol", avatar: "avatar4.jpg"},
	{id_user: 5, firstname: "Andreas", lastname: "Iniesta", avatar: "avatar5.jpg"},
	{id_user: 6, firstname: "Vanessa", lastname: "Bond", avatar: "avatar6.jpg"}
];

Database.tag = ["Testing", "Important", "Info", "Pending", "Completed", "Requested", "Approved"];




