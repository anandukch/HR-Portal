/* eslint-disable no-case-declarations */

const actionTypes = {
    ADD_EMPLOYEE: "ADD_EMPLOYEE",
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
    FILTER_EMPLOYEE: "FILTER_EMPLOYEE",
    ALL_EMPLOYEE: "ALL_EMPLOYEE",
    GET_EMPLPOYEE: "GET_EMPLOYEE",
    EDIT_EMPLOYEE: "EDIT_EMPLOYEE",
};

const reducer = (state, action) => {
    const employees = state.employees ? [...state.employees] : [];
    switch (action.type) {
        case actionTypes.ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, action.payload],
            };
        case actionTypes.DELETE_EMPLOYEE:
            return {
                ...state,
                employees: employees.filter((employee) => employee.id !== action.payload),
            };
        case actionTypes.FILTER_EMPLOYEE:
            return {
                ...state,
                employees: employees.filter((employee) => employee.status === action.payload),
            };
        case actionTypes.ALL_EMPLOYEE:
            return state;

        // case actionTypes.GET_EMPLPOYEE:
        //     return {
        //         ...state,
        //         employees: employees.find((employee) => employee.id === action.payload),
        //     };

        case actionTypes.EDIT_EMPLOYEE:
            return {
                ...state,
                employees: employees.map((employee) => (employee.id === action.payload.id ? action.payload : employee)),
            };
        default:
            return state;
    }
};

export { reducer as default, actionTypes };
