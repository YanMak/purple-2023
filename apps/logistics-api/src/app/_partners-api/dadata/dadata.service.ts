import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDadata_v1_clean_address_response } from './interfaces/v1_clean_address.interface';

const getApiUrl = (apiUrl: string, methodUrl: string) => {
  return apiUrl + methodUrl;
};

@Injectable()
export class DadataService {
  url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.url = configService.get('DADATA_API_URL');
    console.log(this.url);
  }

  public async v1_clean_address(
    addresses: string[]
  ): Promise<IDadata_v1_clean_address_response[]> {
    this.httpService.axiosRef.defaults.headers['Authorization'] =
      'Token ' + this.configService.get('DADATA_AUTHORIZATION');
    this.httpService.axiosRef.defaults.headers['X-secret'] =
      this.configService.get('DADATA_X_SECRET');
    this.httpService.axiosRef.defaults.headers['Content-Type'] =
      'application/json';

    const connectUrl = getApiUrl(this.url, 'v1/clean/address');
    /*console.log('---------------');
    console.log('this.httpService.axiosRef.defaults.headers');
    console.log(this.httpService.axiosRef.defaults.headers);
    console.log('---------------');
    console.log('addresses');
    console.log(addresses);
  
    console.log(connectUrl);
    //const data = (await this.httpService.axiosRef.post(connectUrl, addresses))
    //  .data;*/
    try {
      const data: IDadata_v1_clean_address_response[] = (
        await this.httpService.axiosRef.post(connectUrl, addresses)
      ).data;
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
