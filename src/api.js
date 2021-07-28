const { App, AwsLambdaReceiver } = require('@slack/bolt');

const connectDB = require('./dataBase/connections');
const { adminId } = require('./constants')
const { actionSelectMenu, attachments_helper, getInputValue, viewActionCreate } = require('./helper/');
const { roxyValidation, textInputValidation } = require('./middleware');
const { actionService: { action_service }, userService: { user_service } } = require('./service')


const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

connectDB();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: awsLambdaReceiver,
    processBeforeResponse: true
});

(async () => {
    const result = await app.client.users.list({
        token: process.env.SLACK_BOT_TOKEN
    });

    return result.members.map(async ({id, name, is_bot}) => {
        const userExist = await user_service.findUser({id});

        if(!userExist && is_bot === false && name !== 'slackbot') {
            await user_service.createUser({id, name})
        }

    })
})();

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
});

app.command('/add_action', async ({ ack, body, say,client }) => {
    try {
        await ack();

        if (!adminId.includes(body.user_id)){
            await say('Access deny');

            return;
        }

        await client.views.open({
            trigger_id: body.trigger_id,
            view: viewActionCreate
        });

    } catch (error) {
        console.error(error);
    }
});

app.view('view_1', async ({ ack, body, view, client }) =>{
    const [
        actionInput,
        roxyInput
    ] = Object.values(view.state.values);
    const { textValue, roxyValue} = getInputValue(actionInput, roxyInput);

    const ifRoxyNotValid = roxyValidation(Number(roxyValue));
    const ifTextValid = textInputValidation(textValue);

    if (ifRoxyNotValid) {
        await ack({
            response_action: 'errors',
            errors: {
                roxy_block: 'Not valid input'
            }
        });

        return;
    }

    if (!ifTextValid) {
        await ack({
            response_action: 'errors',
            errors: {
                action_block: 'Not valid input'
            }
        });

        return;
    }

    await ack();

    await action_service.createAction({value: textValue, rocks: Number(roxyValue)})

    await client.chat.postMessage({
        channel: body.user.id,
        text: 'Action create'
    });
});

app.command('/get_actions', async ({ ack, say }) => {
    try {
        await ack();

        const selectAttachments = await actionSelectMenu();

        await say({
            text: `Hey pick item`,
            attachments: selectAttachments
        });

    } catch (error) {
        console.error(error);
    }
});

module.exports.handler = async (event, context, callback) => {
    const handler = await app.start();
    return handler(event, context, callback);
}
