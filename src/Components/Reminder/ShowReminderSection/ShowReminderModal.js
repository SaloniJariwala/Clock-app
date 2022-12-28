import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Divider, Empty, Modal } from "antd";
import React from "react";
import { Button } from "react-bootstrap";

const ShowReminderModal = ({
  showReminder,
  closeReminderModal,
  reminderData,
  handleDeleteReminder,
  title,
  handleEdit,
}) => {

  return (
    <>
      <Modal
        title={`${title} Reminders`}
        open={showReminder}
        onCancel={closeReminderModal}
      >
        <Divider />
        <ul>
          {reminderData?.length > 0 ? (
            reminderData?.map((item) => (
              <li
                key={item.reminderId}
                style={{ marginBottom: "1em", marginRight: 50 }}
              >
                <h5 style={{ marginBottom: "unset" }}>{item.title}</h5>
                <span>{item.note}</span>
                <div style={{ display: "flex", marginTop: "0.5em" }}>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleEdit(item.reminderId)}
                    style={{
                      marginRight: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteReminder(item.reminderId)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ul>
        <Divider />
      </Modal>
    </>
  );
};

export default ShowReminderModal;
