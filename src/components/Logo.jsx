import packageInfo from "../../package.json";
const { version } = packageInfo;

export default function Logo() {
    return (
        <div className="logo">
            <div className="square" />
            <h1 className="title">PlayJS</h1>
            <span className="version">v.{version} <tag>BETA</tag></span>
        </div>
    );
}
