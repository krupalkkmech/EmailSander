import { useEffect, useState } from "react";

import { Button, Drawer, Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const CreateForm = ({
  loading,
  open,
  setOpen,
  setNonprofits,
  setFoundations,
}) => {
  const [form] = Form.useForm();
  const [formType, setFormType] = useState("foundations");

  const createNonprofit = async (newNonprofit) => {
    await fetch("http://localhost:6969/nonprofits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNonprofit),
    });
    setNonprofits((nonprofits) => [...nonprofits, newNonprofit]);
  };

  const createFoundation = async (newFoundation) => {
    await fetch("http://localhost:6969/foundations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFoundation),
    });
    setFoundations((foundations) => [...foundations, newFoundation]);
  };

  const onFinish = (values) => {
    const reqBody = { email: values?.email, name: values?.name };
    let createFunc = createFoundation;
    if (formType === "nonprofits") {
      reqBody.address = values?.address;
      createFunc = createNonprofit;
    }
    createFunc(reqBody);
    setOpen(false);
    setFormType("foundations");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form]);

  return (
    <Drawer
      closable
      destroyOnClose
      title={<p>Create Foundations/Nonprofits</p>}
      placement="right"
      width={520}
      open={open}
      loading={loading}
      onClose={() => {
        setOpen(false);
        setFormType("foundations");
        form.resetFields();
      }}
      className="drawerWrapper"
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="FormType" name="formType">
          <Select
            defaultValue="foundations"
            value={formType}
            onChange={(value) => setFormType(value)}
            options={[
              {
                value: "foundations",
                label: "Create Foundations",
              },
              {
                value: "nonprofits",
                label: "Create Nonprofits",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        {formType === "nonprofits" ? (
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : null}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="submitButton primaryButton"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

CreateForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setNonprofits: PropTypes.func.isRequired,
  setFoundations: PropTypes.func.isRequired,
};

export default CreateForm;
