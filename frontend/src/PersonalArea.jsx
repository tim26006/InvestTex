import React, { useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Card, Button } from 'antd';
import { Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: React.createElement(UserOutlined),
    label: 'Профиль',
  },
  {
    key: '2',
    icon: React.createElement(UploadOutlined),
    label: 'Отчеты',
  },
];

const PersonalArea = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/login" />; // Use Navigate to redirect
  }
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedItem(item.key);
  };

  const handleLogout = () => {
    // Remove access token from localStorage
    localStorage.removeItem('access_token');
    navigate("/")
    return <Navigate to="/" />;
  };

  const renderMessage = () => {
    switch (selectedItem) {
      case '1':
        return <div>Тут инфа про юзера  </div>;
      case '2':
        return <div><Card
        title="Название"
        bordered={false}
        style={{
          width: 300,
        }}
      >
        <p>Дата создания</p>
        <p>Краткая инфа</p>
        <Button type="primary">Скачать отчет</Button>
      </Card></div>;
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
          background: '#fff', // Светлый цвет фона для бара
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Тень для бара
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light" // Устанавливаем светлую тему для вкладок
          mode="inline"
          defaultSelectedKeys={['2']}
          items={items}
          onClick={handleMenuClick}
          style={{ 
            background: '#fff', // Светлый цвет фона для вкладок
          }}
        />
        <Button type="primary" onClick={handleLogout} style={{ marginTop: '20px' }}>
          Выйти
        </Button>
      </Sider>

      <Layout style={{ marginLeft: 200, background: '#fff' }}>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            border: 'none', // Убираем границы
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Добавляем тень для объема
          }}
        >
          {renderMessage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PersonalArea;
