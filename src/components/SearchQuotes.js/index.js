import React from "react";
import { Input, List, Card, Icon, Modal } from "antd";
import Title from "antd/lib/skeleton/Title";
import Paragraph from "antd/lib/skeleton/Paragraph";

const SearchQuotes = ({
  handleQueryChange,
  onSearch,
  loadMore,
  quotesListLoading,
  searchedQuotesList,
  modalContent,
  handleOk,
  handleCancel,
  modalOpen,
  handleExpandText
}) => (
  <div style={{ background: "#ECECEC", padding: "30px" }}>
    <Input.Search
      placeholder="Search Quotes"
      onChange={handleQueryChange}
      onSearch={value => onSearch}
      enterButton
      style={{ width: "80%" }}
    />
    {searchedQuotesList.length && (
      <List
        style={{ margin: "1rem", minHeight: "400px" }}
        grid={{ gutter: 16, column: 1 }}
        loadMore={loadMore}
        size="large"
        header={<Title level={2}>Searched Quotes</Title>}
        bordered
        loading={quotesListLoading}
        dataSource={searchedQuotesList}
        renderItem={quote => (
          <List.Item>
            <Card
              title={quote.author}
              actions={[
                <Icon type="eye" onClick={() => handleExpandText(quote.id)} />
              ]}
              className="gutter-box"
            >
              <Paragraph>{quote.body}</Paragraph>
              <Modal
                title={modalContent.title}
                onOk={handleOk}
                onCancel={handleCancel}
                visible={modalOpen}
                centered
              >
                {modalContent.body}
              </Modal>
            </Card>
          </List.Item>
        )}
      />
    )}
  </div>
);

export default SearchQuotes;
