import { useEffect } from "react";
import { useHistory } from "react-router";
const Page = ({ title, component }) => {
    const PageComponent = component;
    const history = useHistory();
    useEffect(() => {
        document.title = `${title} | cstef.dev`;
    }, [history.location.pathname]);
    return <PageComponent />;
};

export default Page;
