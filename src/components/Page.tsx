import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Page = ({ title, component }) => {
    const PageComponent = component;
    const history = useHistory();
    useEffect(() => {
        document.title = `${title} | cstef.dev`;
        //@ts-ignore
        // eslint-disable-next-line
    }, [history.location.pathname]);
    return <PageComponent />;
};

export default Page;
