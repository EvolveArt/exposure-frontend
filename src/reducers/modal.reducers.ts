import ModalConstants from "../constants/modal.constants";

const initialState = {
	connectWalletModalVisible: false,
	remindModalVisible: false,
	seeMoreModalVisible: false,
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
		case ModalConstants.SHOW_REMIND_MODAL:
			return {
				...state,
				remindModalVisible: true,
			};
		case ModalConstants.HIDE_REMIND_MODAL:
			return {
				...state,
				remindModalVisible: false,
			};
		case ModalConstants.SHOW_SEE_MORE_MODAL:
			return {
				...state,
				seeMoreModalVisible: true,
			};
		case ModalConstants.HIDE_SEE_MORE_MODAL:
			return {
				...state,
				seeMoreModalVisible: false,
			};
		default: {
			return state;
		}
	}
}
