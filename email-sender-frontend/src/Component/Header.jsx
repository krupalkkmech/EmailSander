import "../App.scss";

import { Button } from "antd";
import PropTypes from "prop-types";

const Header = ({ setOpenForm, setOpenModel, emailsSent }) => {
  return (
    <div className="headerWrapper">
      <h3 className="headerTitle">Header</h3>

      <div>
        {emailsSent?.length ? (
          <Button className="headerButton" onClick={() => setOpenModel(true)}>
            Send mail
          </Button>
        ) : null}
        <Button className="headerButton" onClick={() => setOpenForm(true)}>
          + Create
        </Button>
      </div>
    </div>
  );
};

Header.propTypes = {
  setOpenForm: PropTypes.func.isRequired,
  setOpenModel: PropTypes.func.isRequired,
  emailsSent: PropTypes.arrayOf(PropTypes.shape()),
};

export default Header;
