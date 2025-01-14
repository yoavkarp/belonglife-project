import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface DebounceInputProps {
    onTimeout?: (text: string) => void;
    delay?: number;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DebounceInput: React.FC<DebounceInputProps> = (props) => {
    const [query, setQuery] = useState("");

    const { delay = 350, onTimeout, inputProps } = props;

    useDebounce(() => {
        onTimeout?.(query);
    }, query, delay);

    return (
        <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value.trim())} {...inputProps} />
    );
}

export default DebounceInput;