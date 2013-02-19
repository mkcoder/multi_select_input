var mk_multiedit = {
	config : {
		mainID : 	 '.test', // attach the submit and cancel button to
		parent : 	 '#todoItem', // what elements are edit
		json_keys:   "[data-json]", // where are all the json KEYS at?
		submitElement: "input.edit", // where is the values when i hit the submit button
		// json_keys: 	 '.edit', // where is the json keys attribute data-json on?,
		// json_values: '.edit', // where is the json value attribute data-json on?
		closest: 	 'li', // is there an li on this page?
		complete: 	 undefined,
		submit: 	 undefined,
		cancel: 	 undefined,
		ajax: 		 {
			setting: { /* settings are passed in as an object to jquery */ }
		}
	},
	json : '',
	cancelButton: $('<input/>', 
			{
				type: 'submit', 
				class: 'cancel', 
				value: 'cancel!'
			}),
	submitButton: $('<input/>', 
			{
				type: 'submit', 
				class: 'submit', 
				value: 'submit!'
			}),
	init : function (config) { // MAIN function to which sets off the chain of events
		$.extend(mk_multiedit.config, config)
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);	
		mk_multiedit.submit(); 
		mk_multiedit.cancel();

		// first of all go get the data from the form and make store it in json
		mk_multiedit.json = mk_multiedit.makeJson(mk_multiedit.config.json_keys, 
			mk_multiedit.config.parent);
	},
	makeJson: function ( /* element {class/data/id/item} that holds the key*/ elementKey, 
		/* element that holds the value */ elementValue) {
		var key = new Array(), // e.g = data-json
		    value = new Array(); // the {value:key}
		$(elementKey).each(function ( index ) {
			var cur_json = $(this).data('json'); // this refers to the current items json value gotten through json
			key[index] = cur_json; // { [KEY]: VALUE } // this will get the key
		});
		$(elementValue).each(function (index) {
			value[index] = $(this).text() || $(this)[0].value; // { KEY: [VALUES]} // this will get the value 
		})
		return mk_multiedit.form_to_json(key, value, false);
	},
	make_editable : function () {
		var me = mk_multiedit;
		// grab the parent
		// then 
		$(me.config.parent).each(function () {
			var this_text = $(this).text();
			

			// this takes up space
			// this is a work around for that
			// please submit a better work around? NO CSS, JUST JS
			$(this).text("");
			

			// this is the value that will be when it cancels
			$('<input />', { type: 'hidden', class: 'hidden', value: this_text}).appendTo(this);
			
			// this is the value that will submit
			$('<input />', { type: 'text', class: 'edit', value: this_text}).appendTo(this);
		});

		me.submitButton.appendTo(me.config.mainID);
		me.cancelButton.appendTo(me.config.mainID);
		$(mk_multiedit.config.parent)
			.off('click');
	}, 
	submit : function () { // will populate the json variable up above
		$(mk_multiedit.config.mainID).on('click', '.submit', function () {		
			mk_multiedit.json = mk_multiedit.makeJson(mk_multiedit.config.json_keys,  
				mk_multiedit.config.submitElement);

			mk_multiedit.complete();


			// call this when we click the submit button
			mk_multiedit.config.submit === undefined || mk_multiedit.config.submit()
		});
	}, 
	cancel : function () { // TODO: cancel will return the form its orginal self;
		$(mk_multiedit.config.mainID).on('click', '.cancel', function () {
			
			$(mk_multiedit.config.parent).each(function () {
				$(this).text( $(this).find('.hidden').val() );// go get the element and set the item to the 
			});
			mk_multiedit.complete();

			// call this when cancel button is clicked and finished doing what it is suppose to
			mk_multiedit.config.cancel === undefined || mk_multiedit.config.cancel()

		});
	},
	complete : function () { // makes the value of the field empty
		$(mk_multiedit.config.parent).each(function () {
			$(this).text( $(this).find('.edit').val() );// go get the element and set the item to the 
		});
		$('.cancel').remove();
		$('.submit').remove();
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);

		// this is called twice, once when submit is clicked
		// check that this is called because the complete is called
		(mk_multiedit.config.cancel === undefined || mk_multiedit.config.submit === undefined) 
		mk_multiedit.config.complete === undefined ||  mk_multiedit.config.complete(mk_multiedit.json)
	},
	form_to_json : function (key,value, indexed) { // takes normal form value into json object
		var json = "";
		$(key).each(function (index) {
			number = (indexed) ? index : ""; // should i add the number
			if ( index === key.length - 1)
			{
				json += '"'+ key[index] +'' + number + '":"' + value[index] + '"} ';
					
			}
			else if ( index === 0 )
			{
				json += ' {"' + key[index] + number + '":"' + value[index] + '", ';
			}
			else
			{ 
				json += '"'+ key[index] + number + '":"' + value[index] + '", ';
			}
		});
		return $.parseJSON(json);
	},
}