const { App, AwsLambdaReceiver } = require('@slack/bolt');

const connectDB = require('./dataBase/connections');
const { adminId, dataTableName } = require('./constants')
const { approvedAttachment,
    attachments_helper,
    getInputValue,
    overflowSection,
    viewCreate,
    selectMenu } = require('./helper/');
const { roxyValidation,
    textInputValidation } = require('./middleware');
const { actionService: { action_service },
    userService: { user_service },
    storeService: { store_service }} = require('./service')


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
        case 'store': {
            const selectAttachments = await selectMenu(dataTableName.STORE, 'select_store');

            await say({
                text: `Hey pick item`,
                attachments: selectAttachments
            });
            break;
        }
        case 'list_actions':
            const selectAttachments = await selectMenu(dataTableName.ACTION, 'select_action');

            await say({
                text: `Hey pick item`,
                attachments: selectAttachments
            });

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
        const viewAction = viewCreate('Action', 'view_1')

        await client.views.open({
            trigger_id: body.trigger_id,
            view: viewAction
        });

    } catch (error) {
        console.error(error);
    }
});

app.command('/add_reward', async ({ ack, body, say,client }) => {
    try {
        await ack();

        if (!adminId.includes(body.user_id)){
            await say('Access deny');

            return;
        }
        const viewStore = viewCreate('Store', 'view_2')

        await client.views.open({
            trigger_id: body.trigger_id,
            view: viewStore
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

app.view('view_2' , async ({ ack, body, view, client }) =>{
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

    await store_service.createStore({value: textValue, rocks: Number(roxyValue)})

    await client.chat.postMessage({
        channel: body.user.id,
        text: 'Reward create'
    });
});

app.command('/get_actions', async ({ ack, say }) => {
    try {
        await ack();

        const selectAttachments = await selectMenu(dataTableName.ACTION, 'select_action');

        await say({
            text: `Hey pick item`,
            attachments: selectAttachments
        });

    } catch (error) {
        console.error(error);
    }
});

app.command('/get_rewards', async ({ ack, say }) => {
    try {
        await ack();

        const selectAttachments = await selectMenu(dataTableName.STORE, 'select_store');

        await say({
            text: `Hey pick item`,
            attachments: selectAttachments
        });

    } catch (error) {
        console.error(error);
    }
});

app.command('/menu', async ({ ack, say }) => {
    try {
        await ack();

        await say({
            blocks: overflowSection
        });

    } catch (error) {
        console.error(error);
    }
});

app.command('/balance', async ({ ack,body, client }) => {
    try {
        await ack();

        const {rocks} = await user_service.findUser({id: body.user_id})

        await client.chat.postMessage({
            channel: body.user_id,
            text: `You have ${rocks} rocks`
        });

    } catch (error) {
        console.error(error);
    }
});

app.action({callback_id: 'select_action', type: 'interactive_message'}, async ({action, ack, say }) => {
    await ack();

    let selectValue = '';

    const {selected_options} = action;

    selected_options.map(({value}) => {
        selectValue = value
    });

    const {rocks} = await action_service.findAction({value: selectValue});

    await say({
        text: `You chose ${selectValue}. It costs ${rocks} rocks`,
        attachments: approvedAttachment
    });

});

app.action({callback_id: 'select_store', type: 'interactive_message'}, async ({action, ack, say }) => {
    await ack();

    let selectValue = '';

    const {selected_options} = action;

    selected_options.map(({value}) => {
        selectValue = value
    });

    const {rocks} = await store_service.findOneStore({value: selectValue});

    await say({
        text: `You chose ${selectValue}. It costs ${rocks} rocks`,
        attachments: approvedAttachment
    });

});
module.exports.handler = async (event, context, callback) => {
    const handler = await app.start();
    return handler(event, context, callback);
}

module.exports.authorization = (event, context, callback) =>{
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "Authorization was called",
            input: event
        }),
    };
    callback(null, response);
}
