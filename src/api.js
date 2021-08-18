const { App, AwsLambdaReceiver } = require('@slack/bolt');
require('dotenv').config();

const connectDB = require('./dataBase/connections');
const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN } = require('./config/config');
const { getAllUsers, setKarmaRocks } = require('./helper');
const {
    actionsListener, eventsListener, commandsListener, viewListener
} = require('./listeners');

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: SLACK_SIGNING_SECRET,
});

connectDB();

const app = new App({
    token: SLACK_BOT_TOKEN,
    receiver: awsLambdaReceiver,
    processBeforeResponse: true
});

(async () => {
    await getAllUsers(app);
})();

app.event('app_mention', eventsListener.appMention);

app.action({ callback_id: 'actions_bot', type: 'interactive_message' }, actionsListener.appMentionAction);

app.command('/add_action', commandsListener.addAction);

app.command('/add_reward', commandsListener.addReward);

app.view('view_1', viewListener.modalViewAction);

app.view('view_2', viewListener.modalViewReward);

app.view('karma_modal', viewListener.modalViewKarma);

app.command('/get_actions', commandsListener.getAllActions);

app.command('/get_rewards', commandsListener.getAllRewards);

app.command('/menu', commandsListener.botMenu);

app.command('/balance', commandsListener.userBalance);

app.command('/return_reward', commandsListener.returnReward);

app.command('/karma', commandsListener.karma);

app.action({ callback_id: 'approvedAction', type: 'interactive_message' }, actionsListener.approvedActionByUser);

app.action({ callback_id: 'approvedReward', type: 'interactive_message' }, actionsListener.approvedRewardByUser);

app.action({ callback_id: 'approvedHr_action', type: 'interactive_message' }, actionsListener.approvedActionByHR);

app.action({ callback_id: 'static_select-reward', type: 'interactive_message' }, actionsListener.selectRewardReturn);

app.action({ callback_id: 'approvedHr_return', type: 'interactive_message' }, actionsListener.approvedReturnByHR);

app.action({ callback_id: 'approvedKarma', type: 'interactive_message' }, actionsListener.approvedKarma);

app.action('select_action', actionsListener.selectAction);

app.action('select_store', actionsListener.selectStore);

app.action('static_select-command', actionsListener.selectCommand);

module.exports.handler = async (event, context, callback) => {
    const handler = await app.start();
    return handler(event, context, callback);
};

module.exports.authorization = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Authorization was called',
            input: event
        }),
    };
    callback(null, response);
};

module.exports.cronJob = async (event, context) => await setKarmaRocks();
