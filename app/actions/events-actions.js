import { ADD_SOFT_BEER, ADD_BEER, ADD_SHOOT, ADD_COKTAIL, ORDER_BY_TOTAL } from '../constants/events-actions-constants';

let EventsActions = {
	addSoftBeer(id) {
		return dispatch=> {
			dispatch({
				type: ADD_SOFT_BEER,
				id
			});
		}
	},
	addBeer(id) {
		return dispatch=> {
			dispatch({
				type: ADD_BEER,
				id
			});
		}
	},
	addShoot(id) {
		return dispatch=> {
			dispatch({
				type: ADD_SHOOT,
				id
			});
		}
	},
	addCoktail(id) {
		return dispatch=> {
			dispatch({
				type: ADD_COKTAIL,
				id
			});
		}
	},
	orderByTotal() {
		return dispatch=> {
			dispatch({
				type: ORDER_BY_TOTAL
			});
		}
	}
};

export default {
	...EventsActions
};