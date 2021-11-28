// FOOTER FRAME
import React from "react";
// STYLES
import "./index.css";
// ICONS
import eucen_icon from "../../Assets/img/footer/eucen.png";
import address_icon from "../../Assets/img/footer/address.png";
import phone_icon from "../../Assets/img/footer/phone.png";
import email_icon from "../../Assets/img/footer/email.png";
import erasmus_icon from "../../Assets/img/footer/erasmus.png";


function Footer(props) {

    return (
        <footer className="footer shadow">

            {/* UPPER FOOTER */}
            <div className="footer-upper shadow">
                <div className="footer-upper-block">
                    <h2>
                        {/* {# Translators: Start of Footer #} */}
                        {/* {% translate "Project Coordinated"%}<br>{% translate "by"%} */}
                        Project coordinated by
                    </h2>
                    <img className="eucen-img" src={eucen_icon} alt="Eucen Logo" />
                    <div className="footer-upper-contact">
                        <img className="address-img footer-details-images" src={address_icon}
                            alt="Home Address Icon" />
                        <div className="footer-upper-contact-text">
                            {/* {% translate "eucen Secretariat | Balmes 132 | 08008 Barcelona (ES)"%} */}
                            eucen Secretariat | Balmes 132 | 08008 Barcelona (ES)
                        </div>
                    </div>
                    <div className="footer-upper-contact">
                        <img className="phone-img footer-details-images" src={phone_icon}
                            alt="Phone Icon" />
                        <div className="footer-upper-contact-text">
                            {/* {% translate "+34 93 5421825"%} */}
                            +34 93 5421825
                        </div>
                    </div>
                    <div className="footer-upper-contact">
                        <img className="enail-img footer-details-images" src={email_icon}
                            alt="Mail Icon" />
                        <div className="footer-upper-contact-text">
                            {/* {% translate "unilab@eucen.eu"%} */}
                            unilab@eucen.eu
                        </div>
                    </div>
                </div>
                <div className="footer-upper-block">
                    <h2>
                        {/* {% translate "Project co-funded"%}<br>{% translate "by"%} */}
                        Project co-funded by
                    </h2>
                    <img className="erasmus-img" src={erasmus_icon} alt="Erasmus Funding" />
                </div>
                <div className="footer-upper-block">
                    <p className="footer-disclaimer">
                        {/* {{ long_texts.1 }} */}
                        LONG TEXT HERE
                    </p>
                </div>
                <div className="footer-upper-block">
                    <h2>
                        {/* {% translate "Partners' area"%} */}
                        Partners' area
                    </h2>
                    <button className="partners-login uni-button" type="button">
                        {/* {% translate "LOG IN"%} */}
                        LOG IN
                    </button>
                </div>
            </div>

            {/* LOWER FOOTER */}
            <div className="footer-lower shadow">
                <div className="footer-lower-text">
                    {/* {# Translators: End of footer #}
                        {% translate "© Copyright UniLab 2021"%} */}
                    © Copyright UniLab 2021
                </div>
                <div className="footer-lower-social">
                    <a id="soc-img-1" href="#" target="blank_" aria-label="Twitter"></a>
                    <a id="soc-img-2" href="#" target="blank_" aria-label="Facebook"></a>
                    <a id="soc-img-3" href="#" target="blank_" aria-label="LinkedIn"></a>
                    <a id="soc-img-4" href="#" target="blank_" aria-label="Instagram"></a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;