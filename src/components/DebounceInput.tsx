import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

interface DebounceInputProps {
    onTimeout?: (text: string) => void;
    delay?: number;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DebounceInput: React.FC<DebounceInputProps> = (props) => {
    const [text, setText] = useState("");
    const { delay = 350, onTimeout, inputProps } = props;

    useDebounce(() => {
        onTimeout?.(text);
    }, [text], delay);

    return (
        <input data-testid="debounce-input" type="text" placeholder="Search..." onChange={(e) => setText(e.target.value.trim())} {...inputProps} />
    );
}

export default DebounceInput;