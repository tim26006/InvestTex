import React, { useState, useEffect } from 'react';
import { UploadOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Card, Button, Spin, Statistic } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import axios from 'axios';
const formatter = (value) => <CountUp end={value} separator="," />;
const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'red' }} spin />;
const { Content, Sider } = Layout;
const selectedItemInitial = '1';
const items = [
  {
    key: '1',
    icon: <UserOutlined style={{ color: 'black' }} />,
    label: 'Профиль',
  },
  {
    key: '2',
    icon: <UploadOutlined style={{ color: 'black' }} />,
    label: 'Отчеты',
  },
];

const PersonalArea = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem('access_token');
  const navigate = useNavigate();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState(selectedItemInitial);

  useEffect(() => {
    if (token) {
      fetch('http://147.45.158.141:8000/api/user_info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUserInfo(data))
      .catch(error => console.error('Error fetching user info:', error));
    }
  }, [token]);

  useEffect(() => {
    if (selectedItem === '2') {
      setLoading(true);
      axios.get('http://147.45.158.141:8000/api/get_reports', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
    }
  }, [selectedItem, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleMenuClick = (item) => {
    setSelectedItem(item.key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    navigate("/login");
  };

  const handleChat = () => {
    navigate("/");
  };

  const renderMessage = () => {
    switch (selectedItem) {
      case '1':
        return (
          <div>
            {userInfo ? (
              <div className='User_info'>
                <h1 className='Title_info'>Ваши данные</h1>
                <div className='text_user'>ФИО: {userInfo.fio}</div>
                <div className='text_user'>Email: {userInfo.email}</div>
                <div className='text_user'>Организация: {userInfo.organization}</div>
                <div className='text_user'>Веб сайт: <a href={userInfo.website}>Перейти</a></div>
                <div className='text_user'>Страна: {userInfo.country}</div>
                <div className='text_user'>Город: {userInfo.city}</div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin indicator={antIcon} />
              </div>
            )}
          </div>
        );

      case '2':
        return (
          <div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin indicator={antIcon} />
              </div>
            ) : (
              <div className='card-flex-container'>
                {reports.map((report, index) => (
                  <Card key={report.id}  title={<div style={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '26px' }}>Отчет №{index + 1}</div>} bordered={false} className='card-item'>
                    <div style={{fontFamily: 'Arial', fontSize: '18px'}}>Дата создания: {report.date}</div>
                    <Button
                    href={report.link}
                    target="_blank"
                    type="primary"
                    className="custom-button"
                  >
                    Скачать отчет
                  </Button>

                  </Card>
                ))}
              </div>
            )}
          </div>
        );
        

      default:
        return null;
    }
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh', background: '#fff' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedItemInitial]}
          items={items}
          onClick={handleMenuClick}
          style={{ background: '#fff' }}
        />
        <div className='Button_lc'>
          <button onClick={handleLogout}>
            Выйти
          </button>
        </div>
        <div className='Button_lc_back'>
          <button onClick={handleChat}>
            Чат
          </button>
        </div>
      </Sider>

      <Layout style={{ marginLeft: 200, background: '#fff' }}>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {renderMessage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PersonalArea;
