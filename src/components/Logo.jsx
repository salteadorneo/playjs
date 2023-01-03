export default function Logo() {
    return (
        <div className="logo">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:bx="https://boxy-svg.com"
                width="21.524"
                height="26.205"
                viewBox="184.953 132.455 21.524 26.205"
            >
                <path
                    d="M184.953 134.513h21.524v21.524h-21.524z"
                    fill="#f1dc50"
                />
                <path
                    bx:shape="arrow 185.017 132.455 19.655 26.205 0.438 19.655 0 1@ac887735"
                    d="M185.017 145.339v-12.884l19.655 13.103-19.655 13.102v-13.321Z"
                    strokeOpacity={0.8}
                    fill="#333"
                />
            </svg>
            <h1>PlayJS</h1>
        </div>
    );
}
