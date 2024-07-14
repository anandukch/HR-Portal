import "../styles/statusItem.css"

// eslint-disable-next-line react/prop-types
export const StatusItem = ({ text, bgColor }) => {
    return (
        <div
            className={`status_item`}
            style={{
                backgroundColor: bgColor,
            }}
        >
            {text}
        </div>
    );
};
