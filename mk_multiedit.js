var mk_multiedit = {
	config : {
		mainID : '.test', // attach the submit and cancel button to
		parent : '#todoItem' // what elements are edit
	},
	json : '',

	init : function (config) {
		$.extend(mk_multiedit.config, config)
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);	
		mk_multiedit.submit();
	},
	make_editable : function () {
				$(mk_multiedit.config.parent).each(function () {
					var this_text = $(this).text();
					$(this).text("");
					var data_json = $(this).parent().find('input').data('json')
					$('<input />', { type: 'text', class: 'edit', value: this_text, 'data-json': data_json}).appendTo(this);
				});
				$('<input/>', {type: 'submit', class: 'submit', value: 'submit!'}).appendTo(mk_multiedit.config.mainID);
				$('<input/>', {type: 'submit', class: 'cancel', value: 'cancel!'}).appendTo(mk_multiedit.config.mainID);
				$(mk_multiedit.config.parent).off('click');
	}, 
	submit : function () {
		$(mk_multiedit.config.mainID).on('click', '.submit', function () {
			var key = new Array();
			var value = new Array();
			$('.edit').each(function ( index ) {
				value[index] = $(this).data('json');
				key[$(this).data('json')] = $(this).val();
			});
			this.json = mk_multiedit.form_to_json(key, value, false);
			mk_multiedit.complete();
		});
	}, 
	complete : function () {
		$(mk_multiedit.config.parent).each(function () {
			$(this).text( $(this).find('.edit').val() );
		});
		$('.cancel').remove();
		$('.submit').remove();
		$(mk_multiedit.config.parent).on('click', mk_multiedit.make_editable);	
	},
	form_to_json : function (value, key, indexed) {
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