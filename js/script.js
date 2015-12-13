$(function() {
	var searchField = $('#query');
	var icon = $('#search-button');
	
	// Focus Event handler
	$(searchField).on('focus', function() {
		$(this).animate({
			width: '100%'
		}, 400);
		$(icon).animate({
			right: '0%'
		}, 400);
	});

	// Blur event handler
	$(searchField).on('blur', function() {
		if(searchField.val() == '') {
			$(searchField).animate({
				width: '45%'
			}, 400, function() {});
			$(icon).animate({
				right: '55%'
			}, 400, function() {});
		}
	});

	$('#search-form').submit(function(e) {
		e.preventDefault();
	});
})

function search() {
	var user = $('#query').val();

	// run GET request on API
	var response = $.ajax({
		url: 'https://api.github.com/users/' + user + '/repos',
		type: 'GET',
		success: function(data) {
			console.log(data);
			var repos_div = $('#repos');
			repos_div[0].innerHTML = '';

			$.each(data, function(i, item) {
				var div = getRepoInfo(item);
				repos_div.append(div);
			});
		},
		error: function(data) {
			$('#repos')[0].innerHTML = '';
			$('#repos').append(invalidUserOutput());
		}
	});
}

function getRepoInfo(repo) {
	var output = '<div class="repo"><div class="content">' +
	'<h3><a href="' + repo.html_url + '">' + repo.name + '</a></h3>' +
	'<p>' + repo.description + '</p>' +	'</div></div>';

	return output;
}

function invalidUserOutput() {
	var output = '<div class="invalid-content">' +
	'<h3>Not a valid github user</h3>' +
	'</div>'

	return output;
}