var crypto = require('crypto');

// Event Hubs parameters
var namespace = 'RobEichDevEventHub-ns';
var hubname ='demoeventhub';
var eventHubAccessKeyName = 'EventHubKey';
var eventHubAccessKey = 'mlHhCj6aAVgILAtwrxqnBSL5pfa5yJD3nhbN8CrTWZ0=';

//Device-Id
var deviceName = 'mytessel';

// Full Event Hub publisher URI
var eventHubUri = 'https://' + namespace + '.servicebus.windows.net' + '/' + hubname + '/publishers/' + deviceName + '/messages';
 
function create_sas_token(uri, keyName, key)
{
    //Token expires in a december
    var expiry = '1417774602';
 
    var signedString = encodeURIComponent(uri) + '\n' + expiry;
    var hmac = crypto.createHmac('sha256', key);
    hmac.update(signedString);
    var signature = hmac.digest('base64');
    var token = 'SharedAccessSignature sr=' + encodeURIComponent(uri) + '&sig=' + encodeURIComponent(signature) + '&se=' + expiry + '&skn=' + keyName;
 
    return token;
}
 
var my_sas = create_sas_token(eventHubUri, eventHubAccessKeyName, eventHubAccessKey)
console.log(my_sas);


