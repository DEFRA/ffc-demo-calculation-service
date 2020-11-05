/**
 *
 *   this file is used for manual testing of the service.
 *   The script './scripts/send-test-message' will execute the code
 *   in the running container to send a message to the source queue
 *
**/
const MessageSender = require('../app/services/messaging/message-sender')
const config = require('../app/config')

const calculationMessage = {
  claimId: 'TEST123',
  propertyType: 'business',
  accessible: false,
  dateOfSubsidence: '2019-07-26T09:54:19.622Z',
  mineType: ['coal'],
  email: 'test@email.com'
}

async function sendMessage (queueConfig, message) {
  const sender = new MessageSender(
    `test-${queueConfig.address}-sender`,
    queueConfig
  )
  await sender.openConnection()
  const delivery = await sender.sendMessage(message)
  await sender.closeConnection()

  return delivery
}

sendMessage(config.calculationQueueConfig, calculationMessage)
  .then((delivery) => console.debug('Message sent:', delivery))
  .catch(() => {
    console.error('Failed to send message')
    process.exitCode = 1
  })
  .finally(() => process.exit())
