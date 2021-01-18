import { useContext } from "react";
import useAsyncEffect from "use-async-effect";
import { EthersContext } from "../context/EthersContext";

const useTokenUpdator = () => {
    const { address, customTokens, setLoadingTokens, updateTokens } = useContext(EthersContext);
    useAsyncEffect(async () => {
        if (address && customTokens) {
            setLoadingTokens(true);
            try {
                await updateTokens();
            } finally {
                setLoadingTokens(false);
            }
        }
    }, [address, customTokens]);
};

export default useTokenUpdator;
