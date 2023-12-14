import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import "./style.css";

const Home = () => {
  const [todoes, setTodoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [todoModalData, setTodoModalData] = useState({});
  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(todoes);
  const fetchAllTodos = useCallback(async () => {
    try {
      const res = await fetchTodoApi("todoes");
      if (res.ok) {
        const data = (await res.json()).data;
        setTodoes(data);
      }
    } catch (error) {
    } finally {
      clearSelection();
      setLoading(false);
    }
  }, []);
  const updateTodo = useCallback(async (id) => {
    setLoading(true);
    try {
      const updateRes = await fetchTodoApi(`todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isCompleted: true }),
      });
      if (updateRes.ok) {
        await fetchAllTodos();
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const deteleTodo = useCallback(async (id) => {
    setLoading(true);
    try {
      const deteleRes = await fetchTodoApi(`todo/${id}`, {
        method: "DELETE",
      });
      if (deteleRes.ok) {
        await fetchAllTodos();
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const handleAdd = useCallback(async () => {
    setLoading(true);
    if (todoModalData.name) {
      try {
        const res = await fetchTodoApi(`todo`, {
          method: "POST",
          body: JSON.stringify({ name: todoModalData.name }),
        });
        if (res.ok) {
          await fetchAllTodos();
        }
      } catch (error) {}
    }
    setTodoModalData({});
    setAddModal(false);
    setLoading(false);
  }, [todoModalData]);
  const promotedBulkActions = useMemo(
    () => [
      {
        content: "Complete all",
        onAction: async () => {
          setLoading(true);
          try {
            const deteleRes = await fetchTodoApi(`todoes`, {
              method: "PUT",
              body: JSON.stringify({ idList: selectedResources }),
            });
            if (deteleRes.ok) {
              await fetchAllTodos();
            }
          } catch (error) {
            setLoading(false);
          }
        },
      },
      {
        content: "Delete all",
        onAction: async () => {
          setLoading(true);
          try {
            const deteleRes = await fetchTodoApi(`todoes/delete`, {
              method: "POST",
              body: JSON.stringify({ idList: selectedResources }),
            });
            if (deteleRes.ok) {
              await fetchAllTodos();
            }
          } catch (error) {
            setLoading(false);
          }
        },
      },
    ],
    [selectedResources]
  );

  useEffect(() => {
    fetchAllTodos();
  }, []);

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
