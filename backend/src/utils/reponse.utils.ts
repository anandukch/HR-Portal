export const reponseHandler = (status: string, message: string, data?: any) => {
    return {
        status,
        message,
        data,
    };
};
