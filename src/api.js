const { App, AwsLambdaReceiver } = require('@slack/bolt');

const {attachments_helper} = require('./helper/');

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: awsLambdaReceiver,
    processBeforeResponse: true
});

app.event('app_mention', async ({ event, say }) => {
    try {
        await say({
            text: `Hey <@${event.user}> you mentioned me`,
            attachments: attachments_helper
        });
    }
    catch (e) {
        console.log(e);
    }

});
app.action({callback_id: 'actions_bot', type: 'interactive_message'}, async ({action, ack, say }) => {
    await ack();
    switch (action.value) {
        case 'store':
            await say('Here should be a list of products');

            break;
        case 'list_actions':
            await say('Here should be a list of actions ');

            break;
    }
})

module.exports.handler = async (event, context, callback) => {
    const handler = await app.start();
    return handler(event, context, callback);
}
