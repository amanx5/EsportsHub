
import { createContext, useContext } from "react";

const ApplicationConfig = createContext({});

export function getApplicationConfig (key) {
    const configs = useContext(ApplicationConfig);
    return key ? configs?.[key] : configs;
}

export default ApplicationConfig;