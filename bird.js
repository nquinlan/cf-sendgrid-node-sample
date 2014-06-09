var XenoCanto = require('xeno-canto');
var bird = new XenoCanto();
module.exports = function (name, callback) {
	name = name.toLowerCase().trim();
	switch (name) {
		case 'diver':
		case 'common loon':
		case 'loon':
			name = "great northern loon";
			break;
		default:
			break;
	}
	bird.search(name, function (self) {
		var call = self.entity.recordings[0] || {};
		var info;
		if(call.en){
			info = '<p><strong>Here&#8217;s the call of the ' + call['en'] + ' <i>(' + call['gen'] + ' ' + call['sp'] + ')</i>:</strong></p><a href="' + call['file'] + '"';
		}else{
			info = '<p><strong>Unfortunately, I couldn&#8217;t find your bird&#8217;s call, so here&#8217;s a loon:</strong></p><a href="http://etc.nicholasquinlan.com/bird-calls/resources/loon-call.mp3"';
		}

		info += ' style="color: #1158c4; font-weight: bold; font-size: 40px; display: block; text-align: center; margin: 10px 0; text-decoration: none;">&#9654; Play</a>';
		info += '<p><img src="http://etc.nicholasquinlan.com/bird-calls/resources/poweredbysendgrid.png" alt="Powered By SendGrid" style="border:1px solid #eee;" /></p>';

		call.info = info;
		callback(call);
	});
}
