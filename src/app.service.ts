import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { IAgentStatus, Payload } from './test';

const token =
  'MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8='; //process.env.TOKEN;
const Set_Bot_Status_URL =
  'https://api.livechatinc.com/v3.2/agent/action/set_routing_status'; //process.env.SETURL;
const List_Bot_Status_URL =
  'https://api.livechatinc.com/v3.4/agent/action/list_routing_statuses'; //process.env.LISTURL;

@Injectable()
export class AppService {
  constructor(private data: Payload) {}

  //========= goWeekendStrategy (turn normal bot down & agency bot up)=========================

  //@Cron('0 09 * * MON', { name: 'weekend-job' }) // for testing
  @Cron('0 17 * * FRI', { name: 'weekend-job' }) // Firday at 17:00 UTC
  async goWeekendStrategy(): Promise<boolean> {
    try {
      const normal_bot_offline = await axios.post(
        Set_Bot_Status_URL,
        this.data.getNormalAgentOffline(),
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      //------------------------------------------
      const agency_bot_online = await axios.post(
        Set_Bot_Status_URL,
        this.data.getAgencyOnline(),
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      //-------------------------------------------
      console.log(
        '*** WEEKEND MODE ACTIVATED *** agency bot up , normal bot down',
      );

      return agency_bot_online.status && normal_bot_offline.status == 200
        ? true
        : false;
    } catch (error) {
      console.log(error);
    }
  }
  //======== goWorkStrategy  (turn normal bot up & agency bot down) ===========================================

  //@Cron('0 09 * * MON', { name: 'backwork-job' }) // for testing
  @Cron('0 09 * * MON', { name: 'backwork-job' }) // Monday at 09:00 UTC
  async goWorkStrategy(): Promise<boolean> {
    try {
      const agency_bot_offline = await axios.post(
        Set_Bot_Status_URL,
        this.data.getAgencyOffline(),
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      //-------------------------------------------
      const normal_bot_online = await axios.post(
        Set_Bot_Status_URL,
        this.data.getNormalAgentOnline(),
        {
          headers: {
            Authorization: `Basic ${token}`,
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
  // ------------------------------------------
  async getBotsStatus(): Promise<IAgentStatus[]> {
    const resp = await axios.post(
      List_Bot_Status_URL,
      {},
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    const filtered_response = resp.data.filter((a: { agent_id: string }) => {
      return (
        a.agent_id === '50853d1054d5f112c2ec4c269b4ffbac' ||
        a.agent_id === '463350084b0f309f14f8270a0f2a52c7'
      );
    });
    console.log(filtered_response);
    return filtered_response;
  }
}
