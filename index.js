/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

const PubSub = require('@google-cloud/pubsub');

const pubsub = new PubSub();

function publish(data) {
	const topicName = process.env.topicName;
	const dataBuffer = Buffer.from(data);

	const customAttributes = {
  		origin: 'text-to-task'
	};

    pubsub
      .topic(topicName)
      .publisher()
      .publish(dataBuffer, customAttributes)
      .then(results => {
        const messageId = results[0];
        console.log(`Message ${messageId} published.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
}

exports.parseText = (event, context) => {
	const pubsubMessage = Buffer.from(event.data, 'base64').toString();
  	console.log(`Message received: ${pubsubMessage}`);

  	const colon = /\s*:\s*/
  	const firstColon = /\s*:\s*(.+)/
    const dash = /\s*-\s*/
    const digits = /\d+/g

    const splited = pubsubMessage.split(/\s*(;|\.)\s*/)

    var instructions = splited.find((value) => value.includes("Instruções")).split(colon)[1];
    var delivery = splited.find((value) => value.includes("Entrega")).split(colon)[1];
    var local = splited.find((value) => value.includes("Local")).split(colon)[1];
    var value = splited.find((value) => value.includes("Valor da tarefa")).split(firstColon)[1];

    var taskNumber = splited.find(value => value.includes("TAREFA")
    ).split(dash)[0].match(digits).join('')

    var task = {
      taskNumber,
      instructions,
      delivery,
      local,
      value
    }
    const stringTask = JSON.stringify(task)
	
    console.log(`${stringTask}`)
  	
  	publish(stringTask);
};
