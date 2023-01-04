import packageInfo from "../../package.json";
const { version } = packageInfo;

export default function Logo() {
    return (
        <div className="logo">
            <div className="gradient">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:bx="https://boxy-svg.com"
                    width="21"
                    height="26"
                    viewBox="184.953 132.455 21 26"
                >
                    <path fill="#f1dc50" d="M184.953 134.513h21.524v21.524h-21.524z" />
                    <path
                        bx:shape="arrow 185.017 132.455 19.655 26.205 0.438 19.655 0 1@ac887735"
                        fill="#333"
                        d="M185.017 145.339v-12.884l19.655 13.103-19.655 13.102v-13.321Z"
                    />
                </svg>
            </div>
            <h1 className="title">PlayJS</h1>
            <span className="version">v.{version}</span>
        </div>
    );
}
