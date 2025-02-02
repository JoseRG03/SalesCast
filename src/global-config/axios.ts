import axios from "axios";

import {HOST_ROUTE} from "./global-variables.ts";

const customAxios = axios.create({baseURL: HOST_ROUTE});

export default customAxios;