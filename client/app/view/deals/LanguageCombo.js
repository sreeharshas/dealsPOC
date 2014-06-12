Ext.define('CRM.view.deals.LanguageCombo' ,{
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.dealsLanguageCombo',

	store: "Languages",
	fieldLabel: 'Language',
	displayField:'language',
	editable: false,
	width: 300,
	labelWidth: 70,
	value: 'India',
	queryMode: 'local',
	emptyText: 'Select a language...',
	hideLabel: false,
	listeners: {
		select: {
			fn: function(cb, records) {
				var record = records[0];
				window.location.search = Ext.urlEncode({"lang":record.get("code")});
			},
			scope: this
		},
		afterrender: function(){
			var langParams = Ext.urlDecode(window.location.search.substring(1));
			if (langParams.lang) {
				var record = this.store.findRecord('code', langParams.lang, null, null, null, true);
				if (record) {
					this.setValue(record.data.language);
				}
			}
		}
	}
});


