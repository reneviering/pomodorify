#! /usr/bin/env node

var notifier = require('node-notifier');
var util = require('util');
var open = require('open');

var duration = parseInt(process.argv[process.argv.length -1], 10);

function clearConsole() {
	util.print("\u001b[2J\u001b[0;0H");
}

function stopPomodoro() {
    notifier.notify({
        title:'pomodoro finished',
        message:'pomodoro finished, next please!',
        wait: 'true'
    }, function(err, response) {
		console.log('Pomodori finished...');
        open(__dirname +'/readynotification.html');
    })
}

function startTimer(durationInMinutes) {
	var totalSeconds = durationInMinutes * 60;

	var intervalId = setInterval(function() {
		minutes = parseInt(totalSeconds / 60, 10);
		seconds = parseInt(totalSeconds % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		clearConsole();
		console.log(minutes + ":" + seconds);

		if (--totalSeconds < 0) {
			stopPomodoro();
			clearInterval(intervalId);
		}
	}, 1000);
}

startTimer(duration);
