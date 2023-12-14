import React, { useCallback, useMemo, useState } from "react";
import {
  Page,
  Layout,
  Text,
  IndexTable,
  useIndexResourceState,
  Button,
  Card,
  Modal,
  Form,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import TodoStatusLabel from "./components/TodoStatusLabel";
import fetchTodoApi from "../../api/todoApi";
import useFetchTodoes from "../../hooks/useFetchTodoes";
import "./style.css";

const Home = () => {
  const { todoes, loading, fetchAllTodos } = useFetchTodoes();
  const [addModal, setAddModal] = useState(false);
  const [todoModalData, setTodoModalData] = useState({});
  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(todoes);
  const updateTodo = useCallback(async (id) => {
    try {
      await fetchTodoApi(`todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isCompleted: true }),
      });
      await fetchAllTodos();
    } catch (error) {}
    clearSelection();
  }, []);
  const deteleTodo = useCallback(async (id) => {
    try {
      await fetchTodoApi(`todo/${id}`, {
        method: "DELETE",
      });
      await fetchAllTodos();
    } catch (error) {}
    clearSelection();
  }, []);
  const handleAdd = useCallback(async () => {
    if (todoModalData.name) {
      try {
        await fetchTodoApi(`todo`, {
          method: "POST",
          body: JSON.stringify({ name: todoModalData.name }),
        });
        await fetchAllTodos();
      } catch (error) {}
    }
    clearSelection();
    setTodoModalData({});
    setAddModal(false);
  }, [todoModalData]);
  const promotedBulkActions = useMemo(
    () => [
      {
        content: "Complete all",
        onAction: async () => {
          try {
            await fetchTodoApi(`todoes`, {
              method: "PUT",
              body: JSON.stringify({ idList: selectedResources }),
            });
            await fetchAllTodos();
          } catch (error) {}
          clearSelection();
        },
      },
      {
        content: "Delete all",
        onAction: async () => {
          try {
            await fetchTodoApi(`todoes/delete`, {
              method: "POST",
              body: JSON.stringify({ idList: selectedResources }),
            });
            await fetchAllTodos();
          } catch (error) {}
          clearSelection();
        },
      },
    ],
    [selectedResources]
  );
  return (
    <Page
      title="Todoes"
      primaryAction={{
        content: "Create todo",
        onAction: () => {
          setAddModal(true);
        },
      }}
    >
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
              />
            </FormLayout>
          </Form>
        </Modal.Section>
      </Modal>
      <Layout>
        <Layout.Section variant="fullWidth">
          <Card padding={0}>
            <IndexTable
              headings={[{ title: "Id" }, { title: "Name" }, { title: "" }]}
              itemCount={todoes.length}
              onSelectionChange={handleSelectionChange}
              selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
              promotedBulkActions={promotedBulkActions}
              loading={loading}
              lastColumnSticky
            >
              {todoes.map(({ id, name, isCompleted }, index) => (
                <IndexTable.Row
                  id={id}
                  key={id}
                  selected={selectedResources.includes(id)}
                  position={index}
                  onClick={() => {}}
                >
                  <IndexTable.Cell>
                    <Text>{id}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Text>{name}</Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell className="action-group">
                    <TodoStatusLabel isCompleted={isCompleted} />
                    <Button
                      onClick={() => {
                        updateTodo(id);
                      }}
                      disabled={isCompleted}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="primary"
                      tone="critical"
                      onClick={() => {
                        deteleTodo(id);
                      }}
                    >
                      Delete
                    </Button>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
