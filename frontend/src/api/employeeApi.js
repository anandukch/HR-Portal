import apiWithTag from "./baseApi";

export const employeeApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeList: builder.query({
            query: () => "/employees",
        }),
    }),
});
