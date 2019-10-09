export const SET_PRISTINE = '@@data-driven-forms/set-pristine';
export const RESET = '@@data-driven-forms/reset';

export const setPristine = pristine => ({
  type: SET_PRISTINE,
  payload: {
    pristine,
  },
});

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PRISTINE:
      return {
        ...state,
        pristine: action.payload.pristine,
        in_a_form: true,
      };
    case RESET:
      return {
        ...state,
        pristine: undefined,
        in_a_form: false,
      };
    default:
      return state;
  }
};
