// eslint-disable-next-line react/prop-types
export const Button = ({ text, onClickHandler, className,styles }) => {
    return (
        <button className={className} onClick={onClickHandler} style={styles}>
            {text}
        </button>
    );
};
