import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApishipListsPointResponse,
  IApiship_listsPoints,
} from './interfaces/points.interface';
import { convertApishipPoint } from './helpers/convert-apiship-points';
import { ILogisticsApi_createPickupPointDto } from '../../interfaces/create.warehouse.dto';
import { isValidApishipPoint } from './helpers/validate-apiship-point';

const getApiUrl = (apiUrl: string, methodUrl: string) => {
  return apiUrl + methodUrl;
};

@Injectable()
export class ApishipService {
  url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.url = configService.get('APISHIP_API_URL');
    console.log(this.url);
  }

  async listsPoints(): Promise<ILogisticsApi_createPickupPointDto[]> {
    this.httpService.axiosRef.defaults.headers['Authorization'] =
      this.configService.get('APISHIP_AUTHORIZATION');
    this.httpService.axiosRef.defaults.headers['Content-Type'] =
      'application/xml';

    const limit = Number(this.configService.get('APISHIP_LISTS_POINTS_LIMIT'));
    let offset = 0;
    let total = 0;
    //let n = 0;

    /*
    const connectUrl = getApiUrl(
      this.url,
      'lists/points' + '?limit=' + limit + '&offset=' + offset
    );
    console.log(connectUrl);
    const data: ApishipListsPointResponse = await this.httpService.axiosRef.get(
      connectUrl
    );
    console.log(data);
    //total = meta.total;
    return;
    */

    const points: IApiship_listsPoints[] = [];
    const invalidPoints: IApiship_listsPoints[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      //console.log('iteration ' + n);
      const connectUrl = getApiUrl(
        this.url,
        'lists/points' + '?limit=' + limit + '&offset=' + offset
      );
      console.log(connectUrl);
      const data: ApishipListsPointResponse = (
        await this.httpService.axiosRef.get(connectUrl)
      ).data;
      //console.log(data);

      data.rows.map((el) => {
        if (isValidApishipPoint(el)) {
          points.push(el);
        } else {
          invalidPoints.push(el);
          //console.log('invalid apiship point = ' + el.name);
        }
      });
      console.log('points.length = ' + points.length);
      console.log('invalid points.length = ' + invalidPoints.length);

      total = data.meta.total;
      //total = data.meta.total;
      //n = n + 1;
      if (offset + limit >= total) {
        break;
      }
      //if (n > 22) {
      //  break;
      //}
      offset = offset + limit;
    }
    return points.map((el) => convertApishipPoint(el));
  }
}
