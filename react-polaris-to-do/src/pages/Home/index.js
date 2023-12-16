import React, { useCallback, useMemo, useState } from "react";
import {
  Page,
  Layout,
  Text,
  IndexTable,
  useIndexResourceState,
  Button,
  Card,
} from "@shopify/polaris";
import Loading from "../../components/Loading";
import TodoStatusLabel from "./components/TodoStatusLabel";
import AddTodoModal from "./components/AddTodoModal";
import fetchTodoApi from "../../api/todoApi";
import useFetchTodoes from "../../hooks/useFetchTodoes";
import "./style.css";

const Home = () => {
  const { todoes, loading, setLoading, fetchAllTodos } = useFetchTodoes();
  const [addModal, setAddModal] = useState(false);

  const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } =
    useIndexResourceState(todoes);

  const updateTodo = useCallback(async (ids, isCompleted) => {
    try {
      setLoading(true);
      await fetchTodoApi(`todoes`, {
        method: "PUT",
        body: JSON.stringify({
          ids: typeof ids === "number" ? [ids] : ids,
          isCompleted,
        }),
      });
      await fetchAllTodos();
    } catch (error) {}
    clearSelection();
  }, []);
  const deteleTodo = useCallback(async (ids) => {
    try {
      setLoading(true);
      await fetchTodoApi(`todoes/delete`, {
        method: "POST",
        body: JSON.stringify({ ids: typeof ids === "number" ? [ids] : ids }),
      });
      await fetchAllTodos();
    } catch (error) {}
    clearSelection();
  }, []);

  const promotedBulkActions = useMemo(
    () => [
      {
        content: "Complete all",
        onAction: () => {
          updateTodo(selectedResources, true);
        },
      },
      {
        content: "Delete all",
        onAction: () => {
          deteleTodo(selectedResources);
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
      <AddTodoModal addModal={addModal} setAddModal={setAddModal} fetchAllTodos={fetchAllTodos} />
      <Layout>
        <Layout.Section variant="fullWidth">
          <Card padding={0}>
            {loading ? (
              <Loading />
            ) : (
              <IndexTable
                headings={[
                  { title: "Id" },
                  { title: "Name" },
                  { title: "Status", alignment: "center" },
                  { title: "Action", alignment: "center" },
                ]}
                itemCount={todoes.length}
                onSelectionChange={handleSelectionChange}
                selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
                promotedBulkActions={promotedBulkActions}
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
                      <div className="wrap">
                        <Text>{name}</Text>
                      </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                      <div className="action-group">
                        <TodoStatusLabel isCompleted={isCompleted} />
                      </div>
                    </IndexTable.Cell>
                    <IndexTable.Cell className="width-1000">
                      <div className="action-group ">
                        {isCompleted ? (
                          <Button
                            onClick={() => {
                              updateTodo(id, false);
                            }}
                          >
                            Uncomplete
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              updateTodo(id, true);
                            }}
                          >
                            Complete
                          </Button>
                        )}

                        <Button
                          variant="primary"
                          tone="critical"
                          onClick={() => {
                            deteleTodo(id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </IndexTable.Cell>
                  </IndexTable.Row>
                ))}
              </IndexTable>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Home;
