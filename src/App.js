
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const Box = styled.div`
  flex: 0 0 calc(20% - 20px);
  background-color: lightblue;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  margin: 10px;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 0;
  }
`;


const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: lightgreen;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const categoryTitles = [
  'Animal',
  'Sports',
  'Food',
  'Career',
  'Fashion',
  'Dev',
  'Celebrity',
  'Actors',
  'Money',
  'Movie',
  'Political',
  'Science',
  'Technology',
  'Music',
  'Political',
  'Religion'
];

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('Initial Content');
  const [popupTitle, setPopupTitle] = useState('Popup Title');
  const [boxContent, setBoxContent] = useState([]);

  useEffect(() => {
    fetchBoxContent();
  }, []);

  const fetchBoxContent = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/categories');
      setBoxContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBoxClick = (category) => {
    setShowPopup(true);
    setPopupTitle(category);
    fetchPopupContent(category);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchPopupContent = async (category) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
      setPopupContent(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupButtonClick = async () => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${popupTitle}`);
      setPopupContent(response.data.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BoxContainer>
      {boxContent.map((category, index) => (
        <Box key={index} onClick={() => handleBoxClick(category)}>
          <h2>{categoryTitles[index]}</h2>
          <p>{category}</p>
        </Box>
      ))}

      {showPopup && (
        <PopupContainer onClick={handleClosePopup}>
          <PopupBox onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClosePopup}>Close</CloseButton>
            <h2>{popupTitle}</h2>
            <p>{popupContent}</p>
            <Button onClick={handlePopupButtonClick}>Change Content</Button>
          </PopupBox>
        </PopupContainer>
      )}
    </BoxContainer>
  );
}

export default App;







