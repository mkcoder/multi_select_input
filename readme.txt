mk_multiselect is a great inline editing tool. Which allows you to make many text into inputs by a simple click of a button. 

a tutorial comming soon follow me on {twitter}[https://twitter.com/muhammad_khan40 ] for updates

sorry for this but here is a really dirty example of how to use this:

<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Using mk_multi select</title>
    <style>
    	body
		{
			width: 960px;
			margin: 0 auto;
		}

		.contact
		{
			width: 450px;
			background: #d0d1d0;
			padding: .7em 1.5em;
			margin: 1.3em;
			overflow: hidden;
			border-radius: 20px;
			box-shadow: 1px 1px 10px rgba(0,0,0,.45);
		}

		.contact li
		{
			list-style: none;	
		}

		.contact li b
		{
			margin-right: 10px;
		}

		.contact:hover
		{
			background: #008686;
			color: #fff;
		}

		.contact:hover h3
		{
			background: #012222;
		}

		.contact:hover a
		{
			color: #000d32;	
		}

		.contact img
		{
			background: #fff;
			box-shadow: inset 1px 1px 10px rgba(0,0,0,.75);
		}

		.contact h3
		{
			background: #e4e5e5;
			padding: .7em;
			width: 100%;
			box-shadow: inset 1px 1px 10px rgba(0,0,0,.1);
		}

		.fl
		{
			float: left;
		}

		.fr
		{
			float: right;
		}

		a
		{
			color: #005aff;
		}
    </style>
    <!--[if IE]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]--> 
    <script src="./js/jquery-1.8.1.min.js"></script>
</head>
<body>
	
	<div class="contact">
		<h3 class="name">Foo Bar</h3>
		<div class="fl">
			<img src="./images/blank-user-icon.png" alt="">
		</div>
		<div class="fr">
			<ul>
				<li><b >Address:</b><i class="edit">123 Main Street.</i></li>
				<li><b>Phone:</b><i class="edit">1(111)222-3333</i></li>
				<li><b>Email:</b><i class="edit">foo@example.org</i></li>
				<li><b>Company:</b><i class="edit">example</i></li>
				<li><b>Website:</b><a href="#" class="edit">example.org</a></li>
			</ul>
		</div>
	</div>
	<script src="../[html5]simpleToDo/mk_multiedit.js"></script>
	<script>
		mk_multiedit.init({ mainID: '.contact', parent: '.edit' });
	</script>
</body>
</html>