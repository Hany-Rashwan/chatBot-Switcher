import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Payload } from './test';

const token =
  'MjQ3MGRkN2EtZjZjYS00ZDk2LTlhZjYtODJlMTZiNTBlNzcwOmRhbDpNR0luQTVLbzkwdDZ6U0VoNjRHNUQtRlNKUG8=';
const URL = 'https://api.livechatinc.com/v3.2/agent/action/set_routing_status';

@Injectable()
export class AppService {
  constructor(private data: Payload) {}

  // 0 17 * * 5   // Firday at 17:00 UTC
  //@corn(0 17 * * 5 )
  async goWeekendStrategy(): Promise<boolean> {
    const normal_bot_offline = await axios.post(
      URL,
      this.data.getNormalAgentOffline(),
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    //------------------------------
    const agency_bot_online = await axios.post(
      URL,
      this.data.getAgencyOnline(),
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    //---------------------------
    console.log(
      '*** WEEKEND MODE ACTIVATED *** agency bot up , normal bot down',
    );

    return agency_bot_online.status && normal_bot_offline.status == 200
      ? true
      : false;
  }
  //===========================================================================================

  // 0 9 * * 1   // Monday at 09:00 UTC
  async goWorkStrategy(): Promise<boolean> {
    const agency_bot_offline = await axios.post(
      URL,
      this.data.getAgencyOffline(),
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    //------------------------------
    const normal_bot_online = await axios.post(
      URL,
      this.data.getNormalAgentOnline(),
      {
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
    );
    console.log('*** WORK MODE ACTIVATED *** normal bot up , agency bot down');
    return agency_bot_offline.status && normal_bot_online.status == 200
      ? true
      : false;
  }

  // async getBotStaus(): Promise<IAgentStatus> {
  //   const resp = await axios.post(URL, this.data.getAgencyOnline(), {
  //     headers: {
  //       Authorization: `Basic ${token}`,
  //     },
  //   });
  //   console.log('payload:', this.data.getAgencyOnline(), 'response:', resp);
  //   return resp.data;
  // }
}
