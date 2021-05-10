import 'dotenv/config'

import { Client, MessageAttachment } from 'discord.js'

import { recognize } from 'tesseract.js'

const client = new Client()

client.on('message', (message) => {
  if (message.author.bot) return
  const attachment = message.attachments.first() as
    | MessageAttachment
    | undefined
  if (attachment !== undefined) {
    recognize(attachment.url, 'eng', { logger: console.log }).then(
      ({ data: { text = 'Error' } }) => {
        message.channel.send(text)
      }
    )
  }
})

client
  .login(process.env.TOKEN)
  .then(() =>
    console.log(
      `Logged in as ${client.user.username}#${client.user.discriminator}`
    )
  )
