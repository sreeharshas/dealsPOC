Ext.Loader.setConfig({
    enabled: true
});

//extjs-4.2.1.883
//Ext.Loader.setPath('Ext.ux', 'lib/extjs-4.2.1.883/src/ux');
//extjs-5.0
Ext.Loader.setPath('Ext.ux', 'lib/extjs-5.0/src/ux');

Ext.require(['Ext.data.*', 
             'Ext.String.*',
             'Ext.ux.grid.FiltersFeature',
             'Ext.ux.statusbar.StatusBar',
             'Ext.ux.ToolbarDroppable',
             'Ext.util.*',
             'Ext.tip.*',
             'Ext.Toolbar',
             'Ext.toolbar.*',
             'Ext.ux.PagingToolbarResizer',
             'Ext.ux.BoxReorderer',
             'Ext.grid.plugin.BufferedRenderer',
             'Ext.grid.*',
			 'Ext.container.Viewport']);
			 
Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'CRM',

    appFolder: 'app',
	controllers: [
        'Deals'
    ],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: {
				type: 'vbox'
			},
			bodyPadding: 10, 	 
			margin: "0 0 0 10",
            items: [
				{
					xtype: 'dealsLanguageCombo',
					margin: "10 0 0 0"
				}
                , {
					xtype : 'dealsGridPanel',
					css   : 'gridCss',
					itemId: 'dealsGridPanelID',
					margin: "20 0 0 0",					
                }
            ]
        });
		
		var langParams = Ext.urlDecode(window.location.search.substring(1));
		if (langParams.lang === undefined) {
			window.location.search = Ext.urlEncode({"lang":"en_IN"});
		}
		
		if (langParams.lang) {
			var url = Ext.util.Format.format("resources/locale/ext-lang-{0}.js", langParams.lang);
			
			Ext.Loader.injectScriptElement(
				url,
				onSuccess,
				onFailure,
				this);
 		}
    }
});

Ext.onReady(function() {
	
});

var onSuccess = function() {
	//alert('loaded locale');
};

var onFailure = function(e) {
	Ext.Msg.alert('Failure', 'Failed to load locale file.' + JSON.stringify(e));
};