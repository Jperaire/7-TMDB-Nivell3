import styles from "./Button.module.css";

interface StyledButtonProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
    onClick,
    type = "button",
    disabled = false,
    children,
}) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default StyledButton;
