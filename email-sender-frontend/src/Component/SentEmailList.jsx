import { useCallback, useMemo } from "react";

import { Button, Result, Table } from "antd";
import PropTypes from "prop-types";

const SentEmailList = ({
  emailsSent,
  foundationsLength,
  nonprofitsLength,
  setOpenForm,
  setOpenModel,
}) => {
  const columns = [
    {
      title: "DateTime",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        console.log(new Date(date).toLocaleDateString());
        return (
          <div>
            <p>{new Date(date).toLocaleDateString()}</p>
            <span>{new Date(date).toLocaleTimeString()}</span>
          </div>
        );
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];
  const resultTitle = useMemo(() => {
    if (foundationsLength === 0 && nonprofitsLength === 0) {
      return "Welcome! Let's begin your donation email journey by creating nonprofits and foundations.";
    }
    if (nonprofitsLength === 0) {
      return "You're just one step away from starting your donation email journey. Create nonprofits now!";
    }
    if (foundationsLength === 0) {
      return "You're just one step away from starting your donation email journey. Create foundations now!";
    }
    return "Welcome! No emails have been sent yet. Click 'Start' to begin sending.";
  }, [foundationsLength, nonprofitsLength]);

  const buttonTitle = useMemo(() => {
    if (foundationsLength === 0 || nonprofitsLength === 0) {
      return "+ Create";
    }
    return "Start";
  }, [foundationsLength, nonprofitsLength]);

  const handleResultButtonClick = useCallback(() => {
    if (foundationsLength === 0 || nonprofitsLength === 0) {
      setOpenForm(true);
    } else {
      setOpenModel(true);
    }
  }, [foundationsLength, nonprofitsLength]);

  if (emailsSent?.length === 0) {
    return (
      <Result
        className="resultWrapper"
        // icon={<SmileOutlined />}
        title={resultTitle}
        extra={
          <Button
            className="primaryButton"
            type="primary"
            onClick={handleResultButtonClick}
          >
            {buttonTitle}
          </Button>
        }
      />
    );
  }

  return (
    <div className="tableWrapper">
      <Table dataSource={emailsSent} columns={columns} pagination={false} />;
    </div>
  );
};

SentEmailList.propTypes = {
  emailsSent: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  foundationsLength: PropTypes.number.isRequired,
  nonprofitsLength: PropTypes.number.isRequired,
  setOpenForm: PropTypes.func.isRequired,
  setOpenModel: PropTypes.func.isRequired,
};

export default SentEmailList;
