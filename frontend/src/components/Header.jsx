import KvLogo from "../assets/kv-logo.png";

export const Header = () => {
    return (
        <header className="home_header">
            <img className="logo" src={KvLogo} alt="key value" />
        </header>
    );
};
