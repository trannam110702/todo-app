import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, FormLayout, TextField } from "@shopify/polaris";
import fetchApi from "../../../../api/todoApi";

const AddTodoModal = ({ addModal, setAddModal, fetchAllTodos }) => {
  const [todoModalData, setTodoModalData] = useState({});
  const [validate, setValidate] = useState({});
  const handleAdd = useCallback(async () => {
    if (!todoModalData?.name?.trim() || !todoModalData.name)
      return setValidate({ name: "Please fill this field" });
    if (todoModalData.name) {
      try {
        const res = await fetchApi(`todoes`, {
          method: "POST",
          body: JSON.stringify({ name: todoModalData.name.trim() }),
        });
        const resData = await res.json();
        if (!resData?.success) {
          console.log(resData?.error);
        }
        setAddModal(false);
        await fetchAllTodos();
      } catch (error) {}
    }
  }, [todoModalData]);
  useEffect(() => {
    setTodoModalData({});
    setValidate(false);
  }, [addModal]);
  return (
    <Modal
      open={addModal}
      onClose={() => {
        setAddModal(false);
      }}
      title="Create a new to do"
      primaryAction={{
        content: "Create",
        onAction: handleAdd,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => {
            setTodoModalData({});
            setAddModal(false);
          },
        },
      ]}
    >
      <Modal.Section>
        <Form
          onSubmit={() => {
            handleAdd();
          }}
        >
          <FormLayout>
            <TextField
              value={todoModalData.name}
              onChange={(newValue) => setTodoModalData({ name: newValue })}
              label="To do name"
              requiredIndicator
              error={todoModalData?.name?.trim() ? false : validate?.name}
            />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
};

export default AddTodoModal;
