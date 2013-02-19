var mk_multiedit = {
	config : {
		mainID : 	 '.test', // attach the submit and cancel button to
		parent : 	 '#todoItem', // what elements are edit
		json_keys: 	 '.edit', // where is the json keys attribute data-json on?,
		json_values: '.edit', // where is the json value attribute data-json on?
		closest: 	 'li', // is there an li on this page?
		callBack: 	 undefined, 
	},
	json : '',
	init : function (config) { // MAIN function to which sets off the chain of events
		$.extend(mk_multiedit.config, config)
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);	
		mk_multiedit.submit(); 
		mk_multiedit.cancel();
		// first of all go get the data from the form and make store it in json
		mk_multiedit.makeJson(mk_multiedit.config.json_keys);

		// everything completes call the callback function
		mk_multiedit.config.callBack === undefined || mk_multiedit.config.callBack()
	},
	makeJson: function ( /* element {class/data/id/item} that holds the key*/ key ) {
		var key = new Array(), // e.g = data-json
		    value = new Array(); // the {value:key}
		$(key).each(function ( index ) {
			var cur_json = $(this).data('json'); // this refers to the current items json value gotten through json
			key[index] = cur_json; // { [KEY]: VALUE } // this will get the key
			value[cur_json] = $(this).closest(mk_multiedit.config.closest).find('input.edit').val(); // { KEY: [VALUES]} // this will get the value 
		});
		return mk_multiedit.form_to_json(key, value, false);
	},
	make_editable : function () {
		// grab the parent
		// then 
		$(mk_multiedit.config.parent).each(function () {
			var this_text = $(this).text();
			var data_json = $(this).parent().find('input').data('json')
			// this takes up space
			// this is a work around for that
			// please submit a better work around? NO CSS, JUST JS
			$(this).text("");

			// this is the value that will be when it cancels
			$('<input />', { type: 'hidden', class: 'hidden', value: this_text, 'data-json': data_json}).appendTo(this);
			
			// this is the value that will submit
			$('<input />', { type: 'text', class: 'edit', value: this_text, 'data-json': data_json}).appendTo(this);
		});
		$('<input/>', 
			{
				type: 'submit', 
				class: 'submit', 
				value: 'submit!'
			}).appendTo(mk_multiedit.config.mainID);
		$('<input/>', 
			{
				type: 'submit', 
				class: 'cancel', 
				value: 'cancel!'
			}).appendTo(mk_multiedit.config.mainID);
		$(mk_multiedit.config.parent)
			.off('click');
	}, 
	submit : function () { // will populate the json variable up above
		$(mk_multiedit.config.mainID).on('click', '.submit', function () {
			mk_multiedit.makeJson(mk_multiedit.config.json_keys);
			mk_multiedit.complete();
		});
	}, 
	cancel : function () { // TODO: cancel will return the form its orginal self;
		$(mk_multiedit.config.mainID).on('click', '.cancel', function () {
			
			$(mk_multiedit.config.parent).each(function () {
				$(this).text( $(this).find('.hidden').val() );// go get the element and set the item to the 
			});
			mk_multiedit.complete();
		});
	},
	complete : function () { // makes the value of the field empty
		$(mk_multiedit.config.parent).each(function () {
			$(this).text( $(this).find('.edit').val() );// go get the element and set the item to the 
		});
		$('.cancel').remove();
		$('.submit').remove();
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);	
	},
	form_to_json : function (key,value, indexed) { // takes normal form value into json object
		var json = "";
		$(key).each(function (index) {
			number = (indexed) ? index : ""; // should i add the number
			if ( index === key.length - 1)
			{
				json += '"'+ key[index] +'' + number + '":"' + value[key[index]] + '"} ';
					
			}
			else if ( index === 0 )
			{
				json += ' {"' + key[index] + number + '":"' + value[key[index]] + '", ';
			}
			else
			{ 
				json += '"'+ key[index] + number + '":"' + value[key[index]] + '", ';
			}
		});
		return $.parseJSON(json);
	},
}