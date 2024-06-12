import { useMemo, useState } from "react";

import { Button, Divider, Modal, Select, Typography } from "antd";
import PropTypes from "prop-types";

const SentEmailModel = ({
  open,
  foundations,
  nonprofits,
  setOpenModel,
  fetchEmailsSent,
}) => {
  const [selectedFoundation, setSelectedFoundation] = useState("");
  const [selectedNonprofites, setSelectedNonprofites] = useState([]);

  const sendEmail = async (emailData) => {
    await fetch("http://localhost:6969/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });
    fetchEmailsSent();
  };

  const handleCancel = () => {
    setOpenModel(false);
    setSelectedFoundation("");
    setSelectedNonprofites([]);
  };

  const handleSendEmail = () => {
    const reqBody = {
      foundationEmail: selectedFoundation,
      nonprofitEmails: selectedNonprofites,
    };
    sendEmail(reqBody);
    handleCancel();
  };

  const optionListHelper = (list) => {
    return list.map((each) => ({
      label: each?.name,
      value: each?.email,
    }));
  };

  const foundationOptionList = useMemo(() => {
    return optionListHelper(foundations);
  }, [foundations]);

  const nonprofitOptionList = useMemo(() => {
    return optionListHelper(nonprofits);
  }, [nonprofits]);

  return (
    <Modal
      title="Send mail"
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
    >
      <Divider />
      <div className="modelBodyWrapper">
        <Typography.Text>Select Foundation</Typography.Text>
        <Select
          defaultValue={selectedFoundation}
          placeholder="select Foundation"
          value={selectedFoundation}
          onChange={(value) => setSelectedFoundation(value)}
          options={foundationOptionList}
          className="foundationSelect"
        />
        <br />
        <br />
        <Typography.Text>Select Nonprofits</Typography.Text>
        <Select
          mode="multiple"
          defaultValue={selectedNonprofites}
          placeholder="select Nonprofits"
          value={selectedNonprofites}
          onChange={(value) => setSelectedNonprofites(value)}
          options={nonprofitOptionList}
          className="foundationSelect"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="sendButton primaryButton"
          disabled={!selectedFoundation?.length || !selectedNonprofites?.length}
          onClick={handleSendEmail}
        >
          Send
        </Button>
      </div>
    </Modal>
  );
};

SentEmailModel.propTypes = {
  open: PropTypes.bool.isRequired,
  foundations: PropTypes.arrayOf(PropTypes.shape()),
  nonprofits: PropTypes.arrayOf(PropTypes.shape()),
  setOpenModel: PropTypes.func.isRequired,
  fetchEmailsSent: PropTypes.func.isRequired,
};

export default SentEmailModel;
