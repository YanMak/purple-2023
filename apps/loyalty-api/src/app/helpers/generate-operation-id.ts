import { v4 as uuidv4 } from 'uuid';

export const generateOperationId = async (): Promise<string> => {
  let uid = await uuidv4();
  const searchRegExp = /-/g;
  const replaceWith = '';

  //console.log(`uid befo changin - on empty symbol`);
  //console.log(uid);
  uid = uid.replace(searchRegExp, replaceWith);
  //console.log(`uid after changin - on empty symbol`);
  //console.log(uid);
  return uid;
};
