// const checkAccess = require('../helper');

// const menuOptions = (id)=> {
//     const ifAccessDeny = checkAccess(id);

//         if (ifAccessDeny) {
//           return [
//             {
//                 text: {
//                      type: 'plain_text',
//                      text: 'list of all actions',
//                      emoji: true
//                 },
//                 value: 'get_actions'
//             },
//             {
//                 text: {
//                      type: 'plain_text',
//                      text: 'list of all rewards',
//                      emoji: true
//                 },
//                 value: 'get_rewards'
//             },
//             {
//                 text: {
//                     type: 'plain_text',
//                     text: 'balance',
//                     emoji: true
//                 },
//                value: 'balance'
//             },
//             {
//                 text: {
//                    type: 'plain_text',
//                     text: 'karma',
//                     emoji: true
//                },
//                  value: 'Karma'
//              },
//              {
//                 text: {
//                      type: 'plain_text',
//                     text: 'return a reward',
//                    emoji: true
//                  },
//                 value: 'Return_reward'
//              }
//          ]

//      }
//      return [
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'create new action',
//                  emoji: true
//              },
//              value: 'add_action'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'create new reward',
//                  emoji: true
//              },
//              value: 'add_reward'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'change balance',
//                  emoji: true
//              },
//              value: 'change_balance'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'get user\'s balance',
//                  emoji: true
//              },
//              value: 'user_balance'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'edit action',
//                  emoji: true
//              },
//              value: 'edit_action'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'edit reward',
//                  emoji: true
//              },
//              value: 'edit_reward'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'list of all actions',
//                 emoji: true
//              },
//              value: 'get_actions'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'list of all rewards',
//                  emoji: true
//              },
//              value: 'get_rewards'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'balance',
//                  emoji: true
//              },
//              value: 'balance'
//          },
//          {
//              text: {
//                  type: 'plain_text',
//                  text: 'karma',
//                  emoji: true
//              },
//              value: 'Karma'
//          },
//          {
//              text: {
//                 type: 'plain_text',
//                  text: 'return a reward',
//                  emoji: true
//              },
//              value: 'Return_reward'
//          }
//      ]

// }

// module.exports = (id) => {
//     const optionsMenu = menuOptions(id);

//     return optionsMenu;

//     // return [{
//     //     type: 'input',
//     //     dispatch_action: true,
//     //     element: {
//     //         type: 'static_select',
//     //         placeholder: {
//     //             type: 'plain_text',
//     //             text: 'Select a command',
//     //             emoji: true
//     //         },
//     //         options: optionsMenu,
//     //         action_id: 'static_select-command'
//     //     },
//          label: {
//              type: 'plain_text',
//             text: 'This is a list of all commands.',
//             emoji: true
//          }
//      }]
// };
module.exports = [{
    type: 'input',
    dispatch_action: true,
    element: {
        type: 'static_select',
        placeholder: {
            type: 'plain_text',
            text: 'Select a command',
            emoji: true
        },
        options: [
            {
                text: {
                    type: 'plain_text',
                    text: 'create new action (only for admin)',
                    emoji: true
                },
                value: 'add_action'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'create new reward (only for admin)',
                    emoji: true
                },
                value: 'add_reward'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'change balance (only for admin)',
                    emoji: true
                },
                value: 'change_balance'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'get user\'s balance (only for admin)',
                    emoji: true
                },
                value: 'user_balance'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'edit action (only for admin)',
                    emoji: true
                },
                value: 'edit_action'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'edit reward (only for admin)',
                    emoji: true
                },
                value: 'edit_reward'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'list of all actions',
                    emoji: true
                },
                value: 'get_actions'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'list of all rewards',
                    emoji: true
                },
                value: 'get_rewards'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'balance',
                    emoji: true
                },
                value: 'balance'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'karma',
                    emoji: true
                },
                value: 'Karma'
            },
            {
                text: {
                    type: 'plain_text',
                    text: 'return a reward',
                    emoji: true
                },
                value: 'Return_reward'
            }
        ],
        action_id: 'static_select-command'
    },
    label: {
        type: 'plain_text',
        text: 'This is a list of all commands.',
        emoji: true
    }
}];
