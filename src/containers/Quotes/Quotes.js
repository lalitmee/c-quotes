import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Layout,
  Pagination,
  Typography,
  List,
  Icon,
  Card,
  Button,
  Modal,
} from 'antd';
import 'antd/dist/antd.css';
import 'styles.css';
import NavigationBar from 'components/Navigation';
import QuoteOfTheDay from 'components/QuoteOfTheDay';
import SearchQuotes from 'components/SearchQuotes.js';

const { Paragraph, Title } = Typography;

const { Header, Content } = Layout;

const apiURL = 'https://favqs.com/api/';

function Quotes() {
  const [currentMenu, setCurrentMenu] = useState('qotd');
  const [quoteOFDay, setQuoteOfDay] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [totalQuotes, setTotalQuotes] = useState(25);
  const [lastPageNumber, setLastPageNumber] = useState(false);
  const [showPagination, setShowPagination] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomNumber, setRandomNumber] = useState(
    Math.round(Math.random() * 1000),
  );
  const [quotesList, setQuotesList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [searchedQuotesList, setSearchedQuotesList] = useState([]);
  const [quotesListLoading, setQuotesListLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // quote of the day
  useEffect(() => {
    axios
      .get(apiURL + 'qotd')
      .then(res => JSON.stringify(res))
      .then(data => {
        const response = JSON.parse(data);
        const { data: quoteData } = response;
        const { quote } = quoteData;
        setQuoteOfDay(quote.body);
      });
  }, [randomNumber]);

  // random quotes list
  useEffect(() => {
    setQuotesListLoading(true);
    axios
      .get(apiURL + `quotes?page=${currentPage}`, {
        headers: {
          Authorization: 'Token c5cd3d913c68cc606fd42434d0e962b8',
        },
      })
      .then(res => JSON.stringify(res))
      .then(data => {
        const response = JSON.parse(data);
        const { data: quotesData } = response;
        const { quotes, lastPage, page } = quotesData;
        if (!lastPage && page > lastPageNumber) {
          setTotalQuotes(totalQuotes + 25);
        }
        setLastPageNumber(page);
        setQuotesList(quotes);
        setQuotesListLoading(false);
      });
  }, [currentPage, currentMenu]);

  useEffect(() => {
    setQuotesListLoading(true);
    axios
      .get(apiURL + `quotes?filter=${searchQuery}`, {
        headers: {
          Authorization: 'Token c5cd3d913c68cc606fd42434d0e962b8',
        },
      })
      .then(res => JSON.stringify(res))
      .then(data => {
        const response = JSON.parse(data);
        const { data: quotesData } = response;
        const { quotes, lastPage, page } = quotesData;
        if (!lastPage && page > lastPageNumber) {
          setTotalQuotes(totalQuotes + 25);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setLastPageNumber(page);
        if (quotes.length > 1) {
          setSearchedQuotesList(quotes);
          if (quotes.length === 25) {
            setShowPagination(true);
          }
        } else {
          setSearchedQuotesList();
          setShowPagination(false);
        }
        setQuotesListLoading(false);
      });
  }, [searchQuery, currentMenu]);

  const handleInfiniteOnLoad = () => {
    if (searchedQuotesList.length > 20) {
      setCurrentPage(state => state + 1);
    }
  };

  const handlePageChange = event => {
    setCurrentPage(event);
  };

  const handleQueryChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchQuery = query => {
    setSearchQuery(query);
  };

  const handleExpandText = quoteId => {
    setModalOpen(true);
    const currentQuote = quotesList.find(quote => quote.id === quoteId);
    const quoteData = {
      title: currentQuote.author,
      body: currentQuote.body,
    };
    setModalContent(quoteData);
  };

  const handleMenuClick = event => {
    setCurrentMenu(event.key);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const loadMore = !quotesListLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={handleInfiniteOnLoad}>loading more</Button>
    </div>
  ) : null;

  return (
    <Layout className="App">
      <Header style={{ backgroundColor: 'white' }}>
        <NavigationBar
          handleMenuClick={handleMenuClick}
          currentMenu={currentMenu}
        />
      </Header>
      <Content>
        {currentMenu === 'qotd' && <QuoteOfTheDay quoteOFDay={quoteOFDay} />}

        {currentMenu === 'search' && (
          <SearchQuotes
            onSearch={handleSearchQuery}
            handleQueryChange={handleQueryChange}
            loadMore={loadMore}
            handleCancel={handleCancel}
            handleOk={handleOk}
            modalContent={modalContent}
            modalOpen={modalContent}
            handleExpandText={handleExpandText}
            searchedQuotesList={searchedQuotesList}
            quotesListLoading={quotesListLoading}
          />
        )}

        {currentMenu === 'quotes-list' && (
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <List
              grid={{ gutter: 16, column: 1 }}
              size="large"
              header={<Title level={2}>Random Quotes</Title>}
              footer={
                <Pagination
                  onChange={handlePageChange}
                  defaultPageSize={10}
                  pageSize={10}
                  showLessItems
                  current={currentPage}
                  defaultCurrent={1}
                  total={totalQuotes}
                  style={{
                    background: 'white',
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    padding: '1rem',
                  }}
                />
              }
              bordered
              loading={quotesListLoading}
              dataSource={quotesList}
              renderItem={quote => (
                <List.Item>
                  <Card
                    title={quote.author}
                    actions={[
                      <Icon
                        type="eye"
                        onClick={() => handleExpandText(quote.id)}
                      />,
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
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default Quotes;
