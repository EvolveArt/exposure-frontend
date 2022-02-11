import axios from 'axios';

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === 'MAINNET';

export const useApi = () => {

  const apiUrl = isMainnet
    ? 'https://exposure-rest-api.herokuapp.com'
    : 'https://exposure-rest-api-testnet.herokuapp.com';

  const getAuthToken = async (address: string | null | undefined) => {
    let result = await axios({
      method: 'post',
      url: `${apiUrl}/auth/getToken`,
      data: JSON.stringify({ address: address }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (result.data.status === 'success') {
      let token = result.data.token;
      return token;
    }
    return null;
  };

  const getAccountDetails = async (authToken: string | null | undefined) => {
    const res = await axios({
      method: 'get',
      url: `${apiUrl}/account/getaccountinfo`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return res.data;
  };

  return { getAuthToken, getAccountDetails }
}