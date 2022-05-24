import ModalConstants from "../constants/modal.constants";

const initialState = {
	connectWalletModalVisible: false,
	remindModalVisible: false,
	seeMoreModalVisible: false,
	mintModalVisible: false,
	licensesModalVisible: false,
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
		case ModalConstants.SHOW_MINT_MODAL:
			return {
				...state,
				mintModalVisible: true,
			};
		case ModalConstants.HIDE_MINT_MODAL:
			return {
				...state,
				mintModalVisible: false,
			};
		case ModalConstants.SHOW_LICENSES_MODAL:
			return {
				...state,
				licensesModalVisible: true,
			};
		case ModalConstants.HIDE_LICENSES_MODAL:
			return {
				...state,
				licensesModalVisible: false,
			};
		default: {
			return state;
		}
	}
}
