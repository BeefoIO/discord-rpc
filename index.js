//var config = require('./config');
var DiscordRPC = require('./discord-rpc');
var fs = require('fs');

var config = fs.readFileSync('./config.json', 'utf8');
var config = JSON.parse(config);

var clientId = config.clientId;
 
var current = -1;

// only needed for discord allowing spectate, join, ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = Date.now();
const endTimestamp = Date.now() + 15e3;

async function setActivity() {
  if (!rpc) {
    return;
  }

  if(current == config.objects.length-1){
    current = 0;
  }else{
    current++;
  }

  rpc.setActivity({
    details: config.objects[current].DETAILS,
    state: config.objects[current].STATE,
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 15e3,
    largeImageKey: 'snek_large',
    largeImageText: 'tea is delicious',
    smallImageKey: 'snek_small',
    smallImageText: 'i am my own pillows',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);