import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import {
  agency_bot_agent_ID,
  getAgencyOffline,
  getAgencyOnline,
  getNormalAgentOffline,
  getNormalAgentOnline,
  IAgentStatus,
  List_Bot_Status_URL,
  normal_bot_agent_ID,
  parseStringEnv,
  Set_Bot_Status_URL,
  StrategyTime,
} from './inputs';

@Injectable()
export class AppService {
  constructor() {}

  //========= goWorkMode (turn normal bot up & agency bot down)=========================

  //@Cron('0 09 * * MON', { name: 'weekend-job' }) // for testing
  @Cron(StrategyTime.everydayWork, { name: 'weekend-job' }) // (monday-friday) at 9:00 UTC
  async goWorkMode(): Promise<boolean> {
    try {
      const agency_bot_offline = await axios.post(
        Set_Bot_Status_URL,
        getAgencyOffline,
        {
          headers: {
            Authorization: `Basic ${parseStringEnv('TOKEN')}`,
          },
        },
      );
      //-------------------------------------------
      const normal_bot_online = await axios.post(
        Set_Bot_Status_URL,
        getNormalAgentOnline,
        {
          headers: {
            Authorization: `Basic ${parseStringEnv('TOKEN')}`,
          },
        },
      );
      console.log(
        '*** WORK MODE ACTIVATED *** normal bot up , agency bot down',
      );
      return agency_bot_offline.status && normal_bot_online.status == 200
        ? true
        : false;
    } catch (error) {
      console.log(error);
    }
  }
  //======== goEndOfdayMode  (turn normal bot down & agency bot up) ===========================================

  //@Cron('0 09 * * MON', { name: 'backwork-job' }) // for testing
  @Cron(StrategyTime.everydayEndOFWork, { name: 'backwork-job' }) // (monday-friday) at 17:00 UTC
  async goEndOfDayMode(): Promise<boolean> {
    try {
      const normal_bot_offline = await axios.post(
        Set_Bot_Status_URL,
        getNormalAgentOffline,
        {
          headers: {
            Authorization: `Basic ${parseStringEnv('TOKEN')}`,
          },
        },
      );
      //------------------------------------------
      const agency_bot_online = await axios.post(
        Set_Bot_Status_URL,
        getAgencyOnline,
        {
          headers: {
            Authorization: `Basic ${parseStringEnv('TOKEN')}`,
          },
        },
      );
      //-------------------------------------------
      console.log(
        '*** EndOfDay MODE ACTIVATED *** agency bot up , normal bot down',
      );

      return agency_bot_online.status && normal_bot_offline.status == 200
        ? true
        : false;
    } catch (error) {
      console.log(error);
    }
  }
  // -------------- get bots status --------------------------
  async getBotsStatus(): Promise<IAgentStatus[]> {
    const resp = await axios.post(
      List_Bot_Status_URL,
      {},
      {
        headers: {
          Authorization: `Basic ${parseStringEnv('TOKEN')}`,
        },
      },
    );
    const filtered_response = resp.data.filter((a: { agent_id: string }) => {
      return (
        a.agent_id === agency_bot_agent_ID || a.agent_id === normal_bot_agent_ID
      );
    });
    console.log(filtered_response);

    return filtered_response;
  }
}
