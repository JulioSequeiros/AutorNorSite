import React from "react";

const Header = () => {
    return (
        <header className="pb-3 mb-4 border-bottom">
            <a href="/src/components/public" className="d-flex align-items-center text-dark text-decoration-none">
                <img src="/logo-autonor.svg" alt="ESTG" className="mw-100" width="200" />
            </a>
        </header>
    );
};

export default Header;