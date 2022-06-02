export const agency_bot_agent_ID = '50853d1054d5f112c2ec4c269b4ffbac'; // works on monday to friday 17 to 9 utc && friday to moday 17 to 9
export const normal_bot_agent_ID = '463350084b0f309f14f8270a0f2a52c7'; // works on monday to friday 9  to 17 utc &&
//-----------------------------------------------------------
export enum Strategy {
  everydayWork = '0 9 * * MON-FRI',
  everydayEndOFWork = '0 17 * * MON-FRI',
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

export const getNormalAgentOnline = {
  status: BotStatus.online,
  agent_id: normal_bot_agent_ID,
};

export const getNormalAgentOffline = {
  status: BotStatus.offline,
  agent_id: normal_bot_agent_ID,
};

export const getAgencyOnline = {
  status: BotStatus.online,
  agent_id: agency_bot_agent_ID,
};
export const getAgencyOffline = {
  status: BotStatus.offline,
  agent_id: agency_bot_agent_ID,
};

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
