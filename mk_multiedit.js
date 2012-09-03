var mk_multiedit = {
	
	config : {
		mainID : '.test',
		parent : '#todoItem'
	},

	json : '',

	init : function (config) {
		$.extend(mk_multiedit.config, config)
		$(mk_multiedit.config.mainID).on('click', mk_multiedit.make_editable);	
		mk_multiedit.submit();
	},

	make_editable : function () {
				$(mk_multiedit.config.mainID).each(function () {
					var x = $(this).text();
					var test = $('.this');
					$(this).text("");
					var data_json = $(this).parent().find('input').data('json')
					$('<input />', { type: 'text', class: 'edit', value: x, 'data-json': data_json}).appendTo(this);
				});
				$('<input/>', {type: 'submit', class: 'submit', value: 'submit!'}).appendTo('#todoItem');
				$('<input/>', {type: 'submit', class: 'cancel', value: 'cancel!'}).appendTo('#todoItem');
				$(mk_multiedit.config.mainID).off('click');
	}, 

	submit : function () {
		$(mk_multiedit.config.parent).on('click', '.submit', function () {
			var key = new Array();
			var value = new Array();
			$('.edit').each(function ( index ) {
				value[index] = $(this).data('json');
				key[$(this).data('json')] = $(this).val();
			});
			this.json = mk_multiedit.form_to_json(key, value, false);
			console.log(this.json);
			mk_multiedit.complete();
		});
	}, 

	complete : function () {
		$(mk_multiedit.config.mainID).each(function () {
			$(this).text( $(this).find('.edit').val() );
		});
		$('.cancel').remove();
		$('.submit').remove();
		$(mk_multiedit.config.mainID).on('click', mk_multiedit.make_editable);	
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