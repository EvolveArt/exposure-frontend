import ModalConstants from "../constants/modal.constants";

const ModalActions = {
	showConnectWalletModal,
	hideConnectWalletModal,
	showRemindModal,
	hideRemindModal,
	showSeeMoreModal,
	hideSeeMoreModal,
	showMintModal,
	hideMintModal,
};

function showMintModal() {
	return (dispatch: any) => {
		dispatch(_showMintModal());
	};
}

const _showMintModal = () => {
	return {
		type: ModalConstants.SHOW_MINT_MODAL,
	};
};

function hideMintModal() {
	return (dispatch: any) => {
		dispatch(_hideMintModal());
	};
}

const _hideMintModal = () => {
	return {
		type: ModalConstants.HIDE_MINT_MODAL,
	};
};

// See More Modal

function showSeeMoreModal() {
	return (dispatch: any) => {
		dispatch(_showSeeMoreModal());
	};
}

const _showSeeMoreModal = () => {
	return {
		type: ModalConstants.SHOW_SEE_MORE_MODAL,
	};
};

function hideSeeMoreModal() {
	return (dispatch: any) => {
		dispatch(_hideSeeMoreModal());
	};
}

const _hideSeeMoreModal = () => {
	return {
		type: ModalConstants.HIDE_SEE_MORE_MODAL,
	};
};
// Remind Modal
function showRemindModal() {
	return (dispatch: any) => {
		dispatch(_showRemindModal());
	};
}

const _showRemindModal = () => {
	return {
		type: ModalConstants.SHOW_REMIND_MODAL,
	};
};

function hideRemindModal() {
	return (dispatch: any) => {
		dispatch(_hideRemindModal());
	};
}

const _hideRemindModal = () => {
	return {
		type: ModalConstants.HIDE_REMIND_MODAL,
	};
};
function showConnectWalletModal() {
	return (dispatch: any) => {
		dispatch(_showConnectWalletModal());
	};
}

const _showConnectWalletModal = () => {
	return {
		type: ModalConstants.SHOW_CONNECT_WALLET_MODAL,
	};
};

function hideConnectWalletModal() {
	return (dispatch: any) => {
		dispatch(_hideConnectWalletModal());
	};
}

const _hideConnectWalletModal = () => {
	return {
		type: ModalConstants.HIDE_CONNECT_WALLET_MODAL,
	};
};

export default ModalActions;
