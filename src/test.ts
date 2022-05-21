import { Injectable } from '@nestjs/common';

const agency_bot_agent_ID = '50853d1054d5f112c2ec4c269b4ffbac';
const normal_bot_agent_ID = '463350084b0f309f14f8270a0f2a52c7';

enum bot_status {
  online = 'accepting_chats',
  offline = 'offline',
}

export interface IAgentStatus {
  readonly status: string;
  readonly agent_id: string;
}

@Injectable()
export class Payload {
  private status = '';
  private agent_id = '';
  private static instance: Payload;
  constructor() {}

  static getInstance(): Payload {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  getNormalAgentOnline() {
    return {
      status: bot_status.online,
      agent_id: normal_bot_agent_ID,
    };
  }

  getNormalAgentOffline() {
    return {
      status: bot_status.offline,
      agent_id: normal_bot_agent_ID,
    };
  }

  getAgencyOnline() {
    return {
      status: bot_status.online,
      agent_id: agency_bot_agent_ID,
    };
  }
  getAgencyOffline() {
    return {
      status: bot_status.offline,
      agent_id: agency_bot_agent_ID,
    };
  }
}

// const x = Payload.getInstance();
// console.log(x.getAgencyOffline());
// const y = Payload.getInstance();
// console.log(y.getAgencyOffline());

// curl -X POST \
// https://api.livechatinc.com/v3.4/agent/action/list_routing_statuses \
// -H 'Authorization: Basic MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8=' \
// -H 'Content-Type: application/json' \
// -d '{
//     "filters": {
//       {"agent_id": '50853d1054d5f112c2ec4c269b4ffbac'}
//     }
//   }'

//   curl -X POST \
//   https://api.livechatinc.com/v3.4/configuration/action/get_agent \
//   -H 'Authorization: Basic MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8=' \
//   -H 'Content-Type: application/json' \
//   -d '{
//         "id": "50853d1054d5f112c2ec4c269b4ffbac"
//       }'

//       curl -X POST \
//   https://api.livechatinc.com/v3.3/configuration/action/list_bots?agent_id=50853d1054d5f112c2ec4c269b4ffbac" \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Basic MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8=' \
//   -d '{
//         "all": false
//       }'

//       curl -X POST \
//   'https://api.livechatinc.com/v3.4/configuration/action/get_bot' \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Basic MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8=' \
//   -d '{
//     "id": "463350084b0f309f14f8270a0f2a52c7"
//     }'
const A = [
  {
    agent_id: '2f513c2f41b96d19d90f2d4e608d225e',
    status: 'offline',
  },
  {
    agent_id: '463350084b0f309f14f8270a0f2a52c7',
    status: 'offline',
  },
  {
    agent_id: '50853d1054d5f112c2ec4c269b4ffbac',
    status: 'accepting_chats',
  },
  {
    agent_id: '635c449006052207eb3153773db3795e',
    status: 'offline',
  },
  {
    agent_id: 'narraba2@gmail.com',
    status: 'offline',
  },
];

console.log(
  A.filter((a) => {
    return (a.agent_id =
      '50853d1054d5f112c2ec4c269b4ffbac' && a.agent_id= '463350084b0f309f14f8270a0f2a52c7');
  }),
);
