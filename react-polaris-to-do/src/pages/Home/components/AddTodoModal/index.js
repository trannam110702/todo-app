import React, { useCallback, useEffect, useState } from "react";
import { Modal, Form, FormLayout, TextField } from "@shopify/polaris";
import fetchTodoApi from "../../../../api/todoApi";

const AddTodoModal = ({ addModal, setAddModal, fetchAllTodos }) => {
  const [todoModalData, setTodoModalData] = useState({});
  const [validate, setValidate] = useState({});
  const handleAdd = useCallback(async () => {
    if (!todoModalData?.name?.trim() || !todoModalData.name)
      return setValidate({ name: "Không được trống" });
    if (todoModalData.name) {
      try {
        const res = await fetchTodoApi(`todo`, {
          method: "POST",
          body: JSON.stringify({ name: todoModalData.name.trim() }),
        });
        const resData = await res.json();
        if (!resData?.success) {
          console.log(resData?.error);
        }
        await fetchAllTodos();
      } catch (error) {}
    }
    setAddModal(false);
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
        <Form>
          <FormLayout>
            <TextField
              value={todoModalData.name}
              onChange={(newValue) => setTodoModalData({ name: newValue })}
              label="To do name"
              autoComplete="off"
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
