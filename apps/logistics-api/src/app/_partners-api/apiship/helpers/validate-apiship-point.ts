import { IApiship_listsPoints } from '../interfaces/points.interface';

export const isValidApishipPoint = (apishipPoint: IApiship_listsPoints) => {
  //if (apishipPoint.name === 'Казань - 10990') {
  //  console.log(apishipPoint);
  //}

  if (!apishipPoint.lng || !apishipPoint.lat) {
    return false;
  }
  return true;
};
