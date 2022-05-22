import { Injectable } from '@nestjs/common';

export const agency_bot_agent_ID = '50853d1054d5f112c2ec4c269b4ffbac';
export const normal_bot_agent_ID = '463350084b0f309f14f8270a0f2a52c7';

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
  // private static instance: Payload;
  constructor() {}

  // static getInstance(): Payload {
  //   if (!this.instance) {
  //     this.instance = new this();
  //   }

  //   return this.instance;
  // }

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

export const Set_Bot_Status_URL =
  'https://api.livechatinc.com/v3.2/agent/action/set_routing_status';
export const List_Bot_Status_URL =
  'https://api.livechatinc.com/v3.4/agent/action/list_routing_statuses';

export const parseStringEnv = (name: string) => {
  const value: string = process.env[name];
  // console.log(value);
  if (!value) {
    throw new Error(`Invalid env ${name}`);
  }

  return value;
};
