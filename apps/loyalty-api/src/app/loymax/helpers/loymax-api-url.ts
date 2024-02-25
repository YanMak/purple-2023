export const getApiUrl = (const_api_url: string, cash_register_id: string) => {
  return const_api_url + cash_register_id + '/';
};
