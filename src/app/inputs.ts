export const agency_bot_agent_ID = '50853d1054d5f112c2ec4c269b4ffbac';
export const normal_bot_agent_ID = '463350084b0f309f14f8270a0f2a52c7';
//-----------------------------------------------------------
export enum StrategyTime {
  weekend = '0 17 * * FRI',
  work = '0 09 * * MON',
}
//-----------------------------------------------------------
enum BotStatus {
  online = 'accepting_chats',
  offline = 'offline',
}
//-------------------------------------------------------
export interface IAgentStatus {
  readonly status: string;
  readonly agent_id: string;
}
//---------------------------------------------------------

// @Injectable()
// export class Payload implements IAgentStatus {
//   status = '';
//   agent_id = '';

//   constructor() {}

export const getNormalAgentOnline = (): IAgentStatus => {
  return {
    status: BotStatus.online,
    agent_id: normal_bot_agent_ID,
  };
};

export const getNormalAgentOffline = (): IAgentStatus => {
  return {
    status: BotStatus.offline,
    agent_id: normal_bot_agent_ID,
  };
};

export const getAgencyOnline = (): IAgentStatus => {
  return {
    status: BotStatus.online,
    agent_id: agency_bot_agent_ID,
  };
};
export const getAgencyOffline = (): IAgentStatus => {
  return {
    status: BotStatus.offline,
    agent_id: agency_bot_agent_ID,
  };
};
//}
//---------------------------------------------------------------------------
export const Set_Bot_Status_URL =
  'https://api.livechatinc.com/v3.2/agent/action/set_routing_status';
export const List_Bot_Status_URL =
  'https://api.livechatinc.com/v3.4/agent/action/list_routing_statuses';
//--------------------------------------------------------------------------
export const parseStringEnv = (name: string) => {
  const value: string = process.env[name];
  if (!value) {
    throw new Error(`Invalid env ${name}`);
  }

  return value;
};
