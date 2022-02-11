import ModalConstants from '../constants/modal.constants';

const initialState = {
  connectWalletModalVisible: false,
};

export function Modal(state = initialState, action: any) {
  switch (action.type) {
    case ModalConstants.SHOW_CONNECT_WALLET_MODAL:
      return {
        ...state,
        connectWalletModalVisible: true,
      };
    case ModalConstants.HIDE_CONNECT_WALLET_MODAL:
      return {
        ...state,
        connectWalletModalVisible: false,
      };
    default: {
      return state;
    }
  }
}
