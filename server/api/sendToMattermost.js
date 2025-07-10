import cfg from '~/conf'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const res = await $fetch(`${ cfg.MATTERMOST_URL }/api/v4/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ cfg.BOT_TOKEN }`,
      'Content-Type': 'application/json'
    },
    body: {
      channel_id: cfg.CHANNEL_ID,
      message: `Клиент ${body.uuid} перешел на ${body.marketplace} в ${body.productName}`
    }
  })

  return res
})