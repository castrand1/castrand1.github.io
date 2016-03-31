$(document).ready(function() {

	var fireb = new Firebase('https://cas-dev-test.firebaseio.com/');

	$('#messages-form').submit(function(e) {
		e.preventDefault();

		var $messageInput = $(this).find('input[name="message"]');

		fireb.child('messages').push({
			text: $messageInput.val(),
			votes: 0
		})

		$messageInput.val("");
	})

	function getFanMessages() {
		fireb.child('messages').on('value', function(results) {
			$('#messages').empty();
			var values = results.val();
			
			for (var key in values) {
				var msg = values[key];
				var upvote = $('<button>upvote</button>').data("id", key);
				var container = $("<p>" + msg.text + ", " + msg.votes + "</p>");
				container.append(upvote);

				upvote.click(function() {
					var msgId = $(this).data("id");
					updateVotes(msgId, values[msgId].votes + 1);
				});

				container.appendTo("#messages");
			}
		})
	}

	function updateVotes(msgId, votes) {
		//var ref = new Firebase('https://cas-dev-test.firebaseio.com/messages/' + msgId);

		var ref = fireb.child('messages').child(msgId);
    	ref.update({ votes: votes })

	}

	getFanMessages();

})