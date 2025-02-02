export type LoginFormRequest = {
    username: string;
    password: string;
};

export type LoginFormResponse = {
    jwt: string;
};
